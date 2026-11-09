"use client";

import { useSyncExternalStore } from "react";

// Stato condiviso fra tutte le mascotte della pagina, senza un provider:
// preferenza "nascosta" (localStorage), media query e reazioni lanciate da altri componenti.

const HIDDEN_KEY = "mascot-hidden";
const HIDDEN_EVENT = "mascot:hidden-change";
const SEEN_KEY = "mascot-seen";
export const MASCOT_EVENT = "mascot:react";

// celebrate: messaggio inviato · form-focus: si inizia a scrivere · form-error: campi da correggere
export type MascotReaction = "celebrate" | "form-focus" | "form-error";

function subscribeHidden(callback: () => void) {
  window.addEventListener(HIDDEN_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(HIDDEN_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readHidden() {
  try {
    return window.localStorage.getItem(HIDDEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function useMascotHidden() {
  const hidden = useSyncExternalStore(subscribeHidden, readHidden, () => false);
  const setHidden = (value: boolean) => {
    try {
      if (value) window.localStorage.setItem(HIDDEN_KEY, "1");
      else window.localStorage.removeItem(HIDDEN_KEY);
    } catch {
      // Senza storage la scelta vale solo fino al prossimo caricamento.
    }
    window.dispatchEvent(new Event(HIDDEN_EVENT));
  };
  return [hidden, setHidden] as const;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", callback);
      return () => list.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// true solo la prima volta in questa sessione: così ogni messaggio contestuale si vede una volta.
export function firstTimeThisSession(key: string) {
  try {
    const seen: string[] = JSON.parse(window.sessionStorage.getItem(SEEN_KEY) ?? "[]");
    if (seen.includes(key)) return false;
    window.sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen, key]));
    return true;
  } catch {
    return true;
  }
}

// Da chiamare in altri componenti, es. emitMascot("celebrate") dopo l'invio del modulo.
export function emitMascot(type: MascotReaction) {
  window.dispatchEvent(new CustomEvent(MASCOT_EVENT, { detail: { type } }));
}
