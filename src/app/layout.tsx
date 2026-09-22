import type { Metadata, Viewport } from "next";
import { EB_Garamond, Jost } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { site } from "@/content/site";

import "./globals.css";

/**
 * Serifa old-style para títulos — o registo editorial da marca.
 *
 * Escolhida em vez do Cormorant Garamond porque este desenha o "ê" minúsculo
 * com o circunflexo deformado, o que é inaceitável num site em português.
 */
const garamond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

/** Geométrica próxima do lettering do logótipo, usada em texto e interface. */
const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cortinados por medida",
    "cortinas à medida",
    "atelier de cortinados",
    "estores por medida",
    "decoração de interiores",
    "Portugal",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Sem `maximumScale`/`userScalable`: o zoom nunca deve ser bloqueado.
  // Coincide com o fundo do topo da página (--color-cream).
  themeColor: "#faf7f2",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${garamond.variable} ${jost.variable}`}>
      <head>
        {/* Sem JavaScript as animações de entrada não correm — o conteúdo tem de ficar visível. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      {/*
        Extensões de browser (ColorZilla, Grammarly, gestores de palavra-passe)
        injetam atributos no <body> antes de o React hidratar, o que provoca um
        aviso de hydration mismatch em desenvolvimento. Isto silencia apenas os
        atributos do próprio <body> — as diferenças nos filhos continuam a ser
        reportadas.
      */}
      <body suppressHydrationWarning>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-espresso focus:px-5 focus:py-3 focus:text-[0.75rem] focus:tracking-[0.18em] focus:text-cream focus:uppercase"
        >
          Saltar para o conteúdo
        </a>

        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
