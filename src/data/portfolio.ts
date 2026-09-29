import type { ImageMetadata } from "astro";

export interface Localized {
  it: string;
  en: string;
}

export interface Project {
  title: Localized;
  description: Localized;
  tech: string[];
  image?: ImageMetadata;
  liveUrl?: string;
  repoUrl?: string;
  pdfUrl?: string;
}

export interface SkillCategory {
  title: Localized;
  items: string[];
}

export interface ExperienceItem {
  role: Localized;
  company: string;
  period: Localized;
  description: Localized;
}

export const profile = {
  name: "Pasquale Cerullo",
  role: {
    it: "Docente di informatica · Web developer",
    en: "Computer science teacher · Web developer",
  } as Localized,
  bio: {
    it: "Progetto esperienze web chiare e accessibili e trasformo concetti tecnici in percorsi di apprendimento concreti.",
    en: "I design clear, accessible web experiences and turn technical concepts into practical learning paths.",
  } as Localized,
  email: "pasquale@example.com",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/pasqualecerullo",
      icon: "github" as const,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      icon: "linkedin" as const,
    },
  ],
};

import cover1 from "../assets/blog-placeholder-1.jpg";
import cover2 from "../assets/blog-placeholder-2.jpg";
import cover3 from "../assets/blog-placeholder-3.jpg";
import cover4 from "../assets/blog-placeholder-4.jpg";

export const projects: Project[] = [
  {
    title: {
      it: "2048",
      en: "2048",
    },
    description: {
      it: "Gioca a 2048 direttamente nel browser: unisci le tessere, supera il tuo record e raggiungi 2048.",
      en: "Play 2048 in your browser: merge tiles, beat your best score, and reach 2048.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "/2048/",
  },
  {
    title: {
      it: "Piattaforma E-Commerce",
      en: "E-Commerce Platform",
    },
    description: {
      it: "Applicazione full-stack per la vendita online con carrello, pagamenti e pannello amministrativo.",
      en: "Full-stack application for online sales with cart, payments and admin dashboard.",
    },
    tech: ["Astro", "TypeScript", "Stripe", "Tailwind CSS"],
    image: cover1,
  },
  {
    title: {
      it: "Dashboard Analytics",
      en: "Analytics Dashboard",
    },
    description: {
      it: "Pannello di analisi dati in tempo reale con grafici interattivi e export PDF.",
      en: "Real-time data analysis dashboard with interactive charts and PDF export.",
    },
    tech: ["React", "TypeScript", "D3.js", "Node.js"],
    image: cover2,
  },
  {
    title: {
      it: "App Gestione Task",
      en: "Task Manager App",
    },
    description: {
      it: "Applicazione per la gestione di progetti e task con collaborazione in tempo reale.",
      en: "Project and task management app with real-time collaboration.",
    },
    tech: ["Svelte", "Supabase", "Tailwind CSS"],
    image: cover3,
  },
  {
    title: {
      it: "Blog Personale",
      en: "Personal Blog",
    },
    description: {
      it: "Il sito che stai guardando — costruito con Astro, Tailwind e supporto bilingue.",
      en: "The site you're looking at — built with Astro, Tailwind and bilingual support.",
    },
    tech: ["Astro", "Tailwind CSS", "Markdown"],
    image: cover4,
  },
];

export const skills: SkillCategory[] = [
  {
    title: { it: "Frontend", en: "Frontend" },
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Astro",
      "Svelte",
      "Tailwind CSS",
    ],
  },
  {
    title: { it: "Backend", en: "Backend" },
    items: ["Node.js", "Express", "PostgreSQL", "Supabase", "REST API"],
  },
  {
    title: { it: "Strumenti", en: "Tools" },
    items: ["Git", "GitHub", "VS Code", "Linux", "Docker", "Figma"],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: { it: "Docente", en: "Teacher" },
    company: "ISIS Valdarno",
    period: { it: "Sett 2023 – Oggi", en: "Sept 2023 – Present" },
    description: {
      it: "Didattica laboratoriale, progettazione di materiali e percorsi dedicati allo sviluppo software e alle tecnologie web.",
      en: "Hands-on teaching and learning-path design focused on software development and web technologies.",
    },
  },
];
