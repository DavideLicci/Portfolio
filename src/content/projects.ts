import type { Locale } from "@/i18n/config";
import { oltreIlTempoSession } from "./sessions/oltre-il-tempo";

// La sezione Progetti compare da sola quando questa lista non è vuota,
// e ogni progetto ha la sua pagina in /[lang]/projects/[slug].

type Localized<T = string> = Record<Locale, T>;

export type SessionLine = {
  // "input" = comando digitato, "output" = testo del gioco, "art" = ASCII art
  kind: "input" | "output" | "art";
  text: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: Localized;
  context: Localized;
  grade?: string;
  team: Localized;
  description: Localized<string[]>;
  role: Localized;
  highlights: Localized<string[]>;
  stats: { value: number; label: Localized }[];
  tech: string[];
  session?: SessionLine[];
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "oltre-il-tempo",
    title: "Oltre il tempo",
    year: "2026",
    summary: {
      it: "Avventura testuale investigativa per terminale, ambientata nell'Italia del 1943: un detective insegue un assassino che sembra arrivare dal futuro.",
      en: "A detective text adventure for the terminal, set in 1943 Italy: a detective chases a killer who seems to come from the future.",
    },
    context: {
      it: "Esame di Programmazione a oggetti · UNIVPM",
      en: "Object-Oriented Programming exam · UNIVPM",
    },
    grade: "28/30",
    team: {
      it: "Progetto di gruppo · 5 persone",
      en: "Team project · 5 people",
    },
    description: {
      it: [
        "Oltre il tempo è un'avventura testuale in C# che si gioca dal terminale. Il detective Scarponi viene chiamato a indagare su una serie di omicidi nell'Italia del 1943: dal porto di Genova al Teatro Lirico di Milano, da un treno diretto a Roma fino a un museo della capitale. Indizio dopo indizio, i casi portano a un'ipotesi impossibile: l'assassino arriva dal futuro.",
        "Il giocatore esplora le stanze con comandi testuali (Look, Move, Pick, Talk, Use…), raccoglie oggetti, parla con i personaggi e sblocca nuove zone man mano che l'indagine va avanti.",
      ],
      en: [
        "Oltre il tempo (“Beyond time”) is a C# text adventure played in the terminal. Detective Scarponi is called to investigate a series of murders in 1943 Italy: from the port of Genoa to Milan's Teatro Lirico, from a train bound for Rome to a museum in the capital. Clue after clue, the cases lead to an impossible theory: the killer comes from the future.",
        "Players explore rooms with text commands (Look, Move, Pick, Talk, Use…), pick up items, talk to characters and unlock new areas as the investigation moves forward.",
      ],
    },
    role: {
      it: "Mi sono occupato del motore di gioco, del parser dei comandi e della valutazione delle condizioni che sbloccano dialoghi, stanze e livelli.",
      en: "I worked on the game engine, the command parser and the evaluation of the conditions that unlock dialogues, rooms and levels.",
    },
    highlights: {
      it: [
        "Architettura data-driven: livelli, stanze, oggetti, personaggi e dialoghi sono definiti in file JSON, separati dal codice.",
        "Ogni livello è una mappa a griglia di stanze collegate da uscite, alcune bloccate finché non si soddisfa una condizione.",
        "Sistema di flag e condizioni che fa avanzare la storia: risposte nei dialoghi, porte che si aprono, fine dei livelli.",
        "Ereditarietà e polimorfismo per i tipi di oggetto, come quello che teletrasporta il giocatore in una stanza casuale.",
        "Salvataggio e caricamento della partita su file JSON.",
        "Interfaccia a riquadri disegnata con i caratteri del terminale, testi colorati e ASCII art per gli oggetti.",
      ],
      en: [
        "Data-driven architecture: levels, rooms, items, characters and dialogues live in JSON files, separate from the code.",
        "Each level is a grid map of rooms linked by exits, some locked until a condition is met.",
        "A flag and condition system drives the story: dialogue answers, doors that open, the end of each level.",
        "Inheritance and polymorphism for item types, such as one that teleports the player to a random room.",
        "Saving and loading the game to JSON files.",
        "A boxed interface drawn with terminal characters, coloured text and ASCII art for items.",
      ],
    },
    stats: [
      { value: 6, label: { it: "livelli", en: "levels" } },
      { value: 39, label: { it: "stanze", en: "rooms" } },
      { value: 40, label: { it: "oggetti", en: "items" } },
      { value: 98, label: { it: "dialoghi", en: "dialogues" } },
    ],
    tech: ["C#", ".NET", "JSON", "OOP"],
    session: oltreIlTempoSession,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
