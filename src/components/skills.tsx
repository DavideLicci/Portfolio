import { languages } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./section";

type SkillsProps = {
  index: string;
  dict: Dictionary["skills"];
};

export function Skills({ index, dict }: SkillsProps) {
  return (
    <Section id="skills" index={index} title={dict.title}>
      <div className="reveal">
        <p className="mb-10 text-base text-muted sm:text-lg">{dict.intro}</p>
        <h3 className="mb-4 font-mono text-xs tracking-widest text-muted uppercase">
          {dict.languagesTitle}
        </h3>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {languages.map((language) => (
            <li
              key={language.name}
              className="group rounded-xl border border-line bg-surface p-5 transition-[translate,border-color] duration-200 hover:-translate-y-1 hover:border-accent/60"
            >
              <span className="font-mono text-xs text-muted">{language.file}</span>
              <span className="mt-8 block font-mono text-2xl text-fg transition-colors group-hover:text-accent">
                {language.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
