"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, APP_NAME, CTA_LABEL, CTA_HREF } from "@/lib/data";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  function resolveHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors duration-200"
        >
          <span className="text-indigo-400">&lt;</span>
          {APP_NAME}
          <span className="text-indigo-400">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={resolveHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={resolveHref(CTA_HREF)}
            onClick={(e) => handleAnchorClick(e, CTA_HREF)}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-400/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            {CTA_LABEL}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-200"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={resolveHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <Link
                  href={resolveHref(CTA_HREF)}
                  onClick={(e) => handleAnchorClick(e, CTA_HREF)}
                  className="block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-200"
                >
                  {CTA_LABEL}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}