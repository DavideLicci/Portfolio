import type { ReactNode } from "react";
import { certifications } from "@/content/certifications";
import { profile, skillGroups } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type PrivateDetails = { phone?: string; birthDate?: string };

type CvDocumentProps = {
  lang: Locale;
  dict: Dictionary;
  // Solo in locale (da .env.local, mai su GitHub né su Vercel): si vedono con /cv#completo.
  privateDetails: PrivateDetails;
};

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Il CV come foglio A4: lo stesso che si vede sul sito viene stampato in PDF.
export function CvDocument({ lang, dict, privateDetails }: CvDocumentProps) {
  const { cv, journey, skills } = dict;

  return (
    <article
      id="completo"
      className="cv-sheet mx-auto w-full max-w-[210mm] bg-white px-[13mm] py-[12mm] text-[10.5pt] leading-snug text-[#1f2933] shadow-2xl shadow-black/50 print:max-w-none print:shadow-none"
    >
      <header className="flex items-end justify-between gap-6 border-b-2 border-[#15803d] pb-4">
        <div>
          <h1 className="font-mono text-[24pt] leading-none font-semibold tracking-tight text-[#0b0f17]">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-[11pt] text-[#15803d]">{dict.hero.role}</p>
        </div>
        <p className="font-mono text-[8.5pt] tracking-widest text-[#52606d] uppercase">{cv.heading}</p>
      </header>

      <div className="mt-5 grid grid-cols-[58mm_1fr] gap-[8mm]">
        <aside className="space-y-5">
          <CvSection title={cv.sections.contacts}>
            <ul className="space-y-1 text-[9.5pt] break-words">
              <li>{profile.city}</li>
              {privateDetails.phone && <li data-private>{privateDetails.phone}</li>}
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <a href={profile.github.url}>{host(profile.github.url)}</a>
              </li>
              <li>
                <a href={profile.site}>{host(profile.site)}</a>
              </li>
              {privateDetails.birthDate && (
                <li data-private>
                  {cv.birth} {privateDetails.birthDate}
                </li>
              )}
            </ul>
          </CvSection>

          <CvSection title={cv.sections.skills}>
            <div className="space-y-2.5">
              {skillGroups.map((group) => (
                <div key={group.id}>
                  <p className="text-[8.5pt] font-semibold tracking-wide text-[#52606d] uppercase">
                    {skills.groups[group.id]}
                  </p>
                  <p className="mt-0.5 text-[9.5pt]">{group.items.map((item) => item.name).join(" · ")}</p>
                </div>
              ))}
            </div>
          </CvSection>

          <CvSection title={cv.sections.languages}>
            <ul className="space-y-1 text-[9.5pt]">
              {cv.languages.map((language) => (
                <li key={language.name} className="flex justify-between gap-2">
                  <span>{language.name}</span>
                  <span className="text-[#52606d]">{language.level}</span>
                </li>
              ))}
            </ul>
          </CvSection>

          {certifications.length > 0 && (
            <CvSection title={cv.sections.certifications}>
              <ul className="space-y-2 text-[9.5pt]">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-[#52606d]">
                      {cert.issuer} · {cert.year}
                    </p>
                  </li>
                ))}
              </ul>
            </CvSection>
          )}
        </aside>

        <div className="space-y-5">
          <CvSection title={cv.sections.profile}>
            <p className="text-[10pt] leading-relaxed">{cv.profile}</p>
          </CvSection>

          <CvSection title={cv.sections.education}>
            <CvEntry period={journey.university.period} title={journey.university.role} place={journey.university.org}>
              <CvPoints items={journey.university.points} />
            </CvEntry>
            <CvEntry period={journey.school.period} title={cv.diploma} place={journey.school.org} />
          </CvSection>

          <CvSection title={cv.sections.experience}>
            <CvEntry period={journey.work.period} title={journey.work.role} place={journey.work.org}>
              <p className="mt-0.5 text-[9pt] text-[#52606d]">{journey.work.schedule}</p>
              <CvPoints items={journey.work.points} />
            </CvEntry>
          </CvSection>

          <CvSection title={cv.sections.projects}>
            {projects.map((project) => (
              <CvEntry
                key={project.slug}
                period={project.year}
                title={project.title}
                place={[project.context[lang], project.grade, project.team[lang]].filter(Boolean).join(" · ")}
              >
                <p className="mt-1 text-[9.5pt] leading-relaxed">{project.summary[lang]}</p>
                <p className="mt-1 text-[9pt] text-[#52606d]">
                  {project.tech.join(" · ")} —{" "}
                  <a href={`${profile.site}/${lang}/projects/${project.slug}`}>
                    {host(profile.site)}/{lang}/projects/{project.slug}
                  </a>
                </p>
              </CvEntry>
            ))}
          </CvSection>
        </div>
      </div>

      <p className="mt-6 border-t border-[#d9e2ec] pt-3 text-[7.5pt] leading-snug text-[#7b8794]">{cv.consent}</p>
    </article>
  );
}

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="mb-2 font-mono text-[9pt] font-semibold tracking-[0.18em] text-[#15803d] uppercase">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function CvEntry({
  period,
  title,
  place,
  children,
}: {
  period: string;
  title: string;
  place: string;
  children?: ReactNode;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-semibold text-[#0b0f17]">{title}</p>
        <p className="shrink-0 font-mono text-[8.5pt] text-[#52606d]">{period}</p>
      </div>
      <p className="text-[9.5pt] text-[#3e4c59]">{place}</p>
      {children}
    </div>
  );
}

function CvPoints({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[9.5pt] marker:text-[#15803d]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
