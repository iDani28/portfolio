"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { User, MapPin, Calendar, Mail, Code2, ShieldCheck, Layers } from "lucide-react";
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

function InfoItem({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
}) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      {...reveal(isMobile, { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, delay)}
      className="flex items-center gap-3 py-4 border-b border-[rgba(0,245,255,0.08)] last:border-0"
    >
      <Icon size={16} className="text-[#00f5ff] shrink-0" />
      <span className="text-[#8892b0] text-sm font-mono w-24 shrink-0">{label}</span>
      <span className="text-[#ccd6f6] text-sm">{value}</span>
    </motion.div>
  );
}

function CompetenceCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      {...reveal(isMobile, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, delay)}
      whileHover={{ y: -4, boxShadow: "0 0 30px rgba(0,245,255,0.12)" }}
      className="p-7 rounded-xl border border-[rgba(0,245,255,0.15)] bg-[rgba(0,245,255,0.03)] transition-all duration-300 cursor-default"
    >
      <Icon size={24} className="text-[#00f5ff] mb-4" />
      <h3 className="text-[#ccd6f6] font-semibold mb-2">{title}</h3>
      <p className="text-[#8892b0] text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function SobreMi() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="sobre-mi">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <SectionTitle
        number="01"
        title="Sobre mí"
        subtitle="Desarrollador, estudiante de ciberseguridad y eterno aprendiz."
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-7">
          <motion.p
            {...reveal(isMobile, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.1)}
            className="text-[#8892b0] leading-relaxed text-base"
          >
            Soy <span className="text-[#ccd6f6] font-medium">Daniel Moreno Ruiz</span>, un apasionado
            del sector tecnológico con formación en Sistemas Microinformáticos y Redes, Desarrollo de
            Aplicaciones Multiplataforma y actualmente cursando un{" "}
            <span className="text-[#00f5ff]">Máster de Especialización en Ciberseguridad</span> en
            DigitechFP (Málaga).
          </motion.p>

          <motion.p
            {...reveal(isMobile, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.2)}
            className="text-[#8892b0] leading-relaxed text-base"
          >
            Me apasiona construir aplicaciones web modernas y robustas, especialmente con{" "}
            <span className="text-[#00ff41]">Next.js y React</span>. Cada vez me atrae más el mundo de
            la ciberseguridad y el desarrollo con inteligencia artificial: entender cómo funcionan los
            sistemas para poder protegerlos y llevarlos al siguiente nivel.
          </motion.p>

          <motion.p
            {...reveal(isMobile, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.3)}
            className="text-[#8892b0] leading-relaxed text-base"
          >
            Siempre con un proyecto entre manos y algo nuevo que aprender.
          </motion.p>

          <motion.div
            {...reveal(isMobile, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.4)}
            className="mt-8 p-6 rounded-lg bg-[rgba(0,0,0,0.4)] border border-[rgba(0,245,255,0.15)] font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[#8892b0] text-xs">daniel@portfolio:~$</span>
            </div>
            <p className="text-[#00f5ff]">
              <span className="text-[#00ff41]">$</span> whoami
            </p>
            <p className="text-[#ccd6f6] mt-1">
              Daniel Moreno Ruiz — Dev &amp; CyberSec Student
            </p>
            <p className="text-[#00f5ff] mt-2">
              <span className="text-[#00ff41]">$</span> cat objetivo.txt
            </p>
            <p className="text-[#8892b0] mt-1">
              Conseguir empleo en el sector tech con enfoque en{" "}
              <span className="text-[#00f5ff]">desarrollo web</span>,{" "}
              <span className="text-[#ccd6f6]">desarrollo multiplataforma</span> y{" "}
              <span className="text-[#00ff41]">ciberseguridad</span>.
            </p>
            <span className="inline-block w-[8px] h-[14px] bg-[#00f5ff] ml-1 animate-pulse" />
          </motion.div>
        </div>

        <div className="space-y-10">
          <motion.div
            {...reveal(isMobile, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, 0.2)}
            className="p-8 rounded-xl border border-[rgba(0,245,255,0.15)] bg-[rgba(0,245,255,0.02)]"
          >
            <h3 className="text-[#ccd6f6] font-mono text-sm mb-4 tracking-wider uppercase">
              // datos personales
            </h3>
            <InfoItem icon={User} label="Nombre" value="Daniel Moreno Ruiz" delay={0.3} />
            <InfoItem icon={Calendar} label="Edad" value="21 años (28/04/2004)" delay={0.35} />
            <InfoItem icon={MapPin} label="Ubicación" value="Málaga, España" delay={0.4} />
            <InfoItem icon={Mail} label="Email" value="dmrdaniel2804@gmail.com" delay={0.45} />
          </motion.div>

          <div className="grid grid-cols-3 gap-5">
            <CompetenceCard
              icon={Code2}
              title="Desarrollo Web"
              desc="Next.js, React, Node.js. Aplicaciones modernas, limpias y escalables."
              delay={0.5}
            />
            <CompetenceCard
              icon={ShieldCheck}
              title="Ciberseguridad"
              desc="Hacking ético, pentesting, análisis de vulnerabilidades y seguridad ofensiva."
              delay={0.6}
            />
            <CompetenceCard
              icon={Layers}
              title="Desarrollo Multiplataforma"
              desc="Java, Kotlin, Android. Aplicaciones de escritorio y móviles multiplataforma."
              delay={0.7}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
