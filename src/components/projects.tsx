import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GithubIcon } from "./icons";
import { Section } from "./section";

type ProjectsProps = {
  index: string;
  lang: Locale;
  dict: Dictionary["projects"];
};

// Resta nascosta finché src/content/projects.ts è vuoto.
export function Projects({ index, lang, dict }: ProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <Section id="projects" index={index} title={dict.title}>
      <ul className="reveal grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/60"
          >
            <h3 className="font-mono text-lg text-fg">{project.title}</h3>
            <p className="mt-3 flex-1 text-muted">{project.summary[lang]}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="font-mono text-xs text-accent">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-4">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-fg transition-colors hover:text-accent"
                >
                  <GithubIcon className="size-4" />
                  {dict.repo}
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-fg transition-colors hover:text-accent"
                >
                  <ArrowUpRight className="size-4" aria-hidden />
                  {dict.demo}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
