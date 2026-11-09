import type { Locale } from "@/i18n/config";

// La sezione Certificazioni (e la sua voce nel menu) compare da sola quando questa lista non è vuota.
// Esempio:
// {
//   name: "Cisco CCNA: Introduction to Networks",
//   issuer: "Cisco Networking Academy",
//   year: "2023",
//   description: { it: "Fondamenti di reti e protocolli.", en: "Networking and protocol fundamentals." },
//   url: "https://www.credly.com/badges/…", // link alla credenziale, facoltativo
// },

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  description?: Record<Locale, string>;
  url?: string;
};

export const certifications: Certification[] = [
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2026",
    description: {
      it: "Minacce, attacchi e vulnerabilità più comuni, come proteggersi online e come le aziende difendono i propri sistemi.",
      en: "The most common threats, attacks and vulnerabilities, how to stay safe online and how organizations protect their systems.",
    },
    // Attestato originale (31 luglio 2026); con il link del badge Credly si può sostituire.
    url: "/certificates/cisco-introduction-to-cybersecurity.pdf",
  },
];
