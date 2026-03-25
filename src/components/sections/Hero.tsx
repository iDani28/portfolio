"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import { Github, Mail, Phone, ChevronDown, Shield, Code2 } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TypingEffect from "@/components/ui/TypingEffect";
import GlitchText from "@/components/ui/GlitchText";

/* Easing tipado correctamente para Framer Motion */
const EASE_OUT: Easing = "easeOut";

/* Variantes de animación de entrada */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.8, delay },
  }),
};

/* Roles que se alternan en el efecto de typing */
const ROLES = [
  "Desarrollador Full-Stack",
  "Estudiante de Ciberseguridad",
  "Penetration Tester",
  "Desarrollador Next.js",
  "Apasionado del Hacking Ético",
];

/* Enlace social con icono */
function SocialLink({
  href,
  icon: Icon,
  label,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 border border-[rgba(0,245,255,0.3)] rounded-lg
                 text-[#8892b0] hover:text-[#00f5ff] hover:border-[#00f5ff]
                 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300
                 text-sm font-mono"
    >
      <Icon size={16} />
      <span>{label}</span>
    </motion.a>
  );
}

/* Sección Hero — primera impresión del portfolio */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo con partículas */}
      <ParticleBackground />

      {/* Grid cyberpunk de fondo */}
      <div className="absolute inset-0 cyber-grid opacity-30" aria-hidden="true" />

      {/* Gradiente radial central */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,245,255,0.06) 0%, rgba(123,47,255,0.04) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Línea de escaneo animada */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.4)] to-transparent pointer-events-none"
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        aria-hidden="true"
      />

      {/* Contenido principal */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-6 md:px-10">

        {/* Badge de estado — disponible para empleo */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgba(0,255,65,0.3)] bg-[rgba(0,255,65,0.05)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
          </span>
          <span className="text-[#00ff41] text-xs font-mono tracking-widest uppercase">
            &gt; Buscando nuevos retos profesionales
          </span>
        </motion.div>

        {/* Nombre principal con efecto glitch */}
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <GlitchText
              text="Daniel Moreno"
              className="block gradient-text text-glow-cyan cursor-default select-none"
            />
            <GlitchText
              text="Ruiz"
              className="block gradient-text text-glow-cyan cursor-default select-none"
            />
          </h1>
        </motion.div>

        {/* Separador decorativo */}
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[rgba(0,245,255,0.5)]" />
          <Shield size={16} className="text-[#00f5ff]" />
          <Code2 size={16} className="text-[#00ff41]" />
          <Shield size={16} className="text-[#00f5ff]" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[rgba(0,245,255,0.5)]" />
        </motion.div>

        {/* Efecto de typing con los roles */}
        <motion.div
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="h-10 mb-6 flex items-center justify-center"
        >
          <TypingEffect
            texts={ROLES}
            className="text-xl md:text-2xl font-mono text-[#00f5ff]"
          />
        </motion.div>

        {/* Descripción personal breve */}
        <motion.p
          custom={0.8}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-[#8892b0] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Desarrollador multiplataforma y web en constante evolución. Actualmente profundizando en{" "}
          <span className="text-[#00f5ff]">seguridad ofensiva y defensiva</span>{" "}
          para construir aplicaciones más{" "}
          <span className="text-[#ccd6f6]">seguras y robustas</span>.
        </motion.p>

        {/* CTAs principales */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* CTA principal — ver proyectos */}
          <motion.a
            href="#proyectos"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,245,255,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-[#00f5ff] text-[#050505] font-bold font-mono rounded-lg
                       hover:bg-[#00ff41] transition-colors duration-300 text-sm tracking-wider uppercase"
          >
            Ver proyectos
          </motion.a>

          {/* CTA secundario — contactar */}
          <motion.a
            href="#contacto"
            whileHover={{
              scale: 1.05,
              borderColor: "#00f5ff",
              boxShadow: "0 0 20px rgba(0,245,255,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 border border-[rgba(0,245,255,0.4)] text-[#00f5ff]
                       font-mono rounded-lg hover:bg-[rgba(0,245,255,0.05)]
                       transition-all duration-300 text-sm tracking-wider uppercase"
          >
            Contactar
          </motion.a>
        </motion.div>

        {/* Links sociales */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SocialLink
            href="https://github.com/iDani28"
            icon={Github}
            label="GitHub"
            delay={1.1}
          />
          <SocialLink
            href="mailto:dmrdaniel2804@gmail.com"
            icon={Mail}
            label="dmrdaniel2804@gmail.com"
            delay={1.2}
          />
          <SocialLink
            href="tel:+34656652860"
            icon={Phone}
            label="+34 656 652 860"
            delay={1.3}
          />
        </div>
      </div>

      {/* Flecha de scroll hacia abajo */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a
          href="#sobre-mi"
          aria-label="Ir a la siguiente sección"
          className="flex flex-col items-center gap-1 text-[#8892b0] hover:text-[#00f5ff] transition-colors duration-300"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </a>
      </motion.div>

      {/* Esquinas decorativas tipo terminal */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[rgba(0,245,255,0.4)]" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[rgba(0,245,255,0.4)]" aria-hidden="true" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[rgba(0,245,255,0.4)]" aria-hidden="true" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[rgba(0,245,255,0.4)]" aria-hidden="true" />
    </section>
  );
}
