import type { Dictionary } from "./it";

const en: Dictionary = {
  meta: {
    title: "Davide Licci — Junior Software Developer",
    description:
      "Portfolio of Davide Licci, junior software developer: skills, background and contact.",
  },
  nav: {
    skip: "Skip to content",
    about: "About",
    skills: "Skills",
    journey: "Journey",
    projects: "Projects",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLabel: "Passa all'italiano",
    switchShort: "IT",
  },
  hero: {
    greeting: "Hi, I'm",
    tagline:
      "I write code in Python, C#, C, Java and PHP. I studied Computer Science in Jesi, Italy, and at Loccioni I managed the project for a fuel injector test bench.",
    ctaContact: "Get in touch",
    ctaGithub: "GitHub",
    photoAlt: "Photo of Davide Licci",
    chipWork: "Intern @ Loccioni",
    chipSchool: "ITIS Computer Science",
  },
  marquee: {
    pause: "Pause the technologies ticker",
    play: "Resume the technologies ticker",
  },
  about: {
    title: "About",
    paragraphs: [
      "I'm Davide, a software developer at the start of my career. From 2020 to 2025 I attended the Computer Science track at I.I.S. «G. Marconi – E. Pieralisi» in Jesi, Italy.",
      "In 2024 I did my internship at Loccioni: I was the project manager for a gasoline injector test bench and helped develop the C# code for a pick-and-place system. It showed me how software turns into something that runs on real machines.",
      "This site is a starting point: my projects will be here soon too.",
    ],
    facts: {
      role: "role",
      education: "education",
      educationValue: "Computer Science · 2020–2025",
      experience: "experience",
      experienceValue: "Loccioni · 2024",
      github: "github",
    },
    stats: {
      school: "years of Computer Science at ITIS",
      tech: "technologies I work with",
      stage: "the year of my Loccioni internship",
    },
  },
  skills: {
    title: "Skills",
    intro: "The languages and tools I work with.",
    groups: {
      languages: "Languages",
      webAndData: "Web & databases",
      tools: "Tools",
    },
  },
  journey: {
    title: "Journey",
    work: {
      period: "2024",
      org: "Loccioni",
      role: "School-to-work internship",
      schedule:
        "February – May, 2 days a week · first two weeks of June and of September",
      points: [
        "Project manager for a gasoline injector test bench.",
        "Developed C# code for a pick-and-place system.",
      ],
      tags: ["C#", "Project management"],
    },
    school: {
      period: "2020 – 2025",
      org: "I.I.S. «G. Marconi – E. Pieralisi», Jesi",
      role: "Technical high school · Computer Science track",
    },
  },
  projects: {
    title: "Projects",
    repo: "Code",
    demo: "Demo",
  },
  contact: {
    title: "Contact",
    heading: "Let's talk",
    intro:
      "Got a question, an idea or just want to say hi? Fill in the form and your message lands straight in my inbox.",
    githubCta: "See my GitHub",
    form: {
      name: "Name",
      namePlaceholder: "Jane Smith",
      email: "Email",
      emailPlaceholder: "jane@email.com",
      message: "Message",
      messagePlaceholder: "Write your message here…",
      submit: "Send message",
      sending: "Sending…",
      success: "Message sent! I'll get back to you as soon as I can.",
      error: "I couldn't send your message. Please try again in a moment.",
      notConfigured: "The form isn't active yet: the Web3Forms key is missing.",
      subject: "New message from the portfolio",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        message: "Your message needs at least 10 characters.",
      },
    },
  },
  footer: {
    madeWith: "Built with Next.js and Tailwind CSS",
    backToTop: "Back to top",
  },
};

export default en;
