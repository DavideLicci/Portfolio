import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Davide Licci",
};

export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${fontVariables} antialiased`}>
      <body className="grid min-h-dvh place-items-center px-4 font-mono">
        <main className="w-full max-w-md rounded-xl border border-line bg-surface p-6 text-sm leading-7">
          <p>
            <span className="text-accent">$ </span>
            <span className="text-muted">cd pagina-richiesta</span>
          </p>
          <p className="text-danger">404: pagina non trovata · page not found</p>
          <p className="mt-4 flex gap-4">
            <Link href="/it" className="text-fg underline underline-offset-4 hover:text-accent">
              Torna alla home
            </Link>
            <Link href="/en" lang="en" className="text-fg underline underline-offset-4 hover:text-accent">
              Back home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
