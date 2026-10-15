// Dati che non cambiano con la lingua. I testi tradotti stanno in src/i18n/dictionaries.

export const profile = {
  name: "Davide Licci",
  initials: "DL",
  role: "Junior Software Developer",
  github: {
    username: "DavideLicci",
    url: "https://github.com/DavideLicci",
  },
  // Metti la foto in public/ (es. public/profile.jpg) e scrivi qui il percorso: "/profile.jpg".
  // Finché resta null viene mostrato un avatar con le iniziali.
  photo: "/profile.webp" as string | null,
};

export type Skill = { name: string; file: string };

export const languages: Skill[] = [
  { name: "Python", file: "main.py" },
  { name: "C#", file: "Program.cs" },
  { name: "C", file: "main.c" },
  { name: "Java", file: "Main.java" },
  { name: "PHP", file: "index.php" },
];

export const webAndData: Skill[] = [
  { name: "HTML", file: "index.html" },
  { name: "CSS", file: "style.css" },
  { name: "SQL", file: "query.sql" },
];

export const tools: Skill[] = [{ name: "Git", file: ".gitignore" }];

// I titoli dei gruppi stanno nei dizionari, sotto skills.groups.
export const skillGroups = [
  { id: "languages", items: languages },
  { id: "webAndData", items: webAndData },
  { id: "tools", items: tools },
] as const;

export const technologies = skillGroups.flatMap((group) => group.items);
