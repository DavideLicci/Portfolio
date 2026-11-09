import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { primaryButton, secondaryButton } from "@/components/buttons";
import { CvDocument } from "@/components/cv-document";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return { title: "404 — Davide Licci" };
  const { cv } = getDictionary(lang);
  return {
    title: cv.metaTitle,
    description: cv.metaDescription,
    alternates: { canonical: `/${lang}/cv`, languages: { it: "/it/cv", en: "/en/cv" } },
  };
}

export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  // Telefono e data di nascita esistono solo in .env.local (escluso da git): su Vercel non ci sono.
  const privateDetails = {
    phone: process.env.CV_PHONE,
    birthDate: process.env.CV_BIRTHDATE,
  };

  return (
    <div className="px-4 pt-28 pb-20 sm:px-6 sm:pt-32 print:p-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/${lang}`} className={secondaryButton}>
          <ArrowLeft className="size-4" aria-hidden />
          {dict.cv.back}
        </Link>
        <a href={`/cv/davide-licci-cv-${lang}.pdf`} download className={primaryButton}>
          <Download className="size-4" aria-hidden />
          {dict.cv.download}
        </a>
      </div>
      {/* Su schermi stretti il foglio A4 scorre di lato invece di deformarsi. */}
      <div className="overflow-x-auto print:overflow-visible">
        <div className="min-w-[210mm] print:min-w-0">
          <CvDocument lang={lang} dict={dict} privateDetails={privateDetails} />
        </div>
      </div>
    </div>
  );
}
