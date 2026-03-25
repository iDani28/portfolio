"use client";

import { useEffect, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

/* Texto con efecto glitch ocasional al hacer hover */
export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Caracteres usados para el efecto glitch */
    const glitchChars = "!<>-_\\/[]{}—=+*^?#$%&@0123456789";
    let animId: number;
    let iteration = 0;
    let isAnimating = false;

    const animate = (originalText: string) => {
      if (iteration >= originalText.length) {
        el.textContent = originalText;
        isAnimating = false;
        return;
      }

      el.textContent = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) return char;
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join("");

      iteration += 0.3;
      animId = requestAnimationFrame(() => animate(originalText));
    };

    const handleMouseEnter = () => {
      if (isAnimating) return;
      isAnimating = true;
      iteration = 0;
      animate(text);
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [text]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {text}
    </span>
  );
}
