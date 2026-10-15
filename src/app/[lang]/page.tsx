import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { projects } from "@/content/projects";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const hasProjects = projects.length > 0;

  return (
    <>
      <Hero dict={dict.hero} />
      <About index="01" dict={dict.about} />
      <Skills index="02" dict={dict.skills} />
      <Journey index="03" dict={dict.journey} />
      <Projects index="04" lang={lang} dict={dict.projects} />
      <Contact index={hasProjects ? "05" : "04"} dict={dict.contact} />
    </>
  );
}
