import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { projects } from "@/content/projects";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fontVariables } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return { title: "404 — Davide Licci" };
  const { meta } = getDictionary(lang);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { it: "/it", en: "/en" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: lang === "it" ? "it_IT" : "en_US",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  // Con una lingua sconosciuta (es. /fr) il layout usa l'italiano e la pagina
  // chiama notFound(), così la 404 compare dentro il sito con header e footer.
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 font-mono text-sm text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          {dict.nav.skip}
        </a>
        <Header lang={locale} dict={dict.nav} showProjects={projects.length > 0} />
        <main id="main">{children}</main>
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}
