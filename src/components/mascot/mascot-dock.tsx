"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MascotBubble } from "./mascot-bubble";
import { useMascotDict } from "./mascot-context";
import { MascotFigure } from "./mascot-figure";
import { firstTimeThisSession, MASCOT_EVENT, useMascotHidden, useMediaQuery } from "./mascot-store";
import { useMascotActor } from "./use-mascot-actor";

// Da 1400 px i margini ai lati del contenuto (max 64rem) sono abbastanza larghi
// da ospitare la mascotte senza coprire nulla. Sotto, la mascotte vive in pagina (MascotSpot).
export const DOCK_QUERY = "(min-width: 1400px)";
const WALK_MS = 900;
const NEAR_CONTENT_PX = 28;

export function MascotDock() {
  const wide = useMediaQuery(DOCK_QUERY);
  const [hidden, setHidden] = useMascotHidden();
  if (!wide || hidden) return null;
  return <Dock onHide={() => setHidden(true)} />;
}

function Dock({ onHide }: { onHide: () => void }) {
  const dict = useMascotDict();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { state, message, play } = useMascotActor(dict.wake);
  const [x, setX] = useState(0);
  const [facing, setFacing] = useState<1 | -1>(1);
  const xRef = useRef(0);
  const pokeCount = useRef(0);

  // Cammina fino a `target` (px dal punto di partenza), poi esegue `then`.
  const walkTo = useCallback(
    (target: number, then: () => void) => {
      if (target === xRef.current || reducedMotion) {
        xRef.current = target;
        setX(target);
        then();
        return;
      }
      setFacing(target > xRef.current ? 1 : -1);
      xRef.current = target;
      setX(target);
      play("walk", { duration: null });
      window.setTimeout(() => {
        setFacing(1);
        then();
      }, WALK_MS);
    },
    [play, reducedMotion],
  );

  // Benvenuto, una volta per sessione.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (firstTimeThisSession("welcome")) play("wave", { message: dict.welcome });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [dict.welcome, play]);

  // Reagisce alla sezione che si sta leggendo.
  useEffect(() => {
    const reactions: Record<string, () => void> = {
      journey: () => play("point", { message: dict.journey }),
      projects: () => walkTo(NEAR_CONTENT_PX, () => play("point", { message: dict.projects, duration: 3000 })),
      session: () => play("point", { message: dict.session }),
      contact: () => walkTo(0, () => play("talk", { message: dict.contact, duration: 3000 })),
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && firstTimeThisSession(`dock-${id}`)) reactions[id]?.();
        }
      },
      { threshold: 0.35 },
    );
    for (const id of Object.keys(reactions)) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [dict, play, walkTo]);

  // Passando sopra un progetto ci pensa su; dopo l'invio del modulo esulta.
  useEffect(() => {
    const onHover = () => {
      if (firstTimeThisSession("dock-project-hover")) play("think", { message: dict.projectHover });
    };
    const cards = document.querySelectorAll('[data-mascot-hover="project"]');
    for (const card of cards) card.addEventListener("pointerenter", onHover);

    const onReact = (event: Event) => {
      if ((event as CustomEvent).detail?.type === "celebrate") {
        play("celebrate", { message: dict.sent, duration: 3000 });
      }
    };
    window.addEventListener(MASCOT_EVENT, onReact);
    return () => {
      for (const card of cards) card.removeEventListener("pointerenter", onHover);
      window.removeEventListener(MASCOT_EVENT, onReact);
    };
  }, [dict, play]);

  const onPoke = () => {
    if (state === "sleep") return; // lo sveglia già il pointerdown in useMascotActor
    const text = dict.pokes[pokeCount.current++ % dict.pokes.length];
    play(pokeCount.current % 3 === 0 ? "celebrate" : "talk", { message: text, duration: 2200 });
  };

  return (
    <div className="fixed bottom-5 left-6 z-30 w-[calc((100vw_-_64rem)/2_-_3rem)] max-w-60">
      <MascotBubble placement="up" message={message} className="mb-2" />
      <div
        className="group relative w-fit transition-[translate] ease-linear"
        style={{ translate: `${x}px 0`, transitionDuration: `${WALK_MS}ms` }}
      >
        <button
          type="button"
          onClick={onPoke}
          aria-label={dict.label}
          className="block cursor-pointer rounded-lg"
        >
          <span className="block" style={{ scale: facing === -1 ? "-1 1" : undefined }}>
            <MascotFigure state={state} className="h-24 w-auto" />
          </span>
        </button>
        <button
          type="button"
          onClick={onHide}
          aria-label={dict.hide}
          title={dict.hide}
          className="absolute -top-1 -right-4 grid size-7 place-items-center rounded-full border border-line bg-bg text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent focus-visible:opacity-100"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
