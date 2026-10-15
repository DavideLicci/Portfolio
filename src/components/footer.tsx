import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { GithubIcon } from "./icons";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-center font-mono text-xs text-muted sm:text-left">
          © {profile.name} · {dict.madeWith}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href="#main"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            {dict.backToTop}
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
