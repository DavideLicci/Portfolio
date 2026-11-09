import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { MascotSpot } from "./mascot/mascot-spot";
import { ProjectSession } from "./project-session";
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
      <MascotSpot variant="projects" className="mb-8" />
      <ul className="space-y-6">
        {projects.map((project) => {
          // Nella card basta un pezzo di partita: dalla telefonata in poi.
          const preview = project.session?.slice(-4);

          return (
            <li
              key={project.slug}
              data-spotlight
              data-mascot-hover="project"
              className="reveal group relative grid gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:items-center [&>*]:min-w-0"
            >
              <div>
                <p className="font-mono text-xs text-accent">
                  {project.context[lang]} · {project.year}
                </p>
                <h3 className="mt-2 font-mono text-3xl text-fg sm:text-4xl">
                  <Link
                    href={`/${lang}/projects/${project.slug}`}
                    className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{project.summary[lang]}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.grade && (
                    <li className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                      {dict.grade} {project.grade}
                    </li>
                  )}
                  <li className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg">
                    {project.team[lang]}
                  </li>
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors group-hover:text-accent">
                  {dict.readMore}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </p>
              </div>

              {preview && (
                <div aria-hidden className="relative">
                  <ProjectSession
                    lines={preview}
                    title={`${project.slug}.exe`}
                    className="transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
