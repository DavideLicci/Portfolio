"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MascotBubble } from "./mascot-bubble";
import { useMascotDict, useMascotLang } from "./mascot-context";
import { MascotFigure, type MascotState } from "./mascot-figure";
import { MascotGuide } from "./mascot-guide";
import { firstTimeThisSession, MASCOT_EVENT, useMascotHidden } from "./mascot-store";
import { useMascotActor } from "./use-mascot-actor";
import { useMascotGaze } from "./use-mascot-gaze";

type SpotVariant = "hero" | "projects" | "contact";

// La mascotte "in pagina", per schermi sotto i 1400 px: occupa il suo spazio nel flusso
// (la nuvoletta ha già il suo posto riservato), quindi non copre mai testi o pulsanti.
export function MascotSpot({ variant, className = "" }: { variant: SpotVariant; className?: string }) {
  const dict = useMascotDict();
  const lang = useMascotLang();
  const [hidden] = useMascotHidden();
  const { state, message, play } = useMascotActor(dict.wake);
  const ref = useRef<HTMLDivElement>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const guideId = `mascot-guide-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const mascotButton = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useMascotGaze(svgRef);

  const closeGuide = useCallback(() => {
    setGuideOpen(false);
    mascotButton.current?.focus({ preventScroll: true });
  }, []);
  const react = useCallback((next: MascotState) => play(next, { duration: 2200 }), [play]);

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
        // Nella home saluta in modo diverso se hai appena cambiato lingua. Si controlla qui,
        // quando la mascotte è davvero visibile, per non rubare il saluto a quella del margine.
        let languageChanged = false;
        if (variant === "hero") {
          try {
            const previous = window.sessionStorage.getItem("mascot-lang");
            languageChanged = Boolean(previous && previous !== lang);
            window.sessionStorage.setItem("mascot-lang", lang);
          } catch {}
        }
        if (variant === "hero" && languageChanged) {
          play("wave", { message: dict.langSwitch, duration: 2800, messageDuration: 6000 });
        } else if (firstTimeThisSession(`spot-${variant}`)) {
          play(action, { message: text, duration: 2800, messageDuration: 6000 });
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [dict, hidden, lang, play, variant]);

  useEffect(() => {
    if (variant !== "contact") return;
    const onReact = (event: Event) => {
      const type = (event as CustomEvent).detail?.type;
      if (type === "celebrate") play("celebrate", { message: dict.sent, duration: 3000, messageDuration: 5000 });
      if (type === "form-error") play("think", { message: dict.formError, duration: 2600 });
      if (type === "form-focus" && firstTimeThisSession("spot-form-focus")) {
        play("point", { message: dict.formFocus, duration: 2200 });
      }
    };
    window.addEventListener(MASCOT_EVENT, onReact);
    return () => window.removeEventListener(MASCOT_EVENT, onReact);
  }, [dict.formError, dict.formFocus, dict.sent, play, variant]);

  if (hidden) return null;

  const toggleGuide = () => {
    if (state === "sleep") return;
    setGuideOpen((open) => !open);
    if (!guideOpen) play("talk", { duration: 1500 });
  };

  return (
    <div ref={ref} className={`min-[1400px]:hidden ${className}`}>
      <div className="flex items-center gap-3">
        <button
          ref={mascotButton}
          type="button"
          onClick={toggleGuide}
          aria-label={dict.guide.open}
          aria-expanded={guideOpen}
          aria-controls={guideId}
          className="shrink-0 cursor-pointer rounded-lg"
        >
          <MascotFigure ref={svgRef} state={state} className="h-[68px] w-auto sm:h-20" />
        </button>
        <MascotBubble
          placement="side"
          message={guideOpen ? null : message}
          className="max-w-64 min-w-0 flex-1"
        />
      </div>
      {guideOpen && <MascotGuide id={guideId} variant="inline" onClose={closeGuide} onReact={react} />}
    </div>
  );
}
