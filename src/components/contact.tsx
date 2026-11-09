import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ContactForm } from "./contact-form";
import { GithubIcon } from "./icons";
import { MascotSpot } from "./mascot/mascot-spot";
import { Section } from "./section";

type ContactProps = {
  index: string;
  lang: Locale;
  dict: Dictionary["contact"];
};

export function Contact({ index, lang, dict }: ContactProps) {
  return (
    <Section id="contact" index={index} title={dict.title}>
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] [&>*]:min-w-0">
        <div className="reveal">
          <p className="font-mono text-3xl text-fg sm:text-4xl">{dict.heading}</p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{dict.intro}</p>
          <MascotSpot variant="contact" className="mt-6" />

          <a
            href={profile.github.url}
            target="_blank"
            rel="noopener noreferrer"
            data-spotlight
            className="group mt-8 flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/60"
          >
            <GithubIcon className="size-8 shrink-0 text-fg" />
            <span className="flex-1">
              <span className="block font-mono text-sm text-fg">
                github.com/{profile.github.username}
              </span>
              <span className="block text-sm text-muted">{dict.githubCta}</span>
            </span>
            <ArrowUpRight
              className="size-5 text-muted transition-[translate,color] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden
            />
          </a>
          <Link
            href={`/${lang}/cv`}
            data-spotlight
            className="group mt-4 flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/60"
          >
            <FileText className="size-8 shrink-0 text-fg" aria-hidden />
            <span className="flex-1">
              <span className="block font-mono text-sm text-fg">{dict.cvTitle}</span>
              <span className="block text-sm text-muted">{dict.cvCta}</span>
            </span>
            <ArrowUpRight
              className="size-5 text-muted transition-[translate,color] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden
            />
          </Link>
        </div>

        <div className="reveal">
          <ContactForm dict={dict.form} />
        </div>
      </div>
    </Section>
  );
}
