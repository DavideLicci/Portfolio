import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { TechMarquee } from "@/components/tech-marquee";
import { technologies } from "@/content/profile";
import { certifications } from "@/content/certifications";
import { projects } from "@/content/projects";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  // Le sezioni facoltative (vuote = nascoste) non devono lasciare buchi nella numerazione.
  let count = 3;
  const next = () => String(++count).padStart(2, "0");
  const certificationsIndex = certifications.length > 0 ? next() : "";
  const projectsIndex = projects.length > 0 ? next() : "";
  const contactIndex = next();

  return (
    <>
      <Hero dict={dict.hero} />
      <TechMarquee items={technologies.map((tech) => tech.name)} dict={dict.marquee} />
      <About index="01" dict={dict.about} />
      <Skills index="02" dict={dict.skills} />
      <Journey index="03" dict={dict.journey} />
      <Certifications index={certificationsIndex} lang={lang} dict={dict.certifications} />
      <Projects index={projectsIndex} lang={lang} dict={dict.projects} />
      <Contact index={contactIndex} dict={dict.contact} />
    </>
  );
}
