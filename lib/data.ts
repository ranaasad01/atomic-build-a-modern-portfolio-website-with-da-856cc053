export const APP_NAME = "Alex Morgan";
export const APP_TAGLINE = "Full-Stack Developer & Designer";
export const APP_EMAIL = "hello@alexmorgan.dev";
export const APP_GITHUB = "https://github.com/alexmorgan";
export const APP_LINKEDIN = "https://linkedin.com/in/alexmorgan";
export const APP_TWITTER = "https://twitter.com/alexmorgan";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const CTA_LABEL = "Hire Me";
export const CTA_HREF = "#contact";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "tooling" | "design";
}