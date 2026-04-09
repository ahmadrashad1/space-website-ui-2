"use client";

import { type RefObject, useEffect } from "react";

const MOBILE_MQ = "(max-width: 991.98px)";

/**
 * Desktop: sequential [data-reveal] visibility tied to scroll through a tall section.
 * Mobile / tablet (≤992px): no scroll-scrub — reveal all copy when the section is on screen
 * (avoids touch scroll quirks, hidden text, and extra “empty” scroll space).
 */
export function useScrollStageReveal(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rootEl = sectionRef.current;
    if (!rootEl) return;

    const items = Array.from(
      rootEl.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (items.length === 0) return;

    const mq = window.matchMedia(MOBILE_MQ);

    function revealAll() {
      items.forEach((el) => el.classList.add("is-visible"));
    }

    function mountDesktop(rootEl: HTMLElement): () => void {
      function update() {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sectionH = el.offsetHeight;
        const vh = window.innerHeight;
        const scrollable = Math.max(sectionH - vh, 1);
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, scrolled / scrollable);

        items.forEach((item, i) => {
          const threshold = (i + 1) / (items.length + 1);
          if (progress >= threshold) {
            item.classList.add("is-visible");
          }
        });
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

      const ro =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => update())
          : null;
      ro?.observe(rootEl);

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      requestAnimationFrame(update);

      return () => {
        ro?.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    function mountMobile(rootEl: HTMLElement): () => void {
      function maybeReveal() {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.top < vh * 0.92 && r.bottom > vh * 0.08) {
          revealAll();
        }
      }

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              revealAll();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -2% 0px" }
      );
      obs.observe(rootEl);

      window.addEventListener("scroll", maybeReveal, { passive: true });
      requestAnimationFrame(maybeReveal);

      return () => {
        obs.disconnect();
        window.removeEventListener("scroll", maybeReveal);
      };
    }

    let cleanup: (() => void) | undefined;

    function remount() {
      cleanup?.();
      const el = sectionRef.current;
      if (!el) return;
      cleanup = mq.matches ? mountMobile(el) : mountDesktop(el);
    }

    remount();

    mq.addEventListener("change", remount);

    return () => {
      mq.removeEventListener("change", remount);
      cleanup?.();
    };
  }, []);
}
