import { skillGroups } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./section";

type SkillsProps = {
  index: string;
  dict: Dictionary["skills"];
};

export function Skills({ index, dict }: SkillsProps) {
  return (
    <Section id="skills" index={index} title={dict.title}>
      <p className="reveal mb-10 text-base text-muted sm:text-lg">{dict.intro}</p>
      <div className="space-y-10">
        {skillGroups.map((group) => (
          <div key={group.id} className="reveal">
            <h3 className="mb-4 font-mono text-xs tracking-widest text-muted uppercase">
              {dict.groups[group.id]}
            </h3>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {group.items.map((skill) => (
                <li
                  key={skill.name}
                  data-spotlight
                  className="group rounded-xl border border-line bg-surface p-5 transition-[translate] duration-200 hover:-translate-y-1"
                >
                  <span className="font-mono text-xs text-muted">{skill.file}</span>
                  <span className="mt-8 block font-mono text-2xl text-fg transition-colors group-hover:text-accent">
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
