import { profile, technologies } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { CountUp } from "./count-up";
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

  const stats = [
    { value: 5, label: dict.stats.school },
    { value: technologies.length, label: dict.stats.tech },
    { value: 2024, from: 2020, label: dict.stats.stage },
  ];

  return (
    <Section id="about" index={index} title={dict.title}>
      <div className="grid gap-12 md:grid-cols-[1fr_15rem] md:gap-14 [&>*]:min-w-0">
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

        <ul className="reveal grid grid-cols-3 gap-3 self-start sm:gap-4 md:grid-cols-1">
          {stats.map((stat) => (
            <li
              key={stat.label}
              data-spotlight
              className="rounded-xl border border-line bg-surface p-4 sm:p-5"
            >
              <p className="font-mono text-3xl text-accent sm:text-4xl">
                <CountUp value={stat.value} from={stat.from} />
              </p>
              <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
