"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  from?: number;
  duration?: number;
};

// Il server mostra già il numero finale: l'animazione parte solo quando il numero
// entra nello schermo, e non parte affatto con "riduci movimento" attivo.
export function CountUp({ value, from = 0, duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    element.textContent = String(from);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          element.textContent = String(Math.round(from + (value - from) * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = String(value);
    };
  }, [value, from, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
