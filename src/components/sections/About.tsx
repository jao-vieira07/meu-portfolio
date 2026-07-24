"use client";

import { motion } from "framer-motion";
import { FaCode, FaGraduationCap, FaMusic } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import { profile } from "@/data/profile";

const highlights = [
  {
    icon: FaCode,
    title: "Arquitetura & Sistemas",
    text: profile.about.intro,
  },
  {
    icon: FaGraduationCap,
    title: "Trajetória Acadêmica",
    text: profile.about.journey,
  },
  {
    icon: FaMusic,
    title: "Além do Código",
    text: `Quando não estou codificando: ${profile.about.beyond.join(" · ")}.`,
  },
];

const timelineItems = [
  { year: "Jun 2025", event: "Início em desenvolvimento e ecossistema Java" },
  { year: "Dez 2025", event: "Engenharia de Software — UNIFIL" },
  { year: "2026", event: "Spring Boot, APIs REST e Clean Code" },
  { year: "Próximo", event: "Estágio em Back-End Java" },
];

export default function About() {
  return (
    <section id="sobre" className="py-28 px-6 bg-deep relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,51,126,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          title="Sobre Mim"
          subtitle="Estudante de Engenharia de Software focado em Back-End Java — aplicando boas práticas em projetos reais e evoluindo com consistência."
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass rounded-2xl p-8 group hover:border-neon/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-purple/30 flex items-center justify-center mb-5 group-hover:bg-neon/20 transition-colors">
                <item.icon className="text-neon text-xl" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-neon mb-3">
                {item.title}
              </h3>
              <p className="text-text-muted leading-relaxed text-sm">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-12"
        >
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-neon mb-8 text-center">
            Minha Trajetória
          </h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon/60 via-purple/40 to-transparent md:-translate-x-px" />

            <div className="space-y-8">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse md:text-right"
                  }`}
                >
                  <div className="hidden md:block flex-1" />
                  <div className="relative z-10 w-8 h-8 rounded-full bg-deep border-2 border-neon flex items-center justify-center shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div className="w-2.5 h-2.5 rounded-full bg-neon" />
                  </div>
                  <div className="flex-1 glass rounded-xl p-5 ml-12 md:ml-0">
                    <span className="font-[family-name:var(--font-jetbrains)] text-neon text-sm">
                      {item.year}
                    </span>
                    <p className="text-text mt-1">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-center text-text-muted mt-10 max-w-2xl mx-auto leading-relaxed">
            {profile.about.focus}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
