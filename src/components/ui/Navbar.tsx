"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

/* Elementos del menú de navegación */
const NAV_ITEMS = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Formación", href: "#formacion" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Skills", href: "#skills" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* Detectar scroll para cambiar el fondo de la navbar */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Detectar la sección activa con IntersectionObserver */
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Cerrar menú al hacer clic en un enlace */
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(5,5,5,0.9)] backdrop-blur-md border-b border-[rgba(0,245,255,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Logo / Nombre */}
          <a
            href="#hero"
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 font-mono text-[#00f5ff] hover:text-[#00ff41] transition-colors duration-300"
          >
            <Terminal size={18} />
            <span className="text-sm font-bold tracking-wider">iDani28</span>
          </a>

          {/* Links de escritorio */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item, i) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={i}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-4 py-2 text-sm font-mono transition-colors duration-200 ${
                      isActive ? "text-[#00f5ff]" : "text-[#8892b0] hover:text-[#ccd6f6]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-0 bg-[rgba(0,245,255,0.08)] rounded border border-[rgba(0,245,255,0.2)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="md:hidden text-[#8892b0] hover:text-[#00f5ff] transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Menú móvil con AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[rgba(5,5,5,0.97)] border-b border-[rgba(0,245,255,0.1)] backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col py-4 px-6 sm:px-8">
              {NAV_ITEMS.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-3 font-mono text-[#8892b0] hover:text-[#00f5ff] hover:bg-[rgba(0,245,255,0.05)] rounded transition-colors duration-200 text-sm"
                  >
                    <span className="text-[#00f5ff] mr-2">0{i + 1}.</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
