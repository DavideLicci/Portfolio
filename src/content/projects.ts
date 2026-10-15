import type { Locale } from "@/i18n/config";

// La sezione Progetti compare da sola quando questa lista non è vuota.
// Esempio:
// {
//   slug: "nome-progetto",
//   title: "Nome progetto",
//   summary: { it: "Cosa fa, in una riga.", en: "What it does, in one line." },
//   tech: ["C#", ".NET"],
//   repo: "https://github.com/DavideLicci/nome-progetto",
// },

export type Project = {
  slug: string;
  title: string;
  summary: Record<Locale, string>;
  tech: string[];
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [];
