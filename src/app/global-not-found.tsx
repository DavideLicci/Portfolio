import type { Metadata } from "next";
import { NotFoundTerminal } from "@/components/not-found-terminal";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Davide Licci",
};

export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${fontVariables} antialiased`}>
      <body className="grid min-h-dvh place-items-center px-4">
        <main className="flex w-full justify-center">
          <NotFoundTerminal />
        </main>
      </body>
    </html>
  );
}
