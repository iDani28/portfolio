"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, type TargetAndTransition } from "framer-motion";
import { Mail, Github, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
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

const CONTACTOS = [
  {
    icono: Mail,
    label: "Email",
    valor: "dmrdaniel2804@gmail.com",
    href: "mailto:dmrdaniel2804@gmail.com",
    color: "#00f5ff",
  },
  {
    icono: Github,
    label: "GitHub",
    valor: "github.com/iDani28",
    href: "https://github.com/iDani28",
    color: "#ccd6f6",
  },
  {
    icono: Phone,
    label: "Teléfono",
    valor: "+34 656 652 860",
    href: "tel:+34656652860",
    color: "#00ff41",
  },
  {
    icono: MapPin,
    label: "Ubicación",
    valor: "Málaga, España",
    href: null,
    color: "#7b2fff",
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contacto() {
  const formRef = useRef<HTMLFormElement>(null);
  const isMobile = useIsMobile();

  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.nombre,
          email: formData.email,
          message: formData.asunto
            ? `Asunto: ${formData.asunto}\n\n${formData.mensaje}`
            : formData.mensaje,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,245,255,0.15)] rounded-lg px-4 py-3 " +
    "text-[#ccd6f6] text-sm font-mono placeholder-[#8892b0] " +
    "focus:outline-none focus:border-[#00f5ff] focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] " +
    "transition-all duration-200";

  return (
    <SectionWrapper id="contacto" className="bg-[rgba(0,245,255,0.01)]">
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.2), rgba(123,47,255,0.2), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <SectionTitle
        number="06"
        title="Contacto"
        subtitle="¿Tienes una oportunidad o quieres colaborar? Escríbeme, respondo rápido."
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <motion.p
            {...reveal(isMobile, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })}
            className="text-[#8892b0] leading-relaxed"
          >
            Actualmente estoy abierto a nuevas oportunidades laborales en el sector tech, tanto en desarrollo web, desarrollo multiplataforma como en ciberseguridad. Si tienes una oferta, un proyecto interesante o simplemente quieres conectar, no dudes en escribirme.
          </motion.p>

          <div className="space-y-4">
            {CONTACTOS.map((c, i) => (
              <motion.div
                key={c.label}
                {...reveal(isMobile, { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, i * 0.08)}
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-xl border border-[rgba(0,245,255,0.1)]
                               bg-[rgba(0,245,255,0.02)] hover:border-[rgba(0,245,255,0.3)]
                               hover:bg-[rgba(0,245,255,0.04)] transition-all duration-300 group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
                    >
                      <c.icono size={18} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-[#8892b0] text-xs font-mono mb-0.5">{c.label}</p>
                      <p className="text-[#ccd6f6] text-sm group-hover:text-[#00f5ff] transition-colors">
                        {c.valor}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-5 rounded-xl border border-[rgba(0,245,255,0.1)] bg-[rgba(0,245,255,0.02)]">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
                    >
                      <c.icono size={18} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-[#8892b0] text-xs font-mono mb-0.5">{c.label}</p>
                      <p className="text-[#ccd6f6] text-sm">{c.valor}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          {...reveal(isMobile, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, 0.2)}
          className="p-8 rounded-xl border border-[rgba(0,245,255,0.15)] bg-[rgba(0,245,255,0.02)]"
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[#8892b0] text-xs font-mono">mensaje.send()</span>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="nombre" className="block text-xs font-mono text-[#8892b0] mb-2">nombre *</label>
                <input id="nombre" name="nombre" type="text" required value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-[#8892b0] mb-2">email *</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="tu@email.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="asunto" className="block text-xs font-mono text-[#8892b0] mb-2">asunto</label>
              <input id="asunto" name="asunto" type="text" value={formData.asunto} onChange={handleChange} placeholder="Oferta de trabajo / Consulta / ..." className={inputClass} />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-xs font-mono text-[#8892b0] mb-2">mensaje *</label>
              <textarea id="mensaje" name="mensaje" required rows={6} value={formData.mensaje} onChange={handleChange} placeholder="Cuéntame en qué puedo ayudarte..." className={`${inputClass} resize-none`} />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-mono font-bold text-sm tracking-wider uppercase
                          flex items-center justify-center gap-2 transition-all duration-300 ${
                            status === "success"
                              ? "bg-[#00ff41] text-[#050505]"
                              : status === "error"
                              ? "bg-[#ff5555] text-white"
                              : "bg-[#00f5ff] text-[#050505] hover:bg-[#00ff41]"
                          } disabled:opacity-70`}
            >
              {status === "sending" && (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#050505] border-t-transparent rounded-full" />
              )}
              {status === "success" && <CheckCircle size={16} />}
              {status === "error" && <AlertCircle size={16} />}
              {status === "idle" && <Send size={16} />}
              {status === "idle" && "Enviar mensaje"}
              {status === "sending" && "Enviando..."}
              {status === "success" && "¡Enviado!"}
              {status === "error" && "Error al enviar"}
            </motion.button>

            {status === "success" && (
              <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-center text-xs text-[#00ff41] font-mono">
                ¡Mensaje enviado correctamente! Me pondré en contacto pronto.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-center text-xs text-[#ff5555] font-mono">
                No se pudo enviar el mensaje. Inténtalo de nuevo o contáctame directamente.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
