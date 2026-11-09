"use client";

import { useEffect, useRef } from "react";
import { MascotBubble } from "./mascot-bubble";
import { useMascotDict } from "./mascot-context";
import { MascotFigure, type MascotState } from "./mascot-figure";
import { firstTimeThisSession, MASCOT_EVENT, useMascotHidden } from "./mascot-store";
import { useMascotActor } from "./use-mascot-actor";

type SpotVariant = "hero" | "projects" | "contact";

// La mascotte "in pagina", per schermi sotto i 1400 px: occupa il suo spazio nel flusso
// (la nuvoletta ha già il suo posto riservato), quindi non copre mai testi o pulsanti.
export function MascotSpot({ variant, className = "" }: { variant: SpotVariant; className?: string }) {
  const dict = useMascotDict();
  const [hidden] = useMascotHidden();
  const { state, message, play } = useMascotActor(dict.wake);
  const ref = useRef<HTMLDivElement>(null);
  const pokeCount = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reactions: Record<SpotVariant, [MascotState, string]> = {
      hero: ["wave", dict.welcome],
      projects: ["point", dict.projects],
      contact: ["talk", dict.contact],
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const [action, text] = reactions[variant];
        if (firstTimeThisSession(`spot-${variant}`)) {
          play(action, { message: text, duration: 2800, messageDuration: 6000 });
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [dict, hidden, play, variant]);

  useEffect(() => {
    if (variant !== "contact") return;
    const onReact = (event: Event) => {
      if ((event as CustomEvent).detail?.type === "celebrate") {
        play("celebrate", { message: dict.sent, duration: 3000, messageDuration: 5000 });
      }
    };
    window.addEventListener(MASCOT_EVENT, onReact);
    return () => window.removeEventListener(MASCOT_EVENT, onReact);
  }, [dict.sent, play, variant]);

  if (hidden) return null;

  const onPoke = () => {
    if (state === "sleep") return;
    const text = dict.pokes[pokeCount.current++ % dict.pokes.length];
    play("talk", { message: text, duration: 2200, messageDuration: 3500 });
  };

  return (
    <div ref={ref} className={`flex items-center gap-3 min-[1400px]:hidden ${className}`}>
      <button
        type="button"
        onClick={onPoke}
        aria-label={dict.label}
        className="shrink-0 cursor-pointer rounded-lg"
      >
        <MascotFigure state={state} className="h-[68px] w-auto sm:h-20" />
      </button>
      <MascotBubble placement="side" message={message} className="max-w-64 min-w-0 flex-1" />
    </div>
  );
}
