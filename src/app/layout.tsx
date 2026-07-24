import type { Metadata } from "next";
import { Montserrat, Playfair_Display, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "João Pedro Vieira Daniel | Desenvolvedor Back-End",
  description:
    "Portfólio de João Pedro Vieira Daniel — Desenvolvedor Back-End em formação, com projetos em Java, PostgreSQL e JDBC. Iniciando Spring Boot.",
  keywords: [
    "desenvolvedor back-end",
    "estágio",
    "java",
    "spring boot",
    "postgresql",
    "jdbc",
    "engenharia de software",
  ],
  authors: [{ name: "João Pedro Vieira Daniel" }],
  openGraph: {
    title: "João Pedro Vieira Daniel | Desenvolvedor Back-End",
    description:
      "Desenvolvedor Back-End em formação, com projetos em Java e PostgreSQL. Iniciando Spring Boot no bootcamp.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-neon focus:text-text"
        >
          Pular para o conteúdo
        </a>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
