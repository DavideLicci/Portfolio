# Portfolio — Davide Licci

Sito personale in italiano e inglese, fatto con Next.js 16 e Tailwind CSS 4.

## Avvio in locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000: ti porta su `/it` o `/en` in base alla lingua del browser.

## Dove modificare i contenuti

| Cosa | File |
| --- | --- |
| Nome, ruolo, link GitHub, foto, competenze | `src/content/profile.ts` |
| Testi in italiano | `src/i18n/dictionaries/it.ts` |
| Testi in inglese | `src/i18n/dictionaries/en.ts` |
| Progetti (la sezione compare quando la lista non è vuota) | `src/content/projects.ts` |
| Colori e animazioni | `src/app/globals.css` |

**Foto profilo:** salva l'immagine in `public/` (es. `public/profile.jpg`) e in `src/content/profile.ts` imposta `photo: "/profile.jpg"`.

## Modulo contatti

I messaggi passano da [Web3Forms](https://web3forms.com), così l'indirizzo email non compare nella pagina.

1. Su web3forms.com inserisci la tua email e ricevi la chiave di accesso.
2. Copia `.env.example` come `.env.local` e incolla la chiave in `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. Su Vercel aggiungi la stessa variabile in **Settings → Environment Variables**.

## Mascotte (Mini Davide)

Un personaggio 2D in SVG con parti articolate (testa, braccia, gambe, occhi, bocche), in `src/components/mascot/`.

| Cosa | File |
| --- | --- |
| Disegno del personaggio | `mascot-figure.tsx` |
| Animazioni degli 8 stati (idle, wave, walk, point, think, talk, celebrate, sleep) | `mascot.css` |
| Stato, messaggi, sonnellino dopo 45 s di inattività | `use-mascot-actor.ts` |
| Desktop ≥ 1400 px: fissa nel margine sinistro, reagisce alle sezioni | `mascot-dock.tsx` |
| Sotto i 1400 px: dentro la pagina (Home, Progetti, Contatti) | `mascot-spot.tsx` |
| Testi delle nuvolette | `mascot` nei dizionari |

- Ogni messaggio contestuale compare una volta per sessione; cliccando la mascotte risponde.
- Si nasconde dal pulsante × (desktop) o dal footer; la scelta resta salvata nel browser.
- Con "riduci movimento" attivo le animazioni si fermano e restano le pose.
- Per farla reagire da un altro componente: `emitMascot("celebrate")` da `mascot-store.ts`.

## Pubblicazione

Carica il progetto su GitHub, poi su [vercel.com/new](https://vercel.com/new) importa il repository: Vercel riconosce Next.js da solo.
