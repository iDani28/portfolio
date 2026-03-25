"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import { useIsMobile } from "@/hooks/useIsMobile";

const VP = { once: true, amount: 0 } as const;

function reveal(isMobile: boolean, from: TargetAndTransition, to: TargetAndTransition, delay = 0) {
  return {
    initial: from,
    animate: isMobile ? to : undefined,
    whileInView: isMobile ? undefined : to,
    viewport: isMobile ? undefined : VP,
    transition: { duration: isMobile ? 0 : 0.55, delay: isMobile ? 0 : delay },
  };
}

const EXPERIENCIAS = [
  {
    puesto: "Técnico en Informática / Desarrollo Web",
    empresa: "Onice Suministros",
    lugar: "Granada, España",
    periodo: "03/2025 – 05/2025",
    tipo: "Prácticas",
    descripcion:
      "Durante el periodo de prácticas participé en tareas de desarrollo y automatización de páginas web, colaborando en su implementación y configuración. Asimismo, realicé mantenimiento de equipos informáticos, incluyendo revisión, configuración y resolución de incidencias.",
    tareas: [
      "Desarrollo y automatización de páginas web",
      "Implementación y configuración de sitios web",
      "Mantenimiento y revisión de equipos informáticos",
      "Resolución de incidencias técnicas",
    ],
    tecnologias: ["HTML", "CSS", "JavaScript", "FileZilla"],
    web: "https://www.e-onice.es/",
  },
  {
    puesto: "Técnico de Sistemas y Soporte IT",
    empresa: "Radio Bruno",
    lugar: "Brescia, Italia",
    periodo: "03/2023 – 06/2023",
    tipo: "Erasmus+ / Prácticas",
    descripcion:
      "Estancia internacional en el marco del programa Erasmus+ en Radio Bruno (Brescia, Italia). Colaboré en el mantenimiento y puesta a punto de equipos informáticos, apoyo en grabaciones para emisión y adaptación a las herramientas y metodologías de trabajo de la organización.",
    tareas: [
      "Mantenimiento y puesta a punto de equipos informáticos",
      "Apoyo técnico en grabaciones para emisión radiofónica",
      "Adaptación a entorno de trabajo internacional",
      "Experiencia en entorno profesional italiano",
    ],
    tecnologias: ["Hardware", "Soporte técnico", "Windows"],
    web: "https://www.radiobrunobrescia.it/",
  },
];

function ExperienciaCard({ item, index }: { item: (typeof EXPERIENCIAS)[0]; index: number }) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      {...reveal(isMobile, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, index * 0.15)}
      className="relative"
    >
      {index < EXPERIENCIAS.length - 1 && (
        <div className="absolute left-[19px] top-[52px] bottom-[-40px] w-[2px] bg-gradient-to-b from-[rgba(0,255,65,0.4)] to-[rgba(0,255,65,0.05)]" />
      )}

      <div className="flex gap-6">
        <div className="shrink-0 mt-1">
          <motion.div
            {...(isMobile
              ? { initial: { scale: 1 } }
              : {
                  initial: { scale: 0 },
                  whileInView: { scale: 1 },
                  viewport: VP,
                  transition: { duration: 0.4, delay: index * 0.15 + 0.2, type: "spring" },
                })}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              index === 0
                ? "border-[#00ff41] bg-[rgba(0,255,65,0.1)] shadow-[0_0_20px_rgba(0,255,65,0.25)]"
                : "border-[rgba(0,255,65,0.3)] bg-[rgba(0,255,65,0.03)]"
            }`}
          >
            <Briefcase size={18} className={index === 0 ? "text-[#00ff41]" : "text-[#8892b0]"} />
          </motion.div>
        </div>

        <div className="flex-1 mb-14 p-8 rounded-xl border border-[rgba(0,255,65,0.12)] bg-[rgba(0,255,65,0.02)] hover:border-[rgba(0,255,65,0.25)] transition-all duration-300 group">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="text-[#ccd6f6] font-semibold text-lg leading-tight">{item.puesto}</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[#00ff41] font-mono text-sm">{item.empresa}</p>
                {item.web && (
                  <a
                    href={item.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${item.empresa}`}
                    className="text-[#8892b0] hover:text-[#00f5ff] transition-colors"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wide bg-[rgba(0,255,65,0.08)] text-[#00ff41] border border-[rgba(0,255,65,0.25)] shrink-0">
              {item.tipo}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-xs text-[#8892b0] font-mono">
              <Calendar size={13} className="text-[#00ff41]" />
              {item.periodo}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#8892b0] font-mono">
              <MapPin size={13} className="text-[#00ff41]" />
              {item.lugar}
            </span>
          </div>

          <p className="text-[#8892b0] text-sm leading-relaxed mb-6">{item.descripcion}</p>

          <ul className="space-y-2.5 mb-6">
            {item.tareas.map((tarea, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#8892b0]">
                <span className="text-[#00ff41] font-mono mt-0.5 shrink-0">▸</span>
                {tarea}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-[rgba(0,255,65,0.08)]">
            {item.tecnologias.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded text-xs font-mono text-[#00f5ff] bg-[rgba(0,245,255,0.07)] border border-[rgba(0,245,255,0.15)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experiencia() {
  return (
    <SectionWrapper id="experiencia">
      <div
        className="absolute right-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <SectionTitle
        number="03"
        title="Experiencia"
        subtitle="Trabajo real en entornos profesionales, incluyendo experiencia internacional."
      />
      <div className="w-full max-w-3xl mx-auto">
        {EXPERIENCIAS.map((item, i) => (
          <ExperienciaCard key={i} item={item} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
