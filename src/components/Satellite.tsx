"use client";

import { useEffect, useRef } from "react";

export default function Satellite() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("satellite__content--revealed"), 3000);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="satellite">
      <div className="satellite__media" aria-hidden="true">
        <video
          className="satellite__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/satellite/satellite-poster.jpg"
        >
          <source src="/assets/satellite/satellite-background.mp4" type="video/mp4" />
        </video>
        <div className="satellite__veil" />
      </div>

      <div className="satellite__content" ref={contentRef}>
        <p className="satellite__eyebrow">Orbital Satellite Network</p>
        <h2
          className="satellite__title"
          aria-label="Eyes in orbit watching over Earth."
        >
          <span className="satellite__title-line">Eyes in orbit</span>
          <span className="satellite__title-line">Watching over</span>
          <span className="satellite__title-line">Earth.</span>
        </h2>
        <p className="satellite__copy">
          NASA&apos;s fleet of Earth-observing satellites monitors our planet
          around the clock — tracking weather systems, mapping terrain,
          measuring ocean currents, and capturing data that shapes our
          understanding of climate change.
        </p>
        <div className="satellite__actions">
          <a className="button button--primary" href="/">
            Explore Satellites
          </a>
        </div>
      </div>
    </section>
  );
}
