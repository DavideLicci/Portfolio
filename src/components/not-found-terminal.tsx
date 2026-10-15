import Link from "next/link";

// Usato sia dalla 404 dentro il sito (app/[lang]/not-found.tsx) sia da quella globale.
export function NotFoundTerminal() {
  return (
    <div className="w-full max-w-md rounded-xl border border-line bg-surface p-6 font-mono text-sm leading-7">
      <p>
        <span className="text-accent">$ </span>
        <span className="text-muted">cd pagina-richiesta</span>
      </p>
      <h1 className="text-danger">404: pagina non trovata · page not found</h1>
      <p className="mt-4 flex gap-4">
        <Link href="/it" className="text-fg underline underline-offset-4 hover:text-accent">
          Torna alla home
        </Link>
        <Link href="/en" lang="en" className="text-fg underline underline-offset-4 hover:text-accent">
          Back home
        </Link>
      </p>
    </div>
  );
}
