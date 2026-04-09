"use client";

import { useEffect } from "react";

/** Document Y of element top (offsetParent chain; stable for layout). */
function cumulativeOffsetTop(el: HTMLElement): number {
  let top = 0;
  let n: HTMLElement | null = el;
  while (n) {
    top += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return top;
}

function applyStackStyles(el: HTMLElement, progress: number) {
  if (progress <= 0) {
    el.style.transform = "";
    el.style.opacity = "";
    el.style.borderRadius = "";
    return;
  }
  const p = Math.min(progress, 1);
  const easeScale = p * p;
  const easeOpacity = Math.pow(p, 1.5);
  el.style.transform = `scale(${1 - easeScale * 0.1})`;
  el.style.opacity = String(1 - easeOpacity);
  el.style.borderRadius = `${easeScale * 32}px`;
}

export default function StackingScroll() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const hero = document.querySelector<HTMLElement>(".hero");
    const satSticky = document.querySelector<HTMLElement>(".satellite__sticky");
    const satSection = document.querySelector<HTMLElement>(
      ".satellite.satellite--scroll-locked"
    );
    const missSticky = document.querySelector<HTMLElement>(".mission__sticky");
    const missSection = document.querySelector<HTMLElement>(
      ".mission.mission--scroll-locked"
    );

    function update() {
      if (prefersReduced) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (hero) {
        const top = cumulativeOffsetTop(hero);
        const h = Math.max(hero.offsetHeight, 1);
        const scrollPast = scrollY - top;
        const progress = scrollPast <= 0 ? 0 : Math.min(scrollPast / h, 1);
        applyStackStyles(hero, progress);
      }

      /* Same card handoff as hero→satellite: shrink over one viewport as the next section takes over */
      if (satSticky && satSection) {
        const end = cumulativeOffsetTop(satSection) + satSection.offsetHeight;
        const scrollPast = scrollY - (end - vh);
        const progress =
          scrollPast <= 0 ? 0 : Math.min(scrollPast / Math.max(vh, 1), 1);
        applyStackStyles(satSticky, progress);
      }

      if (missSticky && missSection) {
        const end = cumulativeOffsetTop(missSection) + missSection.offsetHeight;
        const scrollPast = scrollY - (end - vh);
        const progress =
          scrollPast <= 0 ? 0 : Math.min(scrollPast / Math.max(vh, 1), 1);
        applyStackStyles(missSticky, progress);
      }
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    function onResize() {
      update();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      const clear = (el: HTMLElement | null) => {
        if (!el) return;
        el.style.removeProperty("transform");
        el.style.removeProperty("opacity");
        el.style.removeProperty("border-radius");
      };
      clear(hero);
      clear(satSticky);
      clear(missSticky);
    };
  }, []);

  return null;
}
