"use client";

import { useState } from "react";
import { motion, AnimatePresence, type TargetAndTransition } from "framer-motion";
import { Github, ExternalLink, Folder, ChevronDown, ChevronUp } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import { useIsMobile } from "@/hooks/useIsMobile";

const VP = { once: true, amount: 0 } as const;

type Proyecto = {
  nombre: string;
  descripcion: string;
  detalles: string;
  tecnologias: string[];
  web: string | null;
  github: string | null;
  githubMovil?: string;
  tipo: string;
  estado: string;
  fecha: string;
  destacado: boolean;
};

function reveal(isMobile: boolean, from: TargetAndTransition, to: TargetAndTransition, delay = 0) {
  return {
    initial: from,
    animate: isMobile ? to : undefined,
    whileInView: isMobile ? undefined : to,
    viewport: isMobile ? undefined : VP,
    transition: { duration: isMobile ? 0 : 0.55, delay: isMobile ? 0 : delay },
  };
}

const PROYECTOS = [
  {
    nombre: "ruralalgazara.es",
    descripcion:
      "Diseño e implementación de una web de alquiler turístico para cliente real. Desarrollada con Next.js y React en el frontend, Node.js en el backend, con configuración de infraestructura (DNS y hosting) y enfoque en usabilidad y gestión de reservas.",
    detalles:
      "Aplicación full-stack con Next.js y React en el frontend y Node.js en el backend. Gestión de datos con Appwrite. Desplegado en producción con configuración de DNS y hosting en OVH. Diseño responsive mobile-first.",
    tecnologias: ["Next.js", "React", "Node.js", "Appwrite", "Tailwind CSS", "OVH"],
    web: "https://ruralalgazara.es",
    github: null,
    tipo: "Web",
    estado: "Producción",
    fecha: "06/2025 – 09/2025",
    destacado: true,
  },
  {
    nombre: "LibroNet",
    descripcion:
      "Sistema de gestión bibliotecaria multiplataforma desarrollado como proyecto final del CFGS DAM. Disponible en versión escritorio (JavaFX) y versión móvil (Android con Kotlin). Permite administrar libros, autores, editoriales y gestionar reservas.",
    detalles:
      "Aplicación multiplataforma con arquitectura MVC en escritorio (JavaFX) y MVVM en móvil (Android con Kotlin). Base de datos gestionada con AWS. Incluye exportación de informes en PDF y sistema de notificaciones de devolución.",
    tecnologias: ["Java", "JavaFX", "Kotlin", "Android", "AWS", "MVVM"],
    web: null,
    github: "https://github.com/iDani28/LibroNet",
    githubMovil: "https://github.com/iDani28/LibroNet_Movil",
    tipo: "Desktop + Mobile",
    estado: "Completado",
    fecha: "01/2025 – 06/2025",
    destacado: true,
  },
];

function ProyectoCard({ proyecto, index }: { proyecto: Proyecto; index: number }) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      {...reveal(isMobile, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, index * 0.15)}
      className="group relative p-8 rounded-xl border border-[rgba(0,245,255,0.15)] bg-[rgba(0,245,255,0.02)]
                 hover:border-[rgba(0,245,255,0.35)] hover:bg-[rgba(0,245,255,0.04)]
                 transition-all duration-300"
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,245,255,0.06) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="flex items-start gap-3 min-w-0">
          <Folder size={20} className="text-[#00f5ff] shrink-0 mt-1" />
          <div className="min-w-0">
            <h3 className="text-[#ccd6f6] font-semibold text-lg">{proyecto.nombre}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded text-xs font-mono text-[#8892b0] bg-[rgba(0,245,255,0.06)] border border-[rgba(0,245,255,0.1)]">
                {proyecto.tipo}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-mono ${
                  proyecto.estado === "Producción"
                    ? "text-[#00ff41] bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.25)]"
                    : "text-[#8892b0] bg-[rgba(0,245,255,0.05)] border border-[rgba(0,245,255,0.15)]"
                }`}
              >
                {proyecto.estado}
              </span>
              {"fecha" in proyecto && proyecto.fecha && (
                <span className="px-2 py-0.5 rounded text-xs font-mono text-[#8892b0] bg-[rgba(0,245,255,0.06)] border border-[rgba(0,245,255,0.1)]">
                  {proyecto.fecha}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {proyecto.github && !("githubMovil" in proyecto) && (
            <a
              href={proyecto.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver en GitHub"
              className="text-[#8892b0] hover:text-[#00f5ff] transition-colors duration-200"
            >
              <Github size={18} />
            </a>
          )}
          {"githubMovil" in proyecto && proyecto.github && (
            <a
              href={proyecto.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver escritorio en GitHub"
              className="flex items-center gap-1 text-xs font-mono text-[#8892b0] hover:text-[#00f5ff] transition-colors duration-200"
            >
              <Github size={15} />
              <span>Desktop</span>
            </a>
          )}
          {"githubMovil" in proyecto && proyecto.githubMovil && (
            <a
              href={proyecto.githubMovil!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver móvil en GitHub"
              className="flex items-center gap-1 text-xs font-mono text-[#8892b0] hover:text-[#00f5ff] transition-colors duration-200"
            >
              <Github size={15} />
              <span>Mobile</span>
            </a>
          )}
          {proyecto.web && (
            <a
              href={proyecto.web}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver proyecto en vivo"
              className="text-[#8892b0] hover:text-[#00f5ff] transition-colors duration-200"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="text-[#8892b0] text-sm leading-relaxed mb-6">{proyecto.descripcion}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[#8892b0] text-sm leading-relaxed mb-5 pt-4 border-t border-[rgba(0,245,255,0.08)]">
              {proyecto.detalles}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs font-mono text-[#00f5ff] hover:text-[#00ff41] transition-colors mb-6"
      >
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        {expanded ? "Menos detalles" : "Más detalles"}
      </button>

      <div className="flex flex-wrap gap-2">
        {proyecto.tecnologias.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-full text-xs font-mono text-[#00f5ff] bg-[rgba(0,245,255,0.06)] border border-[rgba(0,245,255,0.15)] hover:border-[rgba(0,245,255,0.35)] transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Proyectos() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="proyectos" className="bg-[rgba(123,47,255,0.015)]">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.2), rgba(123,47,255,0.2), transparent)",
        }}
        aria-hidden="true"
      />
      <SectionTitle
        number="04"
        title="Proyectos"
        subtitle="Cosas que he construido, desde aplicaciones móviles hasta webs en producción."
      />
      <div className="grid md:grid-cols-2 gap-8">
        {PROYECTOS.map((p, i) => (
          <ProyectoCard key={i} proyecto={p} index={i} />
        ))}
      </div>
      <motion.div
        {...reveal(isMobile, { opacity: 0 }, { opacity: 1 }, 0.4)}
        className="mt-16 text-center"
      >
        <a
          href="https://github.com/iDani28"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#8892b0] hover:text-[#00f5ff] font-mono text-sm transition-colors duration-200 group"
        >
          <Github size={16} />
          Ver más proyectos en GitHub
          <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
