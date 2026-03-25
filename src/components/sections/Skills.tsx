"use client";

import { motion, type TargetAndTransition } from "framer-motion";
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
    transition: { duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : delay },
  };
}

const SKILLS = [
  {
    categoria: "Lenguajes",
    icono: "{ }",
    color: "#00f5ff",
    items: [
      { nombre: "JavaScript / TypeScript", nivel: 75 },
      { nombre: "Java", nivel: 90 },
      { nombre: "Kotlin", nivel: 80 },
      { nombre: "Python", nivel: 70 },
      { nombre: "SQL", nivel: 75 },
      { nombre: "Bash / Shell", nivel: 60 },
    ],
  },
  {
    categoria: "Frontend & Frameworks",
    icono: "</>",
    color: "#00ff41",
    items: [
      { nombre: "React / Next.js", nivel: 70 },
      { nombre: "Tailwind CSS", nivel: 65 },
      { nombre: "Framer Motion", nivel: 40 },
      { nombre: "HTML5 / CSS3", nivel: 90 },
      { nombre: "Node.js / Express", nivel: 75 },
    ],
  },
  {
    categoria: "Ciberseguridad",
    icono: "//",
    color: "#7b2fff",
    items: [
      { nombre: "Pentesting Web", nivel: 70 },
      { nombre: "Kali Linux", nivel: 75 },
      { nombre: "Burp Suite", nivel: 65 },
      { nombre: "Metasploit", nivel: 60 },
      { nombre: "OSINT", nivel: 70 },
      { nombre: "Redes / TCP-IP", nivel: 80 },
    ],
  },
  {
    categoria: "Herramientas & DevOps",
    icono: ">>",
    color: "#0099ff",
    items: [
      { nombre: "Git / GitHub", nivel: 80 },
      { nombre: "Linux (Debian / Kali)", nivel: 80 },
      { nombre: "Docker", nivel: 80 },
      { nombre: "PostgreSQL / SQLite", nivel: 75 },
      { nombre: "Vercel / Railway", nivel: 70 },
      { nombre: "VS Code", nivel: 90 },
    ],
  },
];

function SkillBar({
  nombre,
  nivel,
  color,
  delay,
  isMobile,
}: {
  nombre: string;
  nivel: number;
  color: string;
  delay: number;
  isMobile: boolean;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#8892b0] font-mono">{nombre}</span>
        <span className="text-xs text-[#8892b0] font-mono">{nivel}%</span>
      </div>
      <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isMobile ? { width: `${nivel}%` } : undefined}
          whileInView={isMobile ? undefined : { width: `${nivel}%` }}
          viewport={isMobile ? undefined : VP}
          transition={{ duration: isMobile ? 0 : 0.9, delay: isMobile ? 0 : delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
        />
      </div>
    </div>
  );
}

function SkillCard({ cat, index }: { cat: (typeof SKILLS)[0]; index: number }) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      {...reveal(isMobile, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, index * 0.1)}
      className="p-8 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)]
                 hover:border-[rgba(0,245,255,0.2)] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-lg font-bold" style={{ color: cat.color }}>
          {cat.icono}
        </span>
        <h3 className="text-[#ccd6f6] font-semibold">{cat.categoria}</h3>
      </div>
      {cat.items.map((skill, i) => (
        <SkillBar
          key={skill.nombre}
          nombre={skill.nombre}
          nivel={skill.nivel}
          color={cat.color}
          delay={index * 0.1 + i * 0.07}
          isMobile={isMobile}
        />
      ))}
    </motion.div>
  );
}

const SOFT_SKILLS = [
  "Trabajo en equipo",
  "Adaptabilidad",
  "Resolución de problemas",
  "Inglés (básico)",
  "Italiano (básico)",
  "Comunicación técnica",
  "Aprendizaje continuo",
  "Atención al detalle",
  "Proactividad",
  "Pensamiento analítico",
];

export default function Skills() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="skills">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <SectionTitle
        number="05"
        title="Skills"
        subtitle="Tecnologías que domino, herramientas que uso a diario y capacidades que sigo desarrollando."
      />
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {SKILLS.map((cat, i) => (
          <SkillCard key={cat.categoria} cat={cat} index={i} />
        ))}
      </div>
      <div>
        <motion.h3
          {...reveal(isMobile, { opacity: 0 }, { opacity: 1 })}
          className="text-[#ccd6f6] font-mono text-sm tracking-wider uppercase mb-8"
        >
          // habilidades blandas & otros
        </motion.h3>
        <div className="flex flex-wrap gap-4">
          {SOFT_SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              {...reveal(isMobile, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, i * 0.05)}
              whileHover={{ scale: 1.05, borderColor: "#00f5ff" }}
              className="px-4 py-2 rounded-lg text-sm font-mono text-[#8892b0]
                         border border-[rgba(0,245,255,0.15)] bg-[rgba(0,245,255,0.03)]
                         hover:text-[#00f5ff] transition-colors duration-200 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
