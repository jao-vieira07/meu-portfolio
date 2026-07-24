"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { profile } from "@/data/profile";

const socialLinks = [
  { href: profile.social.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: profile.social.github, icon: FaGithub, label: "GitHub" },
  { href: profile.social.instagram, icon: FaInstagram, label: "Instagram" },
  { href: `mailto:${profile.email}`, icon: FaEnvelope, label: "E-mail" },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const subject = form.subject.trim() || "Contato pelo Portfólio";
    const body = `Nome: ${form.name}\nE-mail: ${form.email}\n\n${form.message}`;
    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "Erro ao enviar mensagem.");
        return;
      }

      window.location.href = mailtoLink;

      setStatus("success");
      setFeedback(
        "Mensagem validada! Seu cliente de e-mail será aberto para concluir o envio."
      );
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      window.location.href = mailtoLink;
      setStatus("success");
      setFeedback("Abrindo seu cliente de e-mail para enviar a mensagem.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-deep/60 border border-purple/30 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-neon/60 focus:shadow-[0_0_15px_rgba(160,73,164,0.15)] transition-all duration-300";

  return (
    <section id="contato" className="py-28 px-6 bg-deep relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(160,73,164,0.1),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionTitle
          title="Vamos Conversar?"
          subtitle="Aberto a oportunidades de estágio ou vaga Back-End Java, colaborações técnicas e networking profissional."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-text-muted leading-relaxed">
              Se você busca um Desenvolvedor Back-End Java em início de carreira,
              comprometido com código limpo, APIs bem arquitetadas e aprendizado contínuo,
              vamos conversar.
            </p>

            <div className="glass rounded-2xl p-6 space-y-4">
              <p className="text-sm text-text-muted">Redes & Contato</p>
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "E-mail" ? "_blank" : undefined}
                  rel={label !== "E-mail" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-text-muted hover:text-neon transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                    <Icon className="text-neon" />
                  </div>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>

            <p className="font-[family-name:var(--font-jetbrains)] text-xs text-text-muted/60">
              {profile.email}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-strong rounded-2xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="text-xs text-text-muted mb-1.5 block">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs text-text-muted mb-1.5 block">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-xs text-text-muted mb-1.5 block">
                Assunto
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass}
                placeholder="Oportunidade, projeto, dúvida..."
              />
            </div>

            <div>
              <label htmlFor="message" className="text-xs text-text-muted mb-1.5 block">
                Mensagem
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Escreva sua mensagem..."
              />
            </div>

            {feedback && (
              <p
                className={`text-sm ${
                  status === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {feedback}
              </p>
            )}

            <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
              {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
