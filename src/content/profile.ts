// Dati che non cambiano con la lingua. I testi tradotti stanno in src/i18n/dictionaries.

export const profile = {
  name: "Davide Licci",
  initials: "DL",
  site: "https://portfolio-jet-theta-89.vercel.app",
  email: "liccidavide0@gmail.com",
  city: "Jesi (AN)",
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
  { name: "PostgreSQL", file: "schema.sql" },
];

export const engines: Skill[] = [
  { name: "Unity", file: "Scene.unity" },
  { name: "Godot", file: "project.godot" },
  { name: "Blender", file: "model.blend" },
];

export const apps: Skill[] = [
  { name: "Flutter", file: "main.dart" },
  { name: "FastAPI", file: "app.py" },
];

export const tools: Skill[] = [{ name: "Git", file: ".gitignore" }];

// I titoli dei gruppi stanno nei dizionari, sotto skills.groups.
export const skillGroups = [
  { id: "languages", items: languages },
  { id: "engines", items: engines },
  { id: "apps", items: apps },
  { id: "webAndData", items: webAndData },
  { id: "tools", items: tools },
] as const;

export const technologies = skillGroups.flatMap((group) => group.items);
