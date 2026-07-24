"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPlay } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import VideoModal from "@/components/ui/VideoModal";
import {
  projects,
  projectCategories,
  type ProjectCategory,
} from "@/data/projects";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "Todos">(
    "Todos"
  );
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    url: string;
  } | null>(null);

  const filtered =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projetos" className="py-28 px-6 bg-deep relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(123,51,126,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          title="Projetos"
          subtitle="Projetos reais que desenvolvi enquanto aprendo e evoluo em Back-End com Java."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(["Todos", ...projectCategories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-neon text-text shadow-[0_0_20px_rgba(160,73,164,0.4)]"
                  : "glass text-text-muted hover:text-neon hover:border-neon/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden group hover:border-neon/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gradient-to-br from-surface to-deep overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 to-transparent" />
                  {project.featured && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-neon/20 border border-neon/40 text-neon text-xs font-medium">
                      Destaque
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl text-text font-semibold">
                      {project.title}
                    </h3>
                    <span className="font-[family-name:var(--font-jetbrains)] text-xs text-neon px-2 py-1 rounded bg-neon/10">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-neon uppercase tracking-wider mb-2">
                      Desafios resolvidos
                    </p>
                    <ul className="space-y-1">
                      {project.challenges.map((c) => (
                        <li
                          key={c}
                          className="text-text-muted text-xs flex items-start gap-2"
                        >
                          <span className="text-neon mt-0.5">▸</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-deep/80 text-text-muted text-xs border border-purple/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button href={project.github} variant="outline" className="!px-4 !py-2 !text-xs">
                      <FaGithub size={14} /> GitHub
                    </Button>
                    {project.video && (
                      <Button
                        onClick={() =>
                          setActiveVideo({ title: project.title, url: project.video! })
                        }
                        variant="outline"
                        className="!px-4 !py-2 !text-xs"
                      >
                        <FaPlay size={12} /> Vídeo
                      </Button>
                    )}
                    {project.demo && (
                      <Button href={project.demo} variant="ghost" className="!px-4 !py-2 !text-xs">
                        <FaExternalLinkAlt size={12} /> Demo
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo.title}
          videoUrl={activeVideo.url}
        />
      )}
    </section>
  );
}
