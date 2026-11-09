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
  // Screenshot (in public/), mostrati come schermi di telefono
  images?: { src: string; alt: Localized }[];
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "called-it",
    title: "Called It!",
    year: "2026",
    summary: {
      it: "App per fare previsioni tra amici in gruppi privati, con monete virtuali senza valore: si punta sulla risposta giusta e il gruppo verifica com'è andata.",
      en: "An app for making predictions among friends in private groups, with valueless virtual coins: you bet on the right answer and the group checks how it went.",
    },
    context: { it: "Progetto personale", en: "Personal project" },
    team: { it: "Da solo · app completa", en: "Solo · complete app" },
    description: {
      it: [
        "Called It! è un'app mobile, pensata prima di tutto per Android, per fare previsioni tra amici in gruppi privati. Chi crea una previsione inventa da 2 a 10 risposte e il server aggiunge sempre «Nessuna di queste». Ognuno punta quante CallCoins vuole, monete virtuali senza valore, su una sola risposta.",
        "Dopo l'evento il gruppo verifica l'esito e il server divide il montepremi in proporzione alle puntate. Ci sono classifiche, badge, bonus giornaliero, notifiche e accesso con Google; la beta gira sia su Android sia nel browser.",
      ],
      en: [
        "Called It! is a mobile app, designed for Android first, for making predictions among friends in private groups. Whoever creates a prediction writes 2 to 10 answers and the server always adds “None of these”. Everyone bets as many CallCoins as they like, valueless virtual coins, on a single answer.",
        "After the event the group checks the outcome and the server splits the prize pool in proportion to the bets. There are leaderboards, badges, a daily bonus, notifications and Google sign-in; the beta runs both on Android and in the browser.",
      ],
    },
    role: {
      it: "L'ho progettata e sviluppata da solo: app Flutter, database e logica lato server con Supabase, test e pubblicazione della beta.",
      en: "I designed and built it on my own: the Flutter app, the database and server-side logic with Supabase, the tests and the beta release.",
    },
    highlights: {
      it: [
        "Backend Supabase su PostgreSQL, con sicurezza a livello di riga (RLS) su tutte le tabelle e funzioni transazionali per puntate, pagamenti ed esiti.",
        "L'app non scrive mai saldi o puntate: ogni operazione importante è una chiamata al server idempotente, così un doppio tocco non crea una doppia puntata.",
        "Ogni previsione segue una macchina a stati (aperta, chiusa, in verifica, conclusa o annullata), con una finestra per contestare l'esito.",
        "Aggiornamenti in tempo reale, archivio privato per avatar e prove, attività programmate sul database con pg_cron.",
        "App Flutter organizzata in 11 aree, con Riverpod, animazioni curate e rispetto della riduzione del movimento.",
        "38 test sul database, 31 test Flutter (anche su schermi da 360 e 430 dp) e un collaudo completo sul cloud.",
      ],
      en: [
        "Supabase backend on PostgreSQL, with row-level security (RLS) on every table and transactional functions for bets, payouts and outcomes.",
        "The app never writes balances or bets: every important action is an idempotent server call, so a double tap never places a double bet.",
        "Each prediction follows a state machine (open, locked, under review, settled or void), with a window to dispute the outcome.",
        "Real-time updates, private storage for avatars and proofs, and scheduled database jobs with pg_cron.",
        "A Flutter app split into 11 areas, with Riverpod, polished animations and support for reduced motion.",
        "38 database tests, 31 Flutter tests (including 360 and 430 dp screens) and a full end-to-end check on the cloud.",
      ],
    },
    stats: [
      { value: 11, label: { it: "aree dell'app", en: "app areas" } },
      { value: 38, label: { it: "test del database", en: "database tests" } },
      { value: 31, label: { it: "test Flutter", en: "Flutter tests" } },
      { value: 2, label: { it: "piattaforme: Android e web", en: "platforms: Android and web" } },
    ],
    tech: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Riverpod"],
    images: [
      { src: "/projects/called-it/home.png", alt: { it: "Home con le previsioni del gruppo", en: "Home screen with the group's predictions" } },
      { src: "/projects/called-it/puntata.png", alt: { it: "Dettaglio di una previsione con la puntata", en: "Prediction detail while placing a bet" } },
      { src: "/projects/called-it/crea.png", alt: { it: "Creazione di una nuova previsione", en: "Creating a new prediction" } },
      { src: "/projects/called-it/classifica.png", alt: { it: "Classifica del gruppo con il podio", en: "Group leaderboard with the podium" } },
    ],
    demo: "https://davidelicci.github.io/called-it-beta/",
  },
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
