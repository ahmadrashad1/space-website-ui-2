"use client";

import { FormEvent } from "react";

export default function CTA() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="cta">
      <div className="cta__inner">
        <p className="cta__eyebrow">Stay Connected</p>
        <h2 className="cta__title">Follow humanity&apos;s next giant leap.</h2>
        <p className="cta__copy">
          Get the latest updates on missions, discoveries, and breakthroughs
          delivered straight to your inbox.
        </p>
        <form className="cta__form" onSubmit={handleSubmit}>
          <input
            className="cta__input"
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            required
          />
          <button className="button button--primary cta__submit" type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
