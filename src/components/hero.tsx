import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import Image from "next/image";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { primaryButton, secondaryButton } from "./buttons";
import { HeroBackdrop } from "./hero-backdrop";
import { GithubIcon } from "./icons";

type HeroDict = Dictionary["hero"];

export function Hero({ dict }: { dict: HeroDict }) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      <HeroBackdrop />

      <div className="relative mx-auto grid max-w-5xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
        <div className="order-last lg:order-first">
          <p className="animate-rise font-mono text-sm text-accent">$ whoami</p>
          <h1 className="mt-4 animate-rise font-mono font-medium tracking-tight [animation-delay:80ms]">
            <span className="block text-lg text-muted sm:text-xl">{dict.greeting}</span>
            <span className="mt-1 block text-5xl leading-[1.05] sm:text-7xl">
              <span className="bg-linear-to-r from-fg via-fg to-accent bg-clip-text text-transparent">
                {profile.name}
              </span>
              <span aria-hidden className="animate-blink text-accent">
                _
              </span>
            </span>
          </h1>
          <p className="mt-5 animate-rise font-mono text-lg text-accent [animation-delay:160ms]">
            {profile.role}
          </p>
          <p className="mt-6 max-w-xl animate-rise text-base leading-relaxed text-muted [animation-delay:240ms] sm:text-lg">
            {dict.tagline}
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:320ms]">
            <a href="#contact" className={primaryButton}>
              {dict.ctaContact}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButton}
            >
              <GithubIcon className="size-4" />
              {dict.ctaGithub}
            </a>
          </div>
        </div>

        <Portrait dict={dict} />
      </div>
    </section>
  );
}

const chip =
  "absolute flex animate-float items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 font-mono text-xs whitespace-nowrap text-fg shadow-lg shadow-black/30 backdrop-blur";

function Portrait({ dict }: { dict: HeroDict }) {
  return (
    <div className="relative mx-auto w-56 animate-rise [animation-delay:120ms] sm:w-72 lg:w-80">
      <div aria-hidden className="absolute -inset-8 rounded-[2.5rem] bg-accent/15 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/60"
      />

      {profile.photo ? (
        <Image
          src={profile.photo}
          alt={dict.photoAlt}
          width={640}
          height={640}
          preload
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 224px"
          className="relative aspect-square w-full rounded-2xl border border-line object-cover"
        />
      ) : (
        <div className="relative grid aspect-square w-full place-items-center rounded-2xl border border-line bg-surface">
          <span className="font-mono text-7xl text-accent">{profile.initials}</span>
        </div>
      )}

      {/* Etichette decorative: le stesse informazioni sono nella sezione Percorso. */}
      <div aria-hidden className={`${chip} -top-4 -left-5 sm:-left-10`}>
        <Briefcase className="size-3.5 text-accent" />
        {dict.chipWork}
      </div>
      <div aria-hidden className={`${chip} top-[58%] -right-5 [animation-delay:-2s] sm:-right-10`}>
        <GraduationCap className="size-3.5 text-accent" />
        {dict.chipSchool}
      </div>
      <div
        aria-hidden
        className="absolute -bottom-7 -left-4 animate-float rounded-lg border border-line bg-surface/95 px-4 py-2.5 font-mono text-xs leading-6 shadow-xl shadow-black/40 backdrop-blur [animation-delay:-4s] sm:-left-8"
      >
        <span className="text-accent">$ </span>
        <span className="text-muted">whoami</span>
        <br />
        <span className="text-fg">davide-licci</span>
        <span className="animate-blink text-accent">▍</span>
      </div>
    </div>
  );
}
