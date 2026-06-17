"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, Heart } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_EMAIL,
  APP_GITHUB,
  APP_LINKEDIN,
  APP_TWITTER,
  navLinks,
} from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { label: "GitHub", href: APP_GITHUB, icon: Github },
  { label: "LinkedIn", href: APP_LINKEDIN, icon: Linkedin },
  { label: "Twitter", href: APP_TWITTER, icon: Twitter },
  { label: "Email", href: `mailto:${APP_EMAIL}`, icon: Mail },
];

export default function Footer() {
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/5 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <Link
              href="/"
              className="inline-block text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors duration-200"
            >
              <span className="text-indigo-400">&lt;</span>
              {APP_NAME}
              <span className="text-indigo-400">/&gt;</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {APP_TAGLINE}. Building beautiful, performant web experiences.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={resolveHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social + contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-white/50 hover:text-indigo-400 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${APP_EMAIL}`}
              className="text-sm text-white/50 hover:text-indigo-400 transition-colors duration-200"
            >
              {APP_EMAIL}
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            Built with <Heart size={11} className="text-indigo-400 fill-indigo-400" /> using Next.js & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}