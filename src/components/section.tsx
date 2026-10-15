import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2
          id={`${id}-title`}
          className="reveal mb-10 flex items-center gap-4 font-mono text-2xl font-medium text-fg sm:text-3xl"
        >
          <span className="text-base text-accent">{index}.</span>
          {title}
          <span aria-hidden className="reveal-line h-px flex-1 bg-linear-to-r from-accent/60 via-line to-line" />
        </h2>
        {children}
      </div>
    </section>
  );
}
