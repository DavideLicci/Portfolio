import { Briefcase, GraduationCap, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./section";

type JourneyProps = {
  index: string;
  dict: Dictionary["journey"];
};

export function Journey({ index, dict }: JourneyProps) {
  const { work, school } = dict;

  return (
    <Section id="journey" index={index} title={dict.title}>
      <ol>
        <Step icon={Briefcase} period={work.period} role={work.role} org={work.org}>
          <p className="mt-1 text-sm text-muted">{work.schedule}</p>
          <ul className="mt-4 space-y-2 text-base text-muted">
            {work.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden className="font-mono text-accent">
                  ▹
                </span>
                {point}
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-fg"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Step>
        <Step icon={GraduationCap} period={school.period} role={school.role} org={school.org} last />
      </ol>
    </Section>
  );
}

type StepProps = {
  icon: LucideIcon;
  period: string;
  role: string;
  org: string;
  last?: boolean;
  children?: ReactNode;
};

function Step({ icon: Icon, period, role, org, last = false, children }: StepProps) {
  return (
    <li className="reveal grid grid-cols-[2.5rem_1fr] gap-5">
      <div className="flex flex-col items-center">
        <span className="grid size-10 place-items-center rounded-full border border-line bg-surface text-accent">
          <Icon className="size-4" aria-hidden />
        </span>
        {!last && <span aria-hidden className="mt-2 w-px flex-1 bg-line" />}
      </div>
      <div className={last ? "pt-1.5" : "pt-1.5 pb-14"}>
        <p className="font-mono text-sm text-accent">{period}</p>
        <h3 className="mt-1 font-mono text-lg text-fg sm:text-xl">
          {role} <span className="text-muted">@ {org}</span>
        </h3>
        {children}
      </div>
    </li>
  );
}
