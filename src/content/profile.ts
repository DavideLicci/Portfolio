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
  photo: null as string | null,
};

export const languages = [
  { name: "Python", file: "main.py" },
  { name: "C#", file: "Program.cs" },
  { name: "C", file: "main.c" },
  { name: "Java", file: "Main.java" },
  { name: "PHP", file: "index.php" },
];
