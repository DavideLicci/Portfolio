"use client";

import { useMascotDict } from "./mascot-context";
import { useMascotHidden } from "./mascot-store";

// Nel footer: per nascondere la mascotte o farla tornare.
export function MascotToggle() {
  const dict = useMascotDict();
  const [hidden, setHidden] = useMascotHidden();

  return (
    <button
      type="button"
      onClick={() => setHidden(!hidden)}
      className="inline-flex min-h-11 items-center rounded-lg px-3 font-mono text-xs text-muted transition-colors hover:text-accent"
    >
      {hidden ? dict.show : dict.hide}
    </button>
  );
}
