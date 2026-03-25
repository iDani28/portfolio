"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

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

export default function SectionTitle({ number, title, subtitle }: SectionTitleProps) {
  const isMobile = useIsMobile();

  return (
    <div className="mb-20">
      <motion.span
        {...reveal(isMobile, { opacity: 0, x: -20 }, { opacity: 1, x: 0 })}
        className="block text-sm font-mono text-[#00f5ff] mb-2 tracking-widest uppercase"
      >
        {number} —
      </motion.span>

      <motion.h2
        {...reveal(isMobile, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.1)}
        className="text-3xl md:text-5xl font-bold text-[#ccd6f6] mb-4"
      >
        {title}
      </motion.h2>

      <motion.div
        {...reveal(isMobile, { scaleX: 0, originX: 0 }, { scaleX: 1 }, 0.2)}
        className="h-[2px] w-32 bg-gradient-to-r from-[#00f5ff] to-[#00ff41] mb-4"
      />

      {subtitle && (
        <motion.p
          {...reveal(isMobile, { opacity: 0 }, { opacity: 1 }, 0.3)}
          className="text-[#8892b0] text-base max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
