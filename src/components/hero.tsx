import { ArrowRight } from "lucide-react";
import { languages, profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { primaryButton, secondaryButton } from "./buttons";
import { GithubIcon } from "./icons";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-size-[56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-2xl -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-5xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center [&>*]:min-w-0">
        <div>
          <p className="animate-rise font-mono text-sm text-accent">$ whoami</p>
          <h1 className="mt-4 animate-rise font-mono font-medium tracking-tight [animation-delay:80ms]">
            <span className="block text-lg text-muted sm:text-xl">{dict.greeting}</span>
            <span className="mt-1 block text-4xl text-fg sm:text-6xl">
              {profile.name}
              <span aria-hidden className="animate-blink text-accent">
                _
              </span>
            </span>
          </h1>
          <p className="mt-4 animate-rise font-mono text-lg text-accent [animation-delay:160ms]">
            {profile.role}
          </p>
          <p className="mt-6 max-w-xl animate-rise text-base leading-relaxed text-muted [animation-delay:240ms] sm:text-lg">
            {dict.tagline}
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:320ms]">
            <a href="#contact" className={primaryButton}>
              {dict.ctaContact}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButton}
            >
              <GithubIcon className="size-4" />
              {dict.ctaGithub}
            </a>
          </div>
        </div>

        {/* Decorativo: ripete in forma di terminale informazioni già presenti nella pagina. */}
        <div
          aria-hidden
          className="animate-rise overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40 [animation-delay:400ms]"
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-muted">davide@portfolio: ~</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-fg">
            <code>
              <Prompt command="whoami" />
              {"davide-licci\n"}
              <Prompt command={`cat ${dict.languagesFile}`} />
              {languages.map((language) => language.name.toLowerCase()).join("  ")}
              {"\n"}
              <Prompt command={`ls ${dict.experienceDir}/`} />
              <span className="text-[#7aa2f7]">loccioni-2024/  itis-informatica/</span>
              {"\n"}
              <span className="text-accent">$ </span>
              <span className="animate-blink">▍</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function Prompt({ command }: { command: string }) {
  return (
    <>
      <span className="text-accent">$ </span>
      <span className="text-muted">{command}</span>
      {"\n"}
    </>
  );
}
