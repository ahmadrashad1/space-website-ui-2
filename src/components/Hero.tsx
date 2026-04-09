"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add("hero__content--revealed"), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="hero">
      <div className="hero__media" aria-hidden="true">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero/hero-poster.jpg"
        >
          <source src="/assets/hero/hero-background-v2.mp4" type="video/mp4" />
        </video>
        <div className="hero__veil" />
      </div>

      <section className="hero__content" ref={contentRef}>
        <p className="hero__eyebrow">Beyond the atmosphere</p>
        <h1
          className="hero__title"
          aria-label="The universe is closer than you think."
        >
          <span className="hero__title-line">The universe</span>
          <span className="hero__title-line">is closer</span>
          <span className="hero__title-line">than you think.</span>
        </h1>
        <p className="hero__copy">
          Explore the missions, the machines, and the moments that carry
          humanity past the sky. This is where curiosity meets the cosmos.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="/">
            Start Exploring
          </a>
          <a className="button button--secondary" href="/">
            See What&apos;s Out There
          </a>
        </div>
      </section>
    </main>
  );
}
