"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { target: 66, unit: "Years", label: "Of space exploration since 1958" },
  { target: 200, unit: "+", label: "Crewed missions launched" },
  { target: 27, unit: "Billion", label: "Dollar annual budget" },
  { target: 18000, unit: "+", label: "Employees across 10 centers" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.current) {
            counted.current = true;
            section.querySelectorAll<HTMLElement>(".stats__number").forEach((el) => {
              const target = parseInt(el.dataset.target!, 10);
              const duration = 2000;
              const start = performance.now();

              function tick(now: number) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased).toLocaleString();
                if (progress < 1) requestAnimationFrame(tick);
              }
              requestAnimationFrame(tick);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats__inner">
        <p className="stats__eyebrow">By the Numbers</p>
        <div className="stats__grid">
          {STATS.map((s) => (
            <div className="stats__card" key={s.label}>
              <span className="stats__number" data-target={s.target}>
                0
              </span>
              <span className="stats__unit">{s.unit}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
