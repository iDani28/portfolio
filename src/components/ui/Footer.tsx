"use client";

import { motion } from "framer-motion";
import { Github, Terminal } from "lucide-react";

/* Footer minimalista con firma y links */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-t border-[rgba(0,245,255,0.08)] pt-12 pb-20 md:pt-16 md:pb-28"
    >
      {/* Gradiente superior */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / firma */}
        <div className="flex items-center gap-2 font-mono text-[#8892b0] text-sm">
          <Terminal size={16} className="text-[#00f5ff]" />
          <span>
            iDani28
          </span>
          <span className="text-[#8892b0]">© {year}</span>
        </div>

        {/* Crédito */}
        <div className="flex items-center gap-1.5 text-xs text-[#8892b0] font-mono">
          <span className="text-[#00f5ff]">$</span>
          <span>rm -rf bugs &amp;&amp; git commit -m &quot;siempre mejorando&quot;</span>
        </div>

        {/* Links rápidos */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/iDani28"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#8892b0] hover:text-[#00f5ff] transition-colors"
          >
            <Github size={17} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
