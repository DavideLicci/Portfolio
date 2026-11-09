import type { SessionLine } from "../projects";

// Output reale del gioco, catturato da una partita (i comandi sono quelli digitati).
export const oltreIlTempoSession: SessionLine[] = [
  { kind: "output", text: "╔════════════════════════════════════════════════════════╗\n║               Appartamento del detective               ║\n║                           ---                          ║\n║  [Scrivi il comando 'Look' per analizzare la stanza.]  ║\n╚════════════════════════════════════════════════════════╝" },
  { kind: "input", text: "look lente" },
  { kind: "output", text: "╔═════════╗\n║  Lente  ║\n╚═════════╝" },
  { kind: "art", text: "    .--==========\n  :*@@*==--=-=*@@@*\n  -@@*:          *@@%-\n .@@-               =@@@\n =@*                 *@@*\n =@=                  @@@\n =@%                 :@@@\n =@@                 #@@#\n .@@@               #@@@\n  =%@@*.        *@@@@@\n    -*%%*=====*%@%%@@%#:\n     ====-====-  =@@@@@#\n                   -@@@@@@=\n                    -@@@@@@*:\n                      *@@@@@@*\n                        *@@@@@-\n                          =-==" },
  { kind: "output", text: "╔═══════════════════════════════════════════════════════════════════════════╗\n║   La mia fidata lente di ingrandimento, la porto sempre ovunque io vada,  ║\n║                  non la lascerei mai per niente al mondo.                 ║\n║           [Puoi anche raccogliere direttamente gli oggetti senza          ║\n║                analizzarli usando il comando 'Pick Lente'.                ║\n║  Alla fine sei un uomo impegnato, non hai tempo per queste cose, penso?]  ║\n║                                  Peso: 2                                  ║\n╚═══════════════════════════════════════════════════════════════════════════╝" },
  { kind: "output", text: "╔═══════════════════════════╗\n║  Vuoi raccogliere Lente?  ║\n║            1-Sì           ║\n║            2-No           ║\n╚═══════════════════════════╝" },
  { kind: "input", text: "1" },
  { kind: "output", text: "╔═══════════════════════╗\n║  Hai raccolto Lente.  ║\n╚═══════════════════════╝" },
  { kind: "input", text: "move o" },
  { kind: "output", text: "╔════════════════════════════════════════╗\n║  Ti muovi verso Ufficio del detective  ║\n╚════════════════════════════════════════╝\n╔════════════════════════════════════════════════════════════════╗\n║                      Ufficio del detective                     ║\n║               Il mio vecchio e polveroso ufficio.              ║\n║   Il telefono sulla scrivania sta squillando insistentemente.  ║\n║  [Dovresti rispondere al telefono, è il tuo lavoro dopotutto.  ║\n║       Prima analizziamolo con il comando 'Look Telefono'.]     ║\n║                            Oggetti:                            ║\n║                        Persone: Telefono                       ║\n║                   Uscita Est: Camera da letto                  ║\n╚════════════════════════════════════════════════════════════════╝" },
  { kind: "input", text: "talk telefono" },
  { kind: "output", text: "╔═══════════════════════╗\n║  Detective Scarponi?  ║\n╚═══════════════════════╝\n╔════════════════════╗\n║      Risposte:     ║\n║  Si con chi parlo  ║\n╚════════════════════╝" },
  { kind: "input", text: "Si con chi parlo" },
  { kind: "output", text: "╔════════════════════════════════════════════════════════════════════╗\n║  Sono Sara Caretti, ho bisogno del suo aiuto, al porto di Genova.  ║\n║      Mio fratello Bruno è stato assassinato. La polizia indaga     ║\n║          ma ho bisogno di una seconda opinione, della sua.         ║\n╚════════════════════════════════════════════════════════════════════╝\n╔══════════════════╗\n║     Risposte:    ║\n║  Capisco arrivo  ║\n║   Sto arrivando  ║\n╚══════════════════╝" },
];
