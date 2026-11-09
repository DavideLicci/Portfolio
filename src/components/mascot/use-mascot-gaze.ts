"use client";

import { type RefObject, useEffect } from "react";

const INTERACTIVE = "a, button, input, textarea, select, [data-spotlight]";
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

// Fa guardare la mascotte verso qualcosa: con il mouse segue il cursore (o l'elemento
// interattivo sotto il cursore, o quello con il focus); sui touch guarda dove tocchi
// e verso dove scorri. Scrive --look-x/--look-y sull'SVG, senza far ridisegnare React.
export function useMascotGaze(
  svgRef: RefObject<SVGSVGElement | null>,
  facingRef?: RefObject<1 | -1>,
) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let target: { x: number; y: number } | null = null;
    let frame = 0;
    let resetTimer: number | undefined;

    const paint = () => {
      frame = 0;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return; // mascotte nascosta a questa larghezza
      let x = 0;
      let y = 0;
      if (target) {
        const eyesX = rect.left + rect.width / 2;
        const eyesY = rect.top + rect.height * 0.38;
        x = clamp((target.x - eyesX) / 320);
        y = clamp((target.y - eyesY) / 260);
      }
      svg.style.setProperty("--look-x", (x * (facingRef?.current ?? 1)).toFixed(3));
      svg.style.setProperty("--look-y", y.toFixed(3));
    };
    const lookAt = (point: { x: number; y: number } | null, forMs?: number) => {
      target = point;
      window.clearTimeout(resetTimer);
      if (forMs) resetTimer = window.setTimeout(() => lookAt(null), forMs);
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const centerOf = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    const onMove = (event: PointerEvent) => {
      const element = (event.target as Element | null)?.closest?.(INTERACTIVE);
      if (element && !svg.closest("button")?.contains(element)) lookAt(centerOf(element));
      else lookAt({ x: event.clientX, y: event.clientY });
    };
    const onLeave = () => lookAt(null);
    const onFocus = (event: FocusEvent) => {
      const element = event.target as Element;
      if (element instanceof Element && !svg.closest("button")?.contains(element)) {
        lookAt(centerOf(element), 2500);
      }
    };
    const onTap = (event: PointerEvent) => lookAt({ x: event.clientX, y: event.clientY }, 2500);
    let lastY = window.scrollY;
    const onScroll = () => {
      const direction = Math.sign(window.scrollY - lastY);
      lastY = window.scrollY;
      if (!direction || finePointer) return;
      const rect = svg.getBoundingClientRect();
      lookAt({ x: rect.left + rect.width / 2, y: rect.top + direction * 600 }, 700);
    };

    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    } else {
      window.addEventListener("pointerdown", onTap, { passive: true });
    }
    window.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onTap);
      window.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(resetTimer);
      cancelAnimationFrame(frame);
    };
  }, [svgRef, facingRef]);
}
