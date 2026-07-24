"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { techStack } from "@/data/techStack";

export default function TechStack() {
  return (
    <section id="stack" className="py-28 px-6 bg-deep relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(160,73,164,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          title="Stack Tecnológica"
          subtitle="Tecnologias que aplico no desenvolvimento Back-End com Java, com foco em soluções reais e boas práticas."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-6 group cursor-default hover:border-neon/50 hover:shadow-[0_0_30px_rgba(160,73,164,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-deep/80 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-text font-semibold">
                  {tech.name}
                </h3>
              </div>

              <p className="text-text-muted text-sm leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
