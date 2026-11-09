import { ArrowUpRight, Award } from "lucide-react";
import { certifications } from "@/content/certifications";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./section";

type CertificationsProps = {
  index: string;
  lang: Locale;
  dict: Dictionary["certifications"];
};

// Resta nascosta finché src/content/certifications.ts è vuoto.
export function Certifications({ index, lang, dict }: CertificationsProps) {
  if (certifications.length === 0) return null;

  return (
    <Section id="certifications" index={index} title={dict.title}>
      <ul className="reveal grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={`${cert.name}-${cert.year}`}
            data-spotlight
            className="flex gap-4 rounded-xl border border-line bg-surface p-5"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-bg text-accent">
              <Award className="size-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-xs text-accent">
                {cert.issuer} · {cert.year}
              </p>
              <h3 className="mt-1 font-mono text-base text-fg">{cert.name}</h3>
              {cert.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{cert.description[lang]}</p>
              )}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-fg transition-colors hover:text-accent"
                >
                  {dict.credential}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
