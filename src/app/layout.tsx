import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Fuentes: Geist para texto general, Geist Mono para detalles técnicos */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Moreno Ruiz | Dev & Ciberseguridad",
  description:
    "Portfolio profesional de Daniel Moreno Ruiz — Desarrollador full-stack y estudiante de Máster en Ciberseguridad. Málaga, España.",
  keywords: [
    "desarrollador web",
    "ciberseguridad",
    "Next.js",
    "React",
    "portfolio",
    "Málaga",
  ],
  authors: [{ name: "Daniel Moreno Ruiz" }],
  openGraph: {
    title: "Daniel Moreno Ruiz | Dev & Ciberseguridad",
    description: "Desarrollador full-stack y estudiante de Máster en Ciberseguridad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="w-full min-h-screen bg-[#050505] text-[#e8f4f8] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
