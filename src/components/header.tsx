"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type HeaderProps = {
  lang: Locale;
  dict: Dictionary["nav"];
  showProjects: boolean;
};

export function Header({ lang, dict, showProjects }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const otherLang: Locale = lang === "it" ? "en" : "it";

  const links = [
    { href: "#about", label: dict.about },
    { href: "#skills", label: dict.skills },
    { href: "#journey", label: dict.journey },
    ...(showProjects ? [{ href: "#projects", label: dict.projects }] : []),
    { href: "#contact", label: dict.contact },
  ];

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="rounded-md font-mono text-sm text-fg transition-colors hover:text-accent"
        >
          <span className="text-accent">~/</span>davide-licci
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={`/${otherLang}`}
            hrefLang={otherLang}
            className="grid min-h-11 min-w-11 place-items-center rounded-lg border border-line-strong px-3 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {dict.switchShort}
            <span className="sr-only"> — {dict.switchLabel}</span>
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-fg transition-colors hover:text-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-bg md:hidden">
        <ul className="mx-auto flex max-w-5xl flex-col px-4 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-base text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
