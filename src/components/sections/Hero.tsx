"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { HiArrowDown } from "react-icons/hi";
import Button from "@/components/ui/Button";
import TypingEffect from "@/components/ui/TypingEffect";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { profile } from "@/data/profile";
import { techStack } from "@/data/techStack";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1.1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center animated-gradient overflow-hidden"
    >
      <ParticlesBackground />

      <div
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon/10 blur-[120px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-[family-name:var(--font-jetbrains)] text-neon text-sm tracking-[0.3em] uppercase mb-4"
            >
              {profile.role}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6"
            >
              {profile.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-text-muted leading-relaxed mb-8 min-h-[3rem]"
            >
              <TypingEffect
                texts={[
                  profile.tagline,
                  "Java, OOP e persistência com JDBC e PostgreSQL.",
                  "Construindo APIs REST com Spring Boot e Clean Code.",
                  "Aberto a oportunidades de estágio em Back-End Java.",
                ]}
                speed={40}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button href="#projetos">Ver Projetos</Button>
              <Button href="#sobre" variant="outline">
                Sobre Mim
              </Button>
              <Button href="#contato" variant="ghost">
                Contato
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4"
            >
              {techStack.slice(0, 5).map((tech) => (
                <div
                  key={tech.name}
                  className="w-9 h-9 relative opacity-70 hover:opacity-100 transition-opacity"
                  title={tech.name}
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain drop-shadow-[0_0_6px_rgba(160,73,164,0.5)]"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple via-neon to-neon-bright opacity-30 blur-2xl scale-105" />
              <div className="relative gradient-border rounded-2xl p-1 pulse-glow">
                <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden bg-surface">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                    unoptimized={profile.photo.endsWith(".svg")}
                  />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 neon-glow"
              >
                <p className="font-[family-name:var(--font-jetbrains)] text-xs text-neon">
                  Eng. Software
                </p>
                <p className="text-text-muted text-xs">UNIFIL</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#sobre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neon/60 hover:text-neon transition-colors hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HiArrowDown size={24} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
