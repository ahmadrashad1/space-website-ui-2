"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 120;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = "/astronaut-360_frames_60fps/astronaut-360_frames_60fps/frame_";
const FRAME_SUFFIX = ".jpg";

function wrap(v: number, n: number) {
  return ((v % n) + n) % n;
}

function getFrameSrc(index: number) {
  return FRAME_PREFIX + String(index).padStart(FRAME_DIGITS, "0") + FRAME_SUFFIX;
}

export default function Orbit360() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let loaded = 0;
    let hasFirstFrame = false;
    let animId: number | null = null;
    let targetFrame = 0;
    let currentFrame = 0;
    let lastDrawnIndex = -1;

    function drawCover(img: HTMLImageElement) {
      const cw = canvas!.width;
      const ch = canvas!.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number, dh: number, ox: number, oy: number;
      if (ir > cr) {
        dh = ch; dw = dh * ir; ox = (cw - dw) / 2; oy = 0;
      } else {
        dw = cw; dh = dw / ir; ox = 0; oy = (ch - dh) / 2;
      }
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.drawImage(img, ox, oy, dw, dh);
    }

    function syncCanvasSize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        lastDrawnIndex = -1;
      }
    }

    function renderLoop() {
      let delta = targetFrame - currentFrame;
      if (Math.abs(delta) > FRAME_COUNT / 2) {
        delta = delta > 0 ? delta - FRAME_COUNT : delta + FRAME_COUNT;
      }
      if (Math.abs(delta) < 0.05) {
        currentFrame = targetFrame;
      } else {
        currentFrame += delta * 0.15;
      }

      const idx = wrap(Math.round(currentFrame), FRAME_COUNT);
      if (idx !== lastDrawnIndex) {
        const img = images[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          drawCover(img);
          lastDrawnIndex = idx;
        }
      }

      if (Math.abs(targetFrame - currentFrame) > 0.02 || lastDrawnIndex === -1) {
        animId = requestAnimationFrame(renderLoop);
      } else {
        animId = null;
      }
    }

    function scheduleRender() {
      if (!animId && hasFirstFrame) {
        animId = requestAnimationFrame(renderLoop);
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (!hasFirstFrame) return;
      const rect = canvas!.getBoundingClientRect();
      const progress = (e.clientX - rect.left) / rect.width;
      targetFrame = progress * (FRAME_COUNT - 1);
      scheduleRender();
    }

    function onTouchMove(e: TouchEvent) {
      if (!hasFirstFrame) return;
      const touch = e.touches[0];
      const rect = canvas!.getBoundingClientRect();
      const progress = (touch.clientX - rect.left) / rect.width;
      targetFrame = progress * (FRAME_COUNT - 1);
      scheduleRender();
    }

    function onResize() {
      syncCanvasSize();
      scheduleRender();
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);

    syncCanvasSize();

    const BATCH = 10;
    const queue = Array.from({ length: FRAME_COUNT }, (_, i) => i);

    function loadBatch() {
      const batch = queue.splice(0, BATCH);
      if (!batch.length) return;
      batch.forEach((idx) => {
        const img = new Image();
        img.decoding = "async";
        img.src = getFrameSrc(idx);
        img.onload = () => {
          images[idx] = img;
          loaded++;
          if (!hasFirstFrame) {
            hasFirstFrame = true;
            syncCanvasSize();
            targetFrame = 0;
            currentFrame = 0;
            scheduleRender();
          }
          if (loaded % BATCH === 0 || loaded === FRAME_COUNT) loadBatch();
        };
        img.onerror = () => {
          loaded++;
          if (loaded % BATCH === 0) loadBatch();
        };
      });
    }

    loadBatch();

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="orbit360">
      <div className="orbit360__inner">
        <div className="orbit360__text">
          <p className="orbit360__eyebrow">A surreal experience</p>
          <h2 className="orbit360__title">
            <span className="orbit360__title-line">Scroll over</span>
            <span className="orbit360__title-line">the astronaut</span>
            <span className="orbit360__title-line">to experience</span>
            <span className="orbit360__title-line">an astronaut&apos;s</span>
            <span className="orbit360__title-line">view.</span>
          </h2>
          <p className="orbit360__hint">← Hover &amp; move →</p>
        </div>
        <div className="orbit360__viewer">
          <div className="orbit360__viewport">
            <canvas
              ref={canvasRef}
              className="orbit360__canvas"
              width={1600}
              height={900}
              aria-label="Astronaut 360 degree viewer"
              role="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
