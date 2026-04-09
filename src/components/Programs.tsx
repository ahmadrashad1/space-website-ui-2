"use client";

import { useEffect, useRef } from "react";

const PROGRAMS = [
  { tag: "Lunar Gateway", name: "Artemis", variant: "artemis", desc: "Returning humans to the Moon and establishing a sustainable presence for future Mars missions." },
  { tag: "Deep Observatory", name: "James Webb Space Telescope", variant: "jwst", desc: "Peering into the earliest epochs of the universe with the most powerful space telescope ever built." },
  { tag: "Orbital Lab", name: "International Space Station", variant: "iss", desc: "A microgravity laboratory orbiting Earth, enabling scientific breakthroughs and international cooperation." },
  { tag: "Heavy Lift", name: "Space Launch System", variant: "sls", desc: "The most powerful rocket ever built, designed to carry crew and cargo beyond low-Earth orbit." },
  { tag: "Planetary Data", name: "Earth Science", variant: "earth", desc: "A fleet of satellites studying climate, weather, natural disasters, and the changing landscape of our planet." },
  { tag: "Low-Earth Transit", name: "Commercial Crew", variant: "crew", desc: "Partnering with private industry to ferry astronauts to the ISS and enable a thriving low-Earth orbit economy." },
];

export default function Programs() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const maxScroll = grid!.scrollWidth - grid!.clientWidth;
      if (maxScroll <= 0) return;
      e.preventDefault();
      grid!.scrollBy({ left: e.deltaY, behavior: "smooth" });
    }

    grid.addEventListener("wheel", onWheel, { passive: false });
    return () => grid.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="programs">
      <div className="programs__inner">
        <p className="programs__eyebrow">Key Programs</p>
        <h2 className="programs__title">Exploring on every frontier</h2>
        <div className="programs__grid" ref={gridRef}>
          {PROGRAMS.map((p) => (
            <article
              key={p.variant}
              className={`program-card program-card--${p.variant}`}
            >
              <span className="program-card__tag">{p.tag}</span>
              <h3 className="program-card__name">{p.name}</h3>
              <p className="program-card__desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
