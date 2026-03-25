"use client";

import { useEffect, useRef } from "react";

/* Partícula individual */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

/* Fondo animado con partículas tipo matrix/cyberpunk */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Ajustar tamaño del canvas al viewport */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Colores del tema cyberpunk */
    const colors = ["#00f5ff", "#00ff41", "#7b2fff", "#0099ff"];

    /* Crear partículas */
    const particles: Particle[] = [];
    const MAX_PARTICLES = 80;

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    /* Inicializar partículas */
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(createParticle());
    }

    /* Dibujar conexiones entre partículas cercanas */
    const drawConnections = () => {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    /* Bucle de animación */
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Fondo oscuro semitransparente para trail effect */
      ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* Actualizar y dibujar partículas */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        /* Rebote en los bordes */
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        /* Regenerar partícula si ha vivido suficiente */
        if (p.life > p.maxLife) {
          particles[i] = createParticle();
          continue;
        }

        /* Fade in/out según ciclo de vida */
        const lifeRatio = p.life / p.maxLife;
        const currentOpacity =
          lifeRatio < 0.1
            ? p.opacity * (lifeRatio / 0.1)
            : lifeRatio > 0.9
            ? p.opacity * ((1 - lifeRatio) / 0.1)
            : p.opacity;

        /* Dibujar partícula */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      drawConnections();
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
