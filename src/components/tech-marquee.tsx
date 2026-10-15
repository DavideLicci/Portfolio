"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type TechMarqueeProps = {
  items: string[];
  dict: Dictionary["marquee"];
};

// Decorativo (le stesse tecnologie sono elencate in Competenze), ma si può fermare.
export function TechMarquee({ items, dict }: TechMarqueeProps) {
  const [paused, setPaused] = useState(false);

  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10">
          <span className="font-mono text-2xl text-muted sm:text-3xl">{item}</span>
          <span className="text-accent">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative border-y border-line bg-surface/40 py-6" data-paused={paused}>
      <div
        aria-hidden
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      >
        <div className="marquee-track flex w-max">
          {row}
          {row}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? dict.play : dict.pause}
        className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg text-muted transition-colors hover:border-accent hover:text-accent"
      >
        {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
