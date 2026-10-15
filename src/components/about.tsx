import Image from "next/image";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./section";

type AboutProps = {
  index: string;
  dict: Dictionary["about"];
};

export function About({ index, dict }: AboutProps) {
  const facts = [
    [dict.facts.role, profile.role],
    [dict.facts.education, dict.facts.educationValue],
    [dict.facts.experience, dict.facts.experienceValue],
    [dict.facts.github, `@${profile.github.username}`],
  ];

  return (
    <Section id="about" index={index} title={dict.title}>
      <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16 [&>*]:min-w-0">
        <div className="reveal">
          <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {dict.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <pre className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface p-5 font-mono text-sm leading-7">
            <code>
              <span className="text-[#c792ea]">const</span>
              <span className="text-fg"> davide </span>
              <span className="text-muted">= {"{"}</span>
              {"\n"}
              {facts.map(([key, value]) => (
                <span key={key}>
                  {"  "}
                  <span className="text-fg">{key}</span>
                  <span className="text-muted">: </span>
                  <span className="text-accent-hover">&quot;{value}&quot;</span>
                  <span className="text-muted">,</span>
                  {"\n"}
                </span>
              ))}
              <span className="text-muted">{"};"}</span>
            </code>
          </pre>
        </div>

        <div className="reveal mx-auto md:mx-0">
          <div className="group relative size-56 sm:size-64">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/60 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"
            />
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={dict.photoAlt}
                width={512}
                height={512}
                className="relative size-full rounded-2xl border border-line object-cover"
              />
            ) : (
              <div className="relative grid size-full place-items-center rounded-2xl border border-line bg-surface">
                <span className="font-mono text-6xl text-accent">{profile.initials}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
