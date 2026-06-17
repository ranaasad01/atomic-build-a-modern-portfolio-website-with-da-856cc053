"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Star, Code2, Layers, Zap, Globe, Terminal, Sparkles, CheckCircle, ExternalLink, Download, User, MessageSquare, Send } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_EMAIL,
  APP_GITHUB,
  APP_LINKEDIN,
  APP_TWITTER,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const skills = [
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "PostgreSQL", level: 80, category: "backend" },
  { name: "GraphQL", level: 78, category: "backend" },
  { name: "Figma", level: 88, category: "design" },
  { name: "Docker", level: 72, category: "tooling" },
] as const;

const projects = [
  {
    slug: "luminary-saas",
    title: "Luminary SaaS",
    tagline: "AI-powered analytics dashboard",
    description:
      "A full-stack SaaS platform with real-time analytics, team collaboration, and AI-driven insights. Built with Next.js 14, Prisma, and OpenAI.",
    tags: ["Next.js", "TypeScript", "Prisma", "OpenAI"],
    image: "https://www.novacommercecorp.com/wp-content/uploads/2018/09/NovaCommerce-Corporation-Front-scaled.jpg",
    liveUrl: "https://luminary.demo",
    githubUrl: "https://github.com/alexmorgan/luminary",
    featured: true,
  },
  {
    slug: "nova-commerce",
    title: "Nova Commerce",
    tagline: "Headless e-commerce storefront",
    description:
      "A blazing-fast headless storefront powered by Shopify and Next.js. Features custom cart, wishlist, and a seamless checkout experience.",
    tags: ["Next.js", "Shopify", "Tailwind", "Framer Motion"],
    image: "https://images.squarespace-cdn.com/content/v1/538105d9e4b030a54b6501ea/1575344710312-OQV8A4A7KQRKEK4T7DAR/000-Atlas+DS.jpg",
    liveUrl: "https://nova.demo",
    githubUrl: "https://github.com/alexmorgan/nova",
    featured: true,
  },
  {
    slug: "atlas-design",
    title: "Atlas Design System",
    tagline: "Component library & design tokens",
    description:
      "A comprehensive design system with 60+ accessible components, dark/light themes, and Storybook documentation. Used by 3 production apps.",
    tags: ["React", "Storybook", "Radix UI", "CSS Variables"],
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    liveUrl: "https://atlas.demo",
    githubUrl: "https://github.com/alexmorgan/atlas",
    featured: true,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    quote:
      "Alex delivered a production-ready SaaS platform in record time. The code quality, attention to detail, and communication were all exceptional. Highly recommend.",
    stars: 5,
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Founder at Nova Commerce",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/JMarcus_Webb.JPG/960px-JMarcus_Webb.JPG",
    quote:
      "Working with Alex transformed our online store. Page load times dropped by 60%, and our conversion rate jumped 22% within the first month. Incredible work.",
    stars: 5,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Product Lead at Stackr",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "Alex built our entire design system from scratch. The components are accessible, beautifully crafted, and our engineering team loves working with them.",
    stars: 5,
  },
];

const stats = [
  { label: "Projects Shipped", value: "40+" },
  { label: "Happy Clients", value: "28" },
  { label: "Years Experience", value: "6" },
  { label: "GitHub Stars", value: "1.2k" },
];

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Apps",
    description:
      "End-to-end web applications built with Next.js, TypeScript, and modern backend stacks. Scalable, secure, and production-ready.",
  },
  {
    icon: Layers,
    title: "UI / Design Systems",
    description:
      "Pixel-perfect interfaces and reusable component libraries that keep your product consistent and your team moving fast.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Audits and rewrites that cut load times, improve Core Web Vitals, and deliver measurable business impact.",
  },
  {
    icon: Terminal,
    title: "API & Backend Engineering",
    description:
      "RESTful and GraphQL APIs, database design, authentication flows, and third-party integrations done right.",
  },
];

const categoryColors: Record<string, string> = {
  frontend: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  backend: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  design: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  tooling: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">
      <Sparkles size={11} />
      {children}
    </span>
  );
}

function SkillBar({
  name,
  level,
  category,
  index,
}: {
  name: string;
  level: number;
  category: string;
  index: number;
}) {
  const colorClass = categoryColors[category] ?? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
  const barVariant: Variants = {
    hidden: { width: "0%" },
    visible: {
      width: `${level}%`,
      transition: { duration: 0.8, ease: "easeOut", delay: index * 0.07 },
    },
  };
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          variants={barVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden hover:border-indigo-500/30 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-indigo-900/40 to-violet-900/30">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              <Github size={14} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live site"
              className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
            {project.tagline}
          </p>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
        </div>
        <p className="text-sm text-white/55 leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-indigo-500/25 transition-colors duration-300"
    >
      <div className="flex gap-1">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-white/65 leading-relaxed italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/5">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <User size={16} className="text-indigo-400 absolute" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-white/40">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Message sent!</h3>
        <p className="text-white/55 text-sm max-w-xs">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
          className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium text-white/50 uppercase tracking-wider">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-white/50 uppercase tracking-wider">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-medium text-white/50 uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project…"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 resize-none"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-indigo-500/25"
      >
        <Send size={15} />
        Send Message
      </motion.button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20"
      >
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-600/8 blur-[80px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-indigo-500/6 blur-[80px] rounded-full" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            {...motionProps(staggerContainer)}
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl font-medium text-white/60 max-w-xl"
            >
              {APP_TAGLINE}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base text-white/45 max-w-2xl leading-relaxed"
            >
              I craft high-performance web applications and polished interfaces
              that help startups and scale-ups ship faster, look better, and
              convert more.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-indigo-400/35"
              >
                Let&apos;s Work Together
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                View Projects
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 pt-2"
            >
              {[
                { href: APP_GITHUB, icon: Github, label: "GitHub" },
                { href: APP_LINKEDIN, icon: Linkedin, label: "LinkedIn" },
                { href: APP_TWITTER, icon: Twitter, label: "Twitter" },
                { href: `mailto:${APP_EMAIL}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-indigo-500/15 text-white/50 hover:text-indigo-400 border border-white/8 hover:border-indigo-500/30 transition-colors duration-200"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex flex-col items-center justify-center gap-1 py-6 px-4 bg-[#0f0f0f] hover:bg-white/[0.02] transition-colors duration-200"
              >
                <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs text-white/40 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image / visual */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-gradient-to-br from-indigo-900/40 to-violet-900/30">
                  <img
                    src="https://media.licdn.com/dms/image/v2/C5603AQE-oMdEA4-lZg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516522176575?e=2147483647&v=beta&t=NNza9NbD-soKscrNPIBTk-qTQ2z583NAZI6yUgYwXZ0"
                    alt="Alex Morgan — Full-Stack Developer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="absolute -bottom-5 -right-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#161616] border border-white/10 shadow-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Code2 size={16} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">6 Years</p>
                    <p className="text-[10px] text-white/40">of experience</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              {...motionProps(slideInRight)}
              className="space-y-6"
            >
              <SectionLabel>About Me</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Building the web,{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  one pixel at a time
                </span>
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  I&apos;m a full-stack developer and designer based in San
                  Francisco with 6 years of experience turning ideas into
                  polished digital products. I specialize in React, Next.js, and
                  TypeScript — but I&apos;m equally comfortable diving into
                  backend systems, databases, and DevOps.
                </p>
                <p>
                  I&apos;ve worked with early-stage startups, growth-stage
                  companies, and enterprise teams. Whether it&apos;s a greenfield
                  SaaS platform or a performance audit on an existing product, I
                  bring the same level of craft and care to every engagement.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me contributing to
                  open source, writing about web performance, or hiking the
                  trails around the Bay Area.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${APP_EMAIL}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
                >
                  <Mail size={15} />
                  Get in Touch
                </a>
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Download size={15} />
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-14"
          >
            <SectionLabel>What I Do</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Services I offer
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              From concept to deployment — I cover the full spectrum of modern
              web development.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group flex gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-indigo-500/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <service.icon size={22} className="text-indigo-400" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white">{service.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-14"
          >
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Skills &amp; Expertise
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              A curated set of tools and technologies I use to build exceptional
              products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                category={skill.category}
                index={i}
              />
            ))}
          </div>

          {/* Tech badges */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 flex flex-wrap justify-center gap-3"
          >
            {[
              "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
              "GraphQL", "Tailwind CSS", "Figma", "Docker", "Vercel",
              "Prisma", "Redis",
            ].map((tech) => (
              <motion.span
                key={tech}
                variants={scaleIn}
                whileHover={{ scale: 1.08 }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/8 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-14"
          >
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              A selection of recent work — from SaaS platforms to design systems
              and everything in between.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>

          <motion.div
            {...motionProps(fadeInUp)}
            className="mt-12 text-center"
          >
            <a
              href={APP_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Github size={16} />
              View All on GitHub
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-14"
          >
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              What clients say
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              Don&apos;t take my word for it — here&apos;s what the people I&apos;ve
              worked with have to say.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="space-y-6"
            >
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  great together
                </span>
              </h2>
              <p className="text-white/55 leading-relaxed max-w-md">
                Have a project in mind? I&apos;d love to hear about it. Send me a
                message and I&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { icon: Mail, label: "Email", value: APP_EMAIL, href: `mailto:${APP_EMAIL}` },
                  { icon: Github, label: "GitHub", value: "github.com/alexmorgan", href: APP_GITHUB },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexmorgan", href: APP_LINKEDIN },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors duration-200">
                      <Icon size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/35 font-medium uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              {...motionProps(slideInRight)}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                  <MessageSquare size={18} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Send a message</h3>
                  <p className="text-xs text-white/40">I reply within 24 hours</p>
                </div>
              </div>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...motionProps(scaleIn)}
            className="relative rounded-3xl overflow-hidden p-12 text-center"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-violet-600/15 to-pink-600/10" />
            <div className="absolute inset-0 border border-indigo-500/20 rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-500/15 blur-3xl" />

            <div className="relative space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
                <Sparkles size={11} />
                Open to opportunities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to start your next project?
              </h2>
              <p className="text-white/55 max-w-lg mx-auto">
                Whether you need a full product built from scratch or want to
                level up an existing one — I&apos;m here to help.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                  Start a Conversation
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={APP_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/8 hover:bg-white/12 text-white/80 hover:text-white font-semibold text-sm border border-white/12 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Github size={16} />
                  Explore My Work
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}