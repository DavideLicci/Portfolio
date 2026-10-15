const it = {
  meta: {
    title: "Davide Licci — Junior Software Developer",
    description:
      "Portfolio di Davide Licci, sviluppatore software junior: competenze, percorso e contatti.",
  },
  nav: {
    skip: "Vai al contenuto",
    about: "Chi sono",
    skills: "Competenze",
    journey: "Percorso",
    projects: "Progetti",
    contact: "Contatti",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    switchLabel: "Switch to English",
    switchShort: "EN",
  },
  hero: {
    greeting: "Ciao, sono",
    tagline:
      "Scrivo codice in Python, C#, C, Java e PHP. Ho studiato Informatica a Jesi e in Loccioni ho guidato il progetto di un banco prova per iniettori.",
    ctaContact: "Contattami",
    ctaGithub: "GitHub",
    photoAlt: "Foto di Davide Licci",
    chipWork: "Stage @ Loccioni",
    chipSchool: "ITIS Informatica",
  },
  marquee: {
    pause: "Ferma il nastro delle tecnologie",
    play: "Fai ripartire il nastro delle tecnologie",
  },
  about: {
    title: "Chi sono",
    paragraphs: [
      "Sono Davide, uno sviluppatore software all'inizio del suo percorso. Dal 2020 al 2025 ho frequentato l'indirizzo Informatica all'I.I.S. «G. Marconi – E. Pieralisi» di Jesi.",
      "Nel 2024 ho fatto lo stage in Loccioni: ero il project manager di un banco prova per iniettori benzina e ho aiutato a sviluppare il codice C# di un sistema pick and place. Lì ho visto come il software diventa qualcosa che gira su macchine vere.",
      "Questo sito è il punto di partenza: presto ci troverai anche i miei progetti.",
    ],
    facts: {
      role: "ruolo",
      education: "formazione",
      educationValue: "Informatica · 2020–2025",
      experience: "esperienza",
      experienceValue: "Loccioni · 2024",
      github: "github",
    },
    stats: {
      school: "anni di Informatica all'ITIS",
      tech: "tecnologie con cui lavoro",
      stage: "l'anno dello stage in Loccioni",
    },
  },
  skills: {
    title: "Competenze",
    intro: "I linguaggi e gli strumenti con cui lavoro.",
    groups: {
      languages: "Linguaggi",
      webAndData: "Web e database",
      tools: "Strumenti",
    },
  },
  journey: {
    title: "Percorso",
    work: {
      period: "2024",
      org: "Loccioni",
      role: "Stage scuola-lavoro",
      schedule:
        "Febbraio – maggio, 2 giorni a settimana · prime due settimane di giugno e di settembre",
      points: [
        "Project manager di un banco prova per iniettori benzina.",
        "Sviluppo di codice C# per un sistema pick and place.",
      ],
      tags: ["C#", "Project management"],
    },
    school: {
      period: "2020 – 2025",
      org: "I.I.S. «G. Marconi – E. Pieralisi», Jesi",
      role: "Istituto tecnico · indirizzo Informatica",
    },
  },
  projects: {
    title: "Progetti",
    repo: "Codice",
    demo: "Demo",
  },
  contact: {
    title: "Contatti",
    heading: "Scriviamoci",
    intro:
      "Hai una domanda, una proposta o vuoi solo salutarmi? Compila il modulo: il messaggio arriva direttamente nella mia casella di posta.",
    githubCta: "Guarda il mio GitHub",
    form: {
      name: "Nome",
      namePlaceholder: "Mario Rossi",
      email: "Email",
      emailPlaceholder: "mario@email.it",
      message: "Messaggio",
      messagePlaceholder: "Scrivi qui il tuo messaggio…",
      submit: "Invia messaggio",
      sending: "Invio in corso…",
      success: "Messaggio inviato! Ti risponderò il prima possibile.",
      error: "Non sono riuscito a inviare il messaggio. Riprova tra poco.",
      notConfigured: "Il modulo non è ancora attivo: manca la chiave di Web3Forms.",
      subject: "Nuovo messaggio dal portfolio",
      errors: {
        name: "Scrivi il tuo nome.",
        email: "Inserisci un indirizzo email valido.",
        message: "Il messaggio deve avere almeno 10 caratteri.",
      },
    },
  },
  footer: {
    madeWith: "Fatto con Next.js e Tailwind CSS",
    backToTop: "Torna su",
  },
};

export default it;

export type Dictionary = typeof it;
