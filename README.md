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
| Certificazioni (idem: vuota = nascosta, anche nel menu) | `src/content/certifications.ts` |
| Colori e animazioni | `src/app/globals.css` |

**Foto profilo:** salva l'immagine in `public/` (es. `public/profile.jpg`) e in `src/content/profile.ts` imposta `photo: "/profile.jpg"`.

## Modulo contatti

I messaggi passano da [Web3Forms](https://web3forms.com), così l'indirizzo email non compare nella pagina.

1. Su web3forms.com inserisci la tua email e ricevi la chiave di accesso.
2. Copia `.env.example` come `.env.local` e incolla la chiave in `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. Su Vercel aggiungi la stessa variabile in **Settings → Environment Variables**.

## Curriculum (CV)

La pagina `/it/cv` (e `/en/cv`) è un foglio A4: lo stesso che viene stampato in PDF. I testi stanno sotto `cv` nei dizionari; istruzione, esperienza, progetti, competenze e certificazioni vengono presi dagli stessi dati del sito, quindi si aggiornano da soli.

- **Versione pubblica** (sul sito): email, GitHub, portfolio e città.
- **Versione completa** (solo per te): anche telefono e data di nascita, presi da `.env.local` (`CV_PHONE`, `CV_BIRTHDATE`), che **non va mai su GitHub**. Compaiono solo aprendo `/it/cv#completo` in locale.

Per rigenerare i PDF, con `npm run dev` avviato, stampa la pagina da Chrome (Ctrl+P → Salva come PDF, margini "Nessuno") oppure:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf="public\cv\davide-licci-cv-it.pdf" "http://localhost:3000/it/cv"
```

Per la versione completa usa l'indirizzo `http://localhost:3000/it/cv#completo` e salva il PDF **fuori dal progetto**.

## Mascotte (Mini Davide)

Un personaggio 2D in SVG con parti articolate (testa, braccia, gambe, occhi, bocche), in `src/components/mascot/`.

| Cosa | File |
| --- | --- |
| Disegno del personaggio | `mascot-figure.tsx` |
| Animazioni degli 8 stati (idle, wave, walk, point, think, talk, celebrate, sleep) | `mascot.css` |
| Stato, messaggi, comportamenti spontanei (si guarda intorno, si stiracchia, sbadiglia), sonnellino dopo 45 s | `use-mascot-actor.ts` |
| Sguardo che segue mouse, focus, tocchi e scroll | `use-mascot-gaze.ts` |
| Desktop ≥ 1400 px: nel margine sinistro, reagisce alle sezioni, si trascina (cade con la gravità) e si inclina se scorri veloce | `mascot-dock.tsx` |
| Sotto i 1400 px: dentro la pagina (Home, Progetti, Contatti) | `mascot-spot.tsx` |
| Testi delle nuvolette e della guida | `mascot` nei dizionari |
| Guida: argomenti e parole chiave riconosciute | `guide-intents.ts` |
| Guida: pannello con domande, pulsanti rapidi e navigazione | `mascot-guide.tsx` |

- Ogni messaggio contestuale compare una volta per sessione.
- Cliccando la mascotte si apre la guida: capisce la domanda dalle parole chiave (IT/EN), risponde con frasi fisse e porta alla sezione o pagina giusta. Per insegnarle un argomento nuovo: aggiungi l'intento in `guide-intents.ts` e la risposta nei dizionari.
- Si nasconde dal pulsante × (desktop) o dal footer; la scelta resta salvata nel browser.
- Con "riduci movimento" attivo le animazioni si fermano e restano le pose.
- Per farla reagire da un altro componente: `emitMascot("celebrate" | "form-focus" | "form-error")` da `mascot-store.ts`.

## Pubblicazione

Carica il progetto su GitHub, poi su [vercel.com/new](https://vercel.com/new) importa il repository: Vercel riconosce Next.js da solo.
