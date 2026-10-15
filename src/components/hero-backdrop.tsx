"use client";

import { useEffect, useRef } from "react";

// Griglia e alone dell'hero: con il mouse la luce lo segue,
// sui dispositivi touch si muove da sola (vedi .hero-spot in globals.css).
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = ref.current;
    const section = backdrop?.parentElement;
    if (!backdrop || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const follow = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      backdrop.dataset.pointer = "true";
      backdrop.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      backdrop.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    section.addEventListener("pointermove", follow);
    return () => section.removeEventListener("pointermove", follow);
  }, []);

  return (
    <div ref={ref} aria-hidden className="hero-spot pointer-events-none absolute inset-0">
      <div className="hero-grid absolute inset-0" />
      <div className="hero-grid-lit absolute inset-0" />
      <div className="hero-glow absolute inset-0" />
    </div>
  );
}
