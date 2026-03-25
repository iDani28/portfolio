"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { GraduationCap, Calendar, MapPin, CheckCircle } from "lucide-react";
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

const FORMACION = [
  {
    titulo: "Máster en Ciberseguridad",
    centro: "DigitechFP · Modalidad online",
    lugar: "Málaga, España",
    periodo: "09/2025 — Actual",
    estado: "En curso",
    descripcion:
      "Formación avanzada en seguridad ofensiva y defensiva, pentesting, análisis forense digital, criptografía, y cumplimiento normativo (GDPR, ISO 27001). Prácticas con herramientas reales como Kali Linux, Metasploit y Burp Suite.",
    materias: ["Pentesting web", "Análisis forense", "Criptografía", "OSINT", "Seguridad en redes", "ISO 27001"],
    actual: true,
  },
  {
    titulo: "CFGS — Desarrollo de Aplicaciones Multiplataforma (DAM)",
    centro: "IES Politécnico Hermenegildo Lanz",
    lugar: "Granada, España",
    periodo: "09/2023 — 06/2025",
    estado: "Titulado",
    descripcion:
      "Desarrollo de aplicaciones de escritorio, móviles y web. Programación orientada a objetos, bases de datos relacionales, acceso a datos, y desarrollo de interfaces de usuario.",
    materias: ["Java", "Kotlin (Android)", "SQL / PostgreSQL", "Spring Boot", "Git / GitHub", "APIs REST"],
    actual: false,
  },
  {
    titulo: "CFGM — Sistemas Microinformáticos y Redes (SMR)",
    centro: "IES Politécnico Hermenegildo Lanz",
    lugar: "Granada, España",
    periodo: "09/2021 — 06/2023",
    estado: "Titulado",
    descripcion:
      "Instalación y configuración de sistemas operativos, redes locales, mantenimiento hardware y soporte técnico. Base sólida en infraestructura IT.",
    materias: ["Redes (TCP/IP)", "Linux / Windows Server", "Hardware", "Virtualización", "Soporte técnico"],
    actual: false,
  },
];

function FormacionCard({ item, index }: { item: (typeof FORMACION)[0]; index: number }) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      {...reveal(isMobile, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, index * 0.12)}
      className="relative"
    >
      {index < FORMACION.length - 1 && (
        <div className="absolute left-[19px] top-[52px] bottom-[-40px] w-[2px] bg-gradient-to-b from-[rgba(0,245,255,0.4)] to-[rgba(0,245,255,0.05)]" />
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
                  transition: { duration: 0.4, delay: index * 0.12 + 0.2, type: "spring" },
                })}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              item.actual
                ? "border-[#00f5ff] bg-[rgba(0,245,255,0.1)] shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                : "border-[rgba(0,245,255,0.3)] bg-[rgba(0,245,255,0.03)]"
            }`}
          >
            <GraduationCap size={18} className={item.actual ? "text-[#00f5ff]" : "text-[#8892b0]"} />
          </motion.div>
        </div>

        <div
          className={`flex-1 mb-14 p-8 rounded-xl border transition-all duration-300 ${
            item.actual
              ? "border-[rgba(0,245,255,0.25)] bg-[rgba(0,245,255,0.04)]"
              : "border-[rgba(0,245,255,0.1)] bg-[rgba(0,245,255,0.015)]"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="text-[#ccd6f6] font-semibold text-lg leading-tight">{item.titulo}</h3>
              <p className="text-[#00f5ff] font-mono text-sm mt-1">{item.centro}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wide shrink-0 ${
                item.actual
                  ? "bg-[rgba(0,255,65,0.1)] text-[#00ff41] border border-[rgba(0,255,65,0.3)]"
                  : "bg-[rgba(0,245,255,0.08)] text-[#8892b0] border border-[rgba(0,245,255,0.2)]"
              }`}
            >
              {item.estado}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-xs text-[#8892b0] font-mono">
              <Calendar size={13} className="text-[#00f5ff]" />
              {item.periodo}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#8892b0] font-mono">
              <MapPin size={13} className="text-[#00f5ff]" />
              {item.lugar}
            </span>
          </div>

          <p className="text-[#8892b0] text-sm leading-relaxed mb-6">{item.descripcion}</p>

          <div className="flex flex-wrap gap-2.5">
            {item.materias.map((m) => (
              <span
                key={m}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-[#00f5ff] bg-[rgba(0,245,255,0.07)] border border-[rgba(0,245,255,0.15)]"
              >
                <CheckCircle size={10} />
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Formacion() {
  return (
    <SectionWrapper id="formacion" className="bg-[rgba(0,245,255,0.015)]">
      <div
        className="absolute left-0 top-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <SectionTitle
        number="02"
        title="Formación"
        subtitle="Mi trayectoria académica, desde las redes hasta la ciberseguridad."
      />
      <div className="w-full max-w-3xl mx-auto">
        {FORMACION.map((item, i) => (
          <FormacionCard key={i} item={item} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
