"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
  /* Lista de textos que se irán escribiendo/borrando en loop */
  texts: string[];
  /* Velocidad de escritura en ms por carácter */
  typingSpeed?: number;
  /* Velocidad de borrado en ms por carácter */
  deletingSpeed?: number;
  /* Pausa al terminar de escribir una palabra en ms */
  pauseAfterType?: number;
  /* Pausa al terminar de borrar una palabra en ms */
  pauseAfterDelete?: number;
  className?: string;
}

/* Efecto de máquina de escribir con loop entre textos */
export default function TypingEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseAfterType = 2000,
  pauseAfterDelete = 500,
  className = "",
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentText = texts[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        /* Escribiendo */
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          /* Pausa al terminar de escribir */
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseAfterType);
        }
      } else {
        /* Borrando */
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          /* Pausa al terminar de borrar, cambiar al siguiente texto */
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }, pauseAfterDelete);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    isPaused,
    currentIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return (
    <span className={className} aria-label={texts[currentIndex]}>
      {displayedText}
      <span
        className="inline-block w-[3px] h-[1em] bg-[#00f5ff] ml-1 align-middle animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
