"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const isMobile = useIsMobile();

  return (
    <section
      id={id}
      className={`relative py-28 md:py-36 overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isMobile ? { opacity: 1 } : undefined}
        whileInView={isMobile ? undefined : { opacity: 1 }}
        viewport={isMobile ? undefined : { once: true, amount: 0 }}
        transition={{ duration: isMobile ? 0 : 0.5 }}
        className="w-full max-w-6xl mx-auto px-6 md:px-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
