"use client";

import { X } from "lucide-react";
import { type PointerEvent as ReactPointerEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { MascotBubble } from "./mascot-bubble";
import { useMascotDict, useMascotLang } from "./mascot-context";
import { MascotFigure, type MascotState } from "./mascot-figure";
import { MascotGuide } from "./mascot-guide";
import { firstTimeThisSession, MASCOT_EVENT, useMascotHidden, useMediaQuery } from "./mascot-store";
import { useMascotActor } from "./use-mascot-actor";
import { useMascotGaze } from "./use-mascot-gaze";

// Da 1400 px i margini ai lati del contenuto (max 64rem) sono abbastanza larghi
// da ospitare la mascotte senza coprire nulla. Sotto, la mascotte vive in pagina (MascotSpot).
export const DOCK_QUERY = "(min-width: 1400px)";
const WALK_MS = 900;
const NEAR_CONTENT_PX = 28;
const DOCK_LEFT_PX = 24;
const MASCOT_WIDTH_PX = 70;
const DRAG_THRESHOLD_PX = 6;

type Motion = "walk" | "fall" | "drag";

export function MascotDock() {
  const wide = useMediaQuery(DOCK_QUERY);
  const [hidden, setHidden] = useMascotHidden();
  if (!wide || hidden) return null;
  return <Dock onHide={() => setHidden(true)} />;
}

function Dock({ onHide }: { onHide: () => void }) {
  const dict = useMascotDict();
  const lang = useMascotLang();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { state, message, play } = useMascotActor(dict.wake);

  // Posizione rispetto al punto di riposo (in basso a sinistra): y < 0 = sollevato.
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const posRef = useRef(pos);
  const [motion, setMotion] = useState<Motion>("walk");
  const [fallMs, setFallMs] = useState(0);
  const [facing, setFacing] = useState<1 | -1>(1);
  const facingRef = useRef<1 | -1>(1);

  const [guideOpen, setGuideOpen] = useState(false);
  const guideId = `mascot-guide-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const mascotButton = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const leanRef = useRef<HTMLSpanElement>(null);
  const drag = useRef<{ startX: number; startY: number; base: { x: number; y: number }; active: boolean } | null>(null);
  const suppressClick = useRef(false);

  useMascotGaze(svgRef, facingRef);

  const moveTo = (next: { x: number; y: number }) => {
    posRef.current = next;
    setPos(next);
  };
  const face = (direction: 1 | -1) => {
    facingRef.current = direction;
    setFacing(direction);
  };

  // Cammina fino a `target` (px dal punto di riposo), poi esegue `then`.
  const walkTo = useCallback(
    (target: number, then: () => void) => {
      const current = posRef.current;
      if (target === current.x || reducedMotion || current.y !== 0) {
        then();
        return;
      }
      face(target > current.x ? 1 : -1);
      setMotion("walk");
      moveTo({ x: target, y: 0 });
      play("walk", { duration: null });
      window.setTimeout(() => {
        face(1);
        then();
      }, WALK_MS);
    },
    [play, reducedMotion],
  );

  // Benvenuto (o saluto dopo il cambio lingua), una volta per sessione.
  useEffect(() => {
    let previousLang: string | null = null;
    try {
      previousLang = window.sessionStorage.getItem("mascot-lang");
      window.sessionStorage.setItem("mascot-lang", lang);
    } catch {}
    const timer = window.setTimeout(() => {
      if (previousLang && previousLang !== lang) play("wave", { message: dict.langSwitch });
      else if (firstTimeThisSession("welcome")) play("wave", { message: dict.welcome });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [dict.langSwitch, dict.welcome, lang, play]);

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

  // Reazioni a quello che succede nella pagina.
  useEffect(() => {
    const once = (key: string, run: () => void) => () => {
      if (firstTimeThisSession(key)) run();
    };
    const onProject = once("dock-project-hover", () => play("think", { message: dict.projectHover }));
    const onPhoto = once("dock-photo", () => play("point", { message: dict.photo }));
    const cards = document.querySelectorAll('[data-mascot-hover="project"]');
    const photo = document.querySelector("#top img");
    for (const card of cards) card.addEventListener("pointerenter", onProject);
    photo?.addEventListener("pointerenter", onPhoto);

    const onReact = (event: Event) => {
      const type = (event as CustomEvent).detail?.type;
      if (type === "celebrate") play("celebrate", { message: dict.sent, duration: 3000 });
      if (type === "form-error") play("think", { message: dict.formError, duration: 2600 });
      if (type === "form-focus" && firstTimeThisSession("dock-form-focus")) {
        play("point", { message: dict.formFocus, duration: 2200 });
      }
    };
    window.addEventListener(MASCOT_EVENT, onReact);
    return () => {
      for (const card of cards) card.removeEventListener("pointerenter", onProject);
      photo?.removeEventListener("pointerenter", onPhoto);
      window.removeEventListener(MASCOT_EVENT, onReact);
    };
  }, [dict, play]);

  // Se scorri veloce si sbilancia, poi torna dritto.
  useEffect(() => {
    if (reducedMotion) return;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let settle: number | undefined;
    const onScroll = () => {
      const now = performance.now();
      const velocity = (window.scrollY - lastY) / Math.max(now - lastTime, 16);
      lastY = window.scrollY;
      lastTime = now;
      const lean = Math.max(-10, Math.min(10, velocity * 3));
      if (leanRef.current) leanRef.current.style.rotate = `${lean.toFixed(1)}deg`;
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (leanRef.current) leanRef.current.style.rotate = "0deg";
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
    };
  }, [reducedMotion]);

  // Trascinamento: lo prendi, scalcia; lo lasci, cade per gravità e atterra.
  const bounds = () => {
    const gutter = (document.documentElement.clientWidth - 1024) / 2;
    return {
      minX: -(DOCK_LEFT_PX - 8),
      maxX: Math.max(0, gutter - DOCK_LEFT_PX - MASCOT_WIDTH_PX - 12),
      minY: -(window.innerHeight - 96 - 20 - 80),
    };
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    drag.current = { startX: event.clientX, startY: event.clientY, base: posRef.current, active: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!current) return;
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (!current.active) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
      current.active = true;
      setGuideOpen(false);
      setMotion("drag");
      play("dangle", { duration: null });
    }
    const { minX, maxX, minY } = bounds();
    moveTo({
      x: Math.max(minX, Math.min(maxX, current.base.x + dx)),
      y: Math.max(minY, Math.min(0, current.base.y + dy)),
    });
  };

  const onPointerUp = () => {
    const current = drag.current;
    drag.current = null;
    if (!current?.active) return;
    suppressClick.current = true;
    const height = -posRef.current.y;
    // Più è in alto, più dura la caduta (come con la gravità: t ∝ √altezza).
    const duration = reducedMotion ? 0 : Math.round(Math.min(900, 140 + Math.sqrt(height) * 26));
    setFallMs(duration);
    setMotion("fall");
    moveTo({ x: posRef.current.x, y: 0 });
    window.setTimeout(() => {
      play("land", { duration: 450 });
      if (height > 60 && firstTimeThisSession("dock-landed")) {
        window.setTimeout(() => play("celebrate", { message: dict.landed, duration: 1400 }), 450);
      }
    }, duration);
  };

  const toggleGuide = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (state === "sleep") return; // lo sveglia già il pointerdown in useMascotActor
    setGuideOpen((open) => !open);
    if (!guideOpen) play("talk", { duration: 1500 });
  };

  const closeGuide = useCallback(() => {
    setGuideOpen(false);
    mascotButton.current?.focus({ preventScroll: true });
  }, []);

  const react = useCallback((next: MascotState) => play(next, { duration: 2200 }), [play]);

  const transition =
    motion === "drag"
      ? "none"
      : motion === "fall"
        ? `translate ${fallMs}ms cubic-bezier(0.5, 0, 1, 0.6)`
        : `translate ${WALK_MS}ms linear`;

  return (
    <div data-print-hide className="fixed bottom-5 left-6 z-30">
      <div className="group relative w-fit" style={{ translate: `${pos.x}px ${pos.y}px`, transition }}>
        <MascotBubble
          placement="up"
          message={guideOpen || motion === "drag" ? null : message}
          className="absolute bottom-full left-0 mb-2 w-[calc((100vw_-_64rem)/2_-_3rem)] max-w-60"
        />
        {guideOpen && (
          <MascotGuide id={guideId} variant="floating" onClose={closeGuide} onReact={react} />
        )}
        <button
          ref={mascotButton}
          type="button"
          onClick={toggleGuide}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label={dict.guide.open}
          aria-expanded={guideOpen}
          aria-controls={guideId}
          className={`block touch-none rounded-lg select-none ${motion === "drag" ? "cursor-grabbing" : "cursor-grab"}`}
        >
          <span
            ref={leanRef}
            className="block origin-bottom transition-[rotate] duration-500 ease-out"
            style={{ scale: facing === -1 ? "-1 1" : undefined }}
          >
            <MascotFigure ref={svgRef} state={state} className="pointer-events-none h-24 w-auto" />
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
