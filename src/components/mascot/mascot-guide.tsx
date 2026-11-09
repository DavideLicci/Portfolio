"use client";

import { ArrowUpRight, SendHorizontal, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  type GuideIntent,
  type GuideTarget,
  hasCertifications,
  hasProjects,
  INTENTS,
  matchIntent,
} from "./guide-intents";
import { useMascotDict, useMascotLang } from "./mascot-context";
import type { MascotState } from "./mascot-figure";
import { useMascotHidden } from "./mascot-store";

type LogEntry = { from: "bot" | "user"; text: string; link?: { href: string; label: string } };

type MascotGuideProps = {
  id: string;
  // "floating": sopra la mascotte nel margine (desktop); "inline": sotto la mascotte, nel flusso (mobile)
  variant: "floating" | "inline";
  onClose: () => void;
  onReact: (state: MascotState) => void;
};

const CHIP_INTENTS = ["projects", "game", "app", "skills", "journey", "certifications", "contact"] as const;
const NAVIGATE_DELAY_MS = 700;

// La guida: capisce la domanda con le parole chiave di guide-intents.ts,
// risponde con i testi del dizionario e porta alla sezione o pagina giusta.
export function MascotGuide({ id, variant, onClose, onReact }: MascotGuideProps) {
  const dict = useMascotDict().guide;
  const lang = useMascotLang();
  const router = useRouter();
  const pathname = usePathname();
  const [, setHidden] = useMascotHidden();
  const [log, setLog] = useState<LogEntry[]>([{ from: "bot", text: dict.intro }]);
  const [question, setQuestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const chips = CHIP_INTENTS.filter(
    (intent) =>
      (intent !== "certifications" || hasCertifications) &&
      ((intent !== "game" && intent !== "app") || hasProjects),
  );

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  // Esc chiude; nel margine anche un clic fuori dal pannello.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((target as Element).closest?.(`[aria-controls="${id}"]`)) return;
      onClose();
    };
    window.addEventListener("keydown", onKey);
    if (variant === "floating") window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [id, onClose, variant]);

  const go = (target: GuideTarget) => {
    const home = `/${lang}`;
    switch (target.kind) {
      case "section": {
        const element = document.getElementById(target.id);
        if (pathname === home && element) {
          const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          element.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
          window.history.replaceState(null, "", `${home}#${target.id}`);
        } else {
          router.push(`${home}#${target.id}`);
        }
        break;
      }
      case "page":
        router.push(`${home}${target.path}`);
        break;
      case "switch-language":
        router.push(pathname.replace(/^\/(it|en)(?=\/|$)/, lang === "it" ? "/en" : "/it"));
        break;
      case "hide":
        setHidden(true);
        break;
    }
  };

  const answer = (intent: GuideIntent | null, userText: string) => {
    const entries: LogEntry[] = [{ from: "user", text: userText }];

    if (!intent) {
      entries.push({ from: "bot", text: dict.fallback });
      setLog((current) => [...current, ...entries].slice(-8));
      onReact("think");
      return;
    }

    const target = INTENTS[intent].target();
    const text =
      intent === "certifications" && target.kind === "none"
        ? dict.answers.certificationsEmpty
        : dict.answers[intent];
    entries.push({
      from: "bot",
      text,
      link:
        target.kind === "external"
          ? { href: target.url, label: dict.openLink }
          : target.kind === "cv"
            ? { href: `/cv/davide-licci-cv-${lang}.pdf`, label: dict.openCv }
            : undefined,
    });
    setLog((current) => [...current, ...entries].slice(-8));

    if (target.kind === "none" || target.kind === "external" || target.kind === "cv") {
      onReact(intent === "greeting" ? "wave" : "talk");
      return;
    }
    onReact(target.kind === "hide" ? "wave" : "point");
    window.setTimeout(() => {
      go(target);
      if (variant === "inline" || target.kind !== "section") onClose();
    }, target.kind === "hide" ? 1400 : NAVIGATE_DELAY_MS);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = question.trim();
    if (!text) return;
    setQuestion("");
    answer(matchIntent(text), text);
  };

  return (
    <div
      ref={panelRef}
      id={id}
      role="region"
      aria-label={dict.title}
      className={`flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/50 ${
        variant === "floating" ? "absolute bottom-full left-0 mb-3 w-80" : "mt-3 w-full max-w-md"
      }`}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="font-mono text-xs text-accent">{dict.title}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.close}
          className="-mr-2 grid size-9 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <div
        ref={logRef}
        aria-live="polite"
        className="max-h-56 space-y-2 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
      >
        {log.map((entry, index) => (
          <div
            key={index}
            className={entry.from === "user" ? "text-right text-accent" : "text-fg"}
          >
            {entry.from === "user" ? <span>&gt; {entry.text}</span> : entry.text}
            {entry.link && (
              <a
                href={entry.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex w-fit items-center gap-1 text-accent underline underline-offset-4"
              >
                {entry.link.label}
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            )}
          </div>
        ))}
      </div>

      <ul className="flex flex-wrap gap-1.5 px-4 pb-3">
        {chips.map((intent) => (
          <li key={intent}>
            <button
              type="button"
              onClick={() => answer(intent, dict.chips[intent])}
              className="min-h-8 rounded-full border border-line px-2.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {dict.chips[intent]}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-3 py-2.5">
        <label htmlFor={`${id}-input`} className="sr-only">
          {dict.inputLabel}
        </label>
        <input
          ref={inputRef}
          id={`${id}-input`}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={dict.placeholder}
          autoComplete="off"
          maxLength={120}
          className="min-w-0 flex-1 rounded-lg border border-line-strong bg-bg px-3 py-2 text-base text-fg placeholder:text-muted/60 focus-visible:border-accent focus-visible:outline-none sm:text-sm"
        />
        <button
          type="submit"
          aria-label={dict.send}
          className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-ink transition-colors hover:bg-accent-hover"
        >
          <SendHorizontal className="size-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
