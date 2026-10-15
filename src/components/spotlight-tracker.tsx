"use client";

import { useEffect } from "react";

// Passa la posizione del mouse (--mx/--my) a ogni elemento con data-spotlight,
// così bordo e alone verdi seguono il cursore. Sui touch non fa nulla.
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!pointer) return;
      for (const card of document.querySelectorAll<HTMLElement>("[data-spotlight]")) {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < -300 || rect.top > window.innerHeight + 300) continue;
        card.style.setProperty("--mx", `${pointer.x - rect.left}px`);
        card.style.setProperty("--my", `${pointer.y - rect.top}px`);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      root.dataset.pointer = "fine";
      schedule();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
      delete root.dataset.pointer;
    };
  }, []);

  return null;
}
