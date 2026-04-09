"use client";

import { useEffect, useRef } from "react";

export default function Mission() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("mission__content--revealed"), 3000);
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
    <section className="mission">
      <div className="mission__media" aria-hidden="true">
        <video
          className="mission__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/mission/mission-poster.jpg"
        >
          <source src="/assets/mission/mission-background.mp4" type="video/mp4" />
        </video>
        <div className="mission__veil" />
      </div>

      <div className="mission__content" ref={contentRef}>
        <p className="mission__eyebrow">Mars Exploration Program</p>
        <h2
          className="mission__title"
          aria-label="Roaming the red frontier."
        >
          <span className="mission__title-line">Roaming the</span>
          <span className="mission__title-line">Red frontier.</span>
        </h2>
        <p className="mission__copy">
          From Curiosity to Perseverance, NASA&apos;s rovers traverse the
          Martian landscape searching for signs of ancient life, studying
          geology, and paving the way for future human exploration of the Red
          Planet.
        </p>
        <div className="mission__actions">
          <a className="button button--primary" href="/">
            Discover Missions
          </a>
        </div>
      </div>
    </section>
  );
}
