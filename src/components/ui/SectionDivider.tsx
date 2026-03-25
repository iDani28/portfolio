"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Separador visual estilo cyberpunk entre secciones */
export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center py-4 px-8 overflow-hidden"
      aria-hidden="true"
    >
      {/* Línea izquierda — cian */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        style={{ originX: 1 }}
        className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(0,245,255,0.5)]"
      />

      {/* Etiqueta hex izquierda */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="mx-3 font-mono text-[10px] text-[rgba(0,245,255,0.3)] tracking-widest select-none hidden sm:block"
      >
        0xFF
      </motion.span>

      {/* Nodo central — diamante giratorio */}
      <div className="relative mx-2 flex items-center justify-center w-5 h-5">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={isInView ? { scale: 1, rotate: 45 } : {}}
          transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 220 }}
          className="w-4 h-4 border-2 border-[#00f5ff] bg-[rgba(0,245,255,0.08)]"
          style={{ boxShadow: "0 0 14px rgba(0,245,255,0.45), inset 0 0 6px rgba(0,245,255,0.1)" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.72 }}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#00f5ff]"
          style={{ boxShadow: "0 0 8px #00f5ff" }}
        />
      </div>

      {/* Etiqueta hex derecha */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="mx-3 font-mono text-[10px] text-[rgba(0,255,65,0.3)] tracking-widest select-none hidden sm:block"
      >
        0x00
      </motion.span>

      {/* Línea derecha — verde */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        style={{ originX: 0 }}
        className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(0,255,65,0.5)]"
      />
    </div>
  );
}
