"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { profile } from "@/data/profile";

const socialIcons = [
  { href: profile.social.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: profile.social.github, icon: FaGithub, label: "GitHub" },
  { href: profile.social.instagram, icon: FaInstagram, label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neon/20 bg-deep/80 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-text-muted text-sm">
          &copy; {year}{" "}
          <span className="text-neon font-semibold">{profile.shortName}</span>.
          Todos os direitos reservados.
        </p>

        <div className="flex items-center gap-5">
          {socialIcons.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-neon-bright transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(199,125,255,0.6)]"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
