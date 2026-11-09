import { certifications } from "@/content/certifications";
import { projects } from "@/content/projects";

// Argomenti che la guida riconosce. Le parole chiave valgono in entrambe le lingue
// (senza accenti e in minuscolo); le risposte stanno nei dizionari, sotto mascot.guide.answers.

export type GuideIntent =
  | "greeting"
  | "help"
  | "about"
  | "skills"
  | "journey"
  | "certifications"
  | "projects"
  | "game"
  | "app"
  | "contact"
  | "github"
  | "cv"
  | "language"
  | "hide";

// Dove porta ogni argomento: una sezione della home, una pagina, un link esterno o niente.
export type GuideTarget =
  | { kind: "section"; id: string }
  | { kind: "page"; path: string }
  | { kind: "external"; url: string }
  | { kind: "cv" }
  | { kind: "switch-language" }
  | { kind: "hide" }
  | { kind: "none" };

type IntentDefinition = {
  keywords: string[];
  // A parità di parole trovate vince la priorità più alta (es. "gioco" batte "progetti").
  priority: number;
  target: () => GuideTarget;
};

// Pagina del progetto, oppure la sezione Progetti se quel progetto non c'è più.
function projectPage(slug: string): GuideTarget {
  return projects.some((project) => project.slug === slug)
    ? { kind: "page", path: `/projects/${slug}` }
    : { kind: "section", id: "projects" };
}

export const INTENTS: Record<GuideIntent, IntentDefinition> = {
  greeting: {
    keywords: ["ciao", "salve", "buongiorno", "buonasera", "hey", "ehi", "hello", "hi", "good morning"],
    priority: 0,
    target: () => ({ kind: "none" }),
  },
  help: {
    keywords: ["aiuto", "cosa puoi", "cosa sai", "come funziona", "help", "what can you", "how does"],
    priority: 1,
    target: () => ({ kind: "none" }),
  },
  about: {
    keywords: ["chi sei", "chi e", "chi e davide", "presentati", "su di te", "davide", "biografia", "who are you", "about", "yourself", "who is"],
    priority: 2,
    target: () => ({ kind: "section", id: "about" }),
  },
  skills: {
    keywords: ["competenze", "linguaggi", "linguaggio", "tecnologie", "sai fare", "skill", "python", "c#", "csharp", "java", "php", "sql", "html", "css", "git", "programmare", "languages", "technologies", "stack", "tools", "strumenti"],
    priority: 3,
    target: () => ({ kind: "section", id: "skills" }),
  },
  journey: {
    keywords: ["percorso", "esperienza", "esperienze", "stage", "tirocinio", "loccioni", "scuola", "itis", "marconi", "pieralisi", "studi", "studia", "studio", "studiare", "studiato", "formazione", "diploma", "experience", "internship", "school", "education", "study", "studies", "studied", "background", "pick and place", "iniettori", "universita", "univpm", "politecnica", "laurea", "ingegneria", "corso di laurea", "university", "degree", "engineering"],
    priority: 3,
    target: () => ({ kind: "section", id: "journey" }),
  },
  certifications: {
    keywords: ["certificazioni", "certificazione", "certificati", "certificato", "attestati", "attestato", "corsi", "corso", "certification", "certifications", "certificate", "courses", "badge"],
    priority: 4,
    target: () =>
      certifications.length > 0 ? { kind: "section", id: "certifications" } : { kind: "none" },
  },
  projects: {
    // Niente parole generiche come "fatto" o "made": rubavano domande tipo "dove ha fatto lo stage?".
    keywords: ["progetti", "progetto", "lavori", "portfolio", "esame", "esami", "projects", "project", "exam"],
    priority: 4,
    target: () => ({ kind: "section", id: "projects" }),
  },
  game: {
    keywords: ["gioco", "giochi", "videogioco", "oltre il tempo", "detective", "avventura", "testuale", "oop", "oggetti", "28", "game", "games", "text adventure", "beyond time"],
    priority: 5,
    target: () => projectPage("oltre-il-tempo"),
  },
  app: {
    keywords: ["app", "applicazione", "applicazioni", "called it", "calledit", "flutter", "supabase", "previsioni", "scommesse", "mobile", "android", "prediction", "predictions"],
    priority: 5,
    target: () => projectPage("called-it"),
  },
  contact: {
    keywords: ["contatti", "contatto", "contattare", "contattarlo", "contattarti", "scrivere", "scrivergli", "scriverti", "email", "mail", "messaggio", "assumere", "assumerti", "collaborare", "parlare", "contact", "reach", "hire", "write", "message", "talk to"],
    priority: 5,
    target: () => ({ kind: "section", id: "contact" }),
  },
  github: {
    keywords: ["github", "codice", "repository", "repo", "sorgente", "code", "source"],
    priority: 6,
    target: () => ({ kind: "external", url: "https://github.com/DavideLicci" }),
  },
  cv: {
    keywords: ["cv", "curriculum", "resume", "pdf"],
    priority: 6,
    target: () => ({ kind: "cv" }),
  },
  language: {
    keywords: ["inglese", "english", "italiano", "italian", "lingua", "language", "traduci", "translate"],
    priority: 6,
    target: () => ({ kind: "switch-language" }),
  },
  hide: {
    keywords: ["nasconditi", "vai via", "sparisci", "chiudi la mascotte", "go away", "hide yourself", "disappear"],
    priority: 7,
    target: () => ({ kind: "hide" }),
  },
};

function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9#+ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

// Restituisce l'argomento con più parole chiave trovate, o null se non ne riconosce nessuno.
export function matchIntent(question: string): GuideIntent | null {
  const text = normalize(question);
  let best: { intent: GuideIntent; score: number; priority: number } | null = null;

  for (const [intent, definition] of Object.entries(INTENTS) as [GuideIntent, IntentDefinition][]) {
    const score = definition.keywords.filter((keyword) => text.includes(` ${keyword} `) || (keyword.includes(" ") && text.includes(keyword))).length;
    if (score === 0) continue;
    if (!best || score > best.score || (score === best.score && definition.priority > best.priority)) {
      best = { intent, score, priority: definition.priority };
    }
  }
  return best?.intent ?? null;
}

export const hasCertifications = certifications.length > 0;
export const hasProjects = projects.length > 0;
