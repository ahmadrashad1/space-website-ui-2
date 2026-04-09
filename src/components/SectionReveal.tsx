"use client";

import { useEffect } from "react";

const SELECTORS = [".stats", ".about", ".programs", ".orbit360", ".cta"];

export default function SectionReveal() {
  useEffect(() => {
    const elements: HTMLElement[] = [];
    SELECTORS.forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => elements.push(el));
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
