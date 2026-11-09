"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type MascotDict = Dictionary["mascot"];

const MascotContext = createContext<MascotDict | null>(null);

// Passa i testi della mascotte a tutte le sue istanze (dock, spazi in pagina, interruttore).
export function MascotProvider({ dict, children }: { dict: MascotDict; children: ReactNode }) {
  return <MascotContext.Provider value={dict}>{children}</MascotContext.Provider>;
}

export function useMascotDict() {
  const dict = useContext(MascotContext);
  if (!dict) throw new Error("useMascotDict va usato dentro <MascotProvider>");
  return dict;
}
