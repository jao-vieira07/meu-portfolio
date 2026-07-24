"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBookOpen, FaRocket } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import { profile } from "@/data/profile";

const cards = [
  {
    icon: FaMapMarkerAlt,
    ...profile.experience.today,
    accent: "from-purple to-neon",
  },
  {
    icon: FaBookOpen,
    title: profile.experience.studying.title,
    description: profile.experience.studying.items,
    accent: "from-neon to-neon-bright",
  },
  {
    icon: FaRocket,
    ...profile.experience.goals,
    accent: "from-neon-bright to-purple",
  },
];

export default function Experience() {
  return (
    <section className="py-28 px-6 bg-deep relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(123,51,126,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          title="Experiência & Objetivos"
          subtitle="Onde estou, o que busco e para onde vou."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-strong rounded-2xl p-8 relative overflow-hidden group hover:border-neon/40 transition-all duration-300"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accent}`}
              />

              <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center mb-6 group-hover:bg-neon/20 transition-colors">
                <card.icon className="text-neon text-xl" />
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-neon mb-4">
                {card.title}
              </h3>

              {Array.isArray(card.description) ? (
                <ul className="space-y-2">
                  {card.description.map((item) => (
                    <li
                      key={item}
                      className="text-text-muted text-sm flex items-start gap-2"
                    >
                      <span className="text-neon mt-1 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-muted leading-relaxed text-sm">
                  {card.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
