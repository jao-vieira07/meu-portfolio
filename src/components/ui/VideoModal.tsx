"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  title,
  videoUrl,
}: VideoModalProps) {
  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-3xl glass-strong rounded-2xl overflow-hidden neon-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-neon/20">
              <h3 className="font-[family-name:var(--font-playfair)] text-lg text-text pr-4">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-neon transition-colors p-1"
                aria-label="Fechar vídeo"
              >
                <HiX size={22} />
              </button>
            </div>

            <div className="relative aspect-video bg-deep">
              {embedUrl ? (
                <iframe
                  src={`${embedUrl}?autoplay=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full p-6 text-center">
                  <p className="text-text-muted text-sm">
                    Link de vídeo inválido. Use um URL do YouTube.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
