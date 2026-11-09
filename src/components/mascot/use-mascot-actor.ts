"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MascotState } from "./mascot-figure";

type PlayOptions = {
  message?: string;
  // Quanto dura l'azione prima di tornare a idle (null = resta così)
  duration?: number | null;
  messageDuration?: number;
};

const SLEEP_AFTER_MS = 45_000;
const BEHAVIOR_MS = { look: 2600, stretch: 2400, yawn: 2200 };

// Il "cervello" di una mascotte: stato corrente, messaggio nella nuvoletta,
// ritorno automatico a idle e sonnellino dopo un po' di inattività.
export function useMascotActor(wakeMessage: string) {
  const [state, setState] = useState<MascotState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const stateRef = useRef<MascotState>("idle");
  const actionTimer = useRef<number | undefined>(undefined);
  const messageTimer = useRef<number | undefined>(undefined);

  const apply = (next: MascotState) => {
    stateRef.current = next;
    setState(next);
  };

  const play = useCallback((next: MascotState, options: PlayOptions = {}) => {
    const { message: text, duration = 2600, messageDuration = 4500 } = options;
    window.clearTimeout(actionTimer.current);
    apply(next);
    if (duration !== null) {
      actionTimer.current = window.setTimeout(() => apply("idle"), duration);
    }
    if (text) {
      window.clearTimeout(messageTimer.current);
      setMessage(text);
      messageTimer.current = window.setTimeout(() => setMessage(null), messageDuration);
    }
  }, []);

  useEffect(() => {
    let lastActivity = Date.now();

    const onActivity = () => {
      lastActivity = Date.now();
      if (stateRef.current === "sleep") {
        play("wave", { message: wakeMessage, duration: 1800 });
      }
    };
    // Ogni tanto, se è fermo, fa qualcosa da solo: si guarda intorno o si stiracchia;
    // se nessuno lo considera da un po' sbadiglia, e poi si addormenta.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nextDelay = () => 9000 + Math.random() * 8000;
    let nextBehaviorAt = Date.now() + nextDelay();

    const check = window.setInterval(() => {
      const now = Date.now();
      if (stateRef.current !== "idle") {
        nextBehaviorAt = Math.max(nextBehaviorAt, now + 4000);
        return;
      }
      const inactive = now - lastActivity;
      if (inactive > SLEEP_AFTER_MS) {
        apply("sleep");
        return;
      }
      if (now < nextBehaviorAt || reducedMotion || document.visibilityState !== "visible") return;
      const behavior: MascotState = inactive > 20_000 ? "yawn" : Math.random() < 0.6 ? "look" : "stretch";
      const duration = BEHAVIOR_MS[behavior as keyof typeof BEHAVIOR_MS];
      play(behavior, { duration });
      nextBehaviorAt = now + duration + nextDelay();
    }, 1000);

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    for (const type of events) window.addEventListener(type, onActivity, { passive: true });
    // pointermove arriva di continuo: basta aggiornare l'orario, senza svegliare a ogni pixel.
    const onMove = () => {
      if (stateRef.current === "sleep") onActivity();
      else lastActivity = Date.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.clearInterval(check);
      for (const type of events) window.removeEventListener(type, onActivity);
      window.removeEventListener("pointermove", onMove);
      window.clearTimeout(actionTimer.current);
      window.clearTimeout(messageTimer.current);
    };
  }, [play, wakeMessage]);

  return { state, message, play, stateRef };
}
