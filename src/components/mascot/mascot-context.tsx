"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type MascotDict = Dictionary["mascot"];

const MascotContext = createContext<{ dict: MascotDict; lang: Locale } | null>(null);

// Passa testi e lingua a tutte le istanze della mascotte (dock, spazi in pagina, guida, interruttore).
export function MascotProvider({
  dict,
  lang,
  children,
}: {
  dict: MascotDict;
  lang: Locale;
  children: ReactNode;
}) {
  return <MascotContext.Provider value={{ dict, lang }}>{children}</MascotContext.Provider>;
}

function useMascotContext() {
  const value = useContext(MascotContext);
  if (!value) throw new Error("La mascotte va usata dentro <MascotProvider>");
  return value;
}

export function useMascotDict() {
  return useMascotContext().dict;
}

export function useMascotLang() {
  return useMascotContext().lang;
}
