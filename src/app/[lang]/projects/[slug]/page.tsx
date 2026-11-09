import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { primaryButton } from "@/components/buttons";
import { CountUp } from "@/components/count-up";
import { PhoneScreen } from "@/components/phone-screen";
import { ProjectSession } from "@/components/project-session";
import { getProject, projects } from "@/content/projects";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Le pagine dei progetti sono già prerenderizzate: leggere `params` fuori da <Suspense>
// non rallenta la navigazione e permette a un progetto inesistente di rispondere 404.
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return { title: "404 — Davide Licci" };

  return {
    title: `${project.title} — Davide Licci`,
    description: project.summary[lang],
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { it: `/it/projects/${slug}`, en: `/en/projects/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();
  const dict = getDictionary(lang).projects;

  return (
    <article className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          href={`/${lang}#projects`}
          className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {dict.back}
        </Link>

        <header className="mt-6 animate-rise">
          <p className="font-mono text-sm text-accent">
            {project.context[lang]} · {project.year}
          </p>
          <h1 className="mt-3 font-mono text-4xl font-medium tracking-tight text-fg sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {project.summary[lang]}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.grade && (
              <li className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-sm text-accent">
                {dict.grade} {project.grade}
              </li>
            )}
            <li className="rounded-full border border-line px-3 py-1 font-mono text-sm text-fg">
              {project.team[lang]}
            </li>
          </ul>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${primaryButton} mt-7`}
            >
              {dict.tryDemo}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </header>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {project.stats.map((stat) => (
            <li
              key={stat.label.it}
              data-spotlight
              className="rounded-xl border border-line bg-surface p-4 sm:p-5"
            >
              <p className="font-mono text-3xl text-accent sm:text-4xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label[lang]}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
          <section className="reveal" aria-labelledby="about-game">
            <h2 id="about-game" className="font-mono text-xl text-fg">
              <span className="text-accent">## </span>
              {dict.aboutGame}
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted">
              {project.description[lang].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div
              data-spotlight
              className="mt-8 rounded-xl border border-line border-l-accent bg-surface p-5 sm:border-l-2"
            >
              <h2 className="font-mono text-sm tracking-widest text-accent uppercase">
                {dict.role}
              </h2>
              <p className="mt-2 leading-relaxed text-fg">{project.role[lang]}</p>
            </div>
          </section>

          <section className="reveal" aria-labelledby="highlights">
            <h2 id="highlights" className="font-mono text-xl text-fg">
              <span className="text-accent">## </span>
              {dict.highlights}
            </h2>
            <ul className="mt-4 space-y-3 text-muted">
              {project.highlights[lang].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="font-mono text-accent">
                    ▹
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-mono text-sm tracking-widest text-muted uppercase">
              {dict.tech}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-fg"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {project.images && (
          <section className="reveal mt-20" aria-labelledby="screens">
            <h2 id="screens" className="font-mono text-xl text-fg">
              <span className="text-accent">## </span>
              {dict.screens}
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
              {project.images.map((image) => (
                <li key={image.src}>
                  <PhoneScreen
                    src={image.src}
                    alt={image.alt[lang]}
                    sizes="(min-width: 1024px) 230px, 45vw"
                  />
                  <p className="mt-3 text-center text-sm text-muted">{image.alt[lang]}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.session && (
          <section className="reveal mt-20" aria-labelledby="session">
            <h2 id="session" className="font-mono text-xl text-fg">
              <span className="text-accent">## </span>
              {dict.session}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {dict.sessionNote} {dict.gameLanguage}
            </p>
            <ProjectSession
              lines={project.session}
              title={`${project.slug}.exe`}
              className="mt-6"
            />
          </section>
        )}
      </div>
    </article>
  );
}
