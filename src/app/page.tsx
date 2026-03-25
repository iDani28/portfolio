import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import SobreMi from "@/components/sections/SobreMi";
import Formacion from "@/components/sections/Formacion";
import Experiencia from "@/components/sections/Experiencia";
import Proyectos from "@/components/sections/Proyectos";
import Skills from "@/components/sections/Skills";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/ui/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

/* Página principal del portfolio de Daniel Moreno Ruiz */
export default function Home() {
  return (
    <>
      {/* Barra de navegación fija */}
      <Navbar />

      <main>
        {/* 01 — Presentación visual de impacto */}
        <Hero />

        <SectionDivider />

        {/* 02 — Quién soy */}
        <SobreMi />

        <SectionDivider />

        {/* 03 — Trayectoria académica */}
        <Formacion />

        <SectionDivider />

        {/* 04 — Experiencia laboral */}
        <Experiencia />

        <SectionDivider />

        {/* 05 — Proyectos destacados */}
        <Proyectos />

        <SectionDivider />

        {/* 06 — Habilidades técnicas */}
        <Skills />

        <SectionDivider />

        {/* 07 — Formulario de contacto y datos */}
        <Contacto />
      </main>

      <Footer />
    </>
  );
}
