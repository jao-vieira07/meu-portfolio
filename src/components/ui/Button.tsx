"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300";

  const variants = {
    primary:
      "bg-purple text-text hover:bg-neon hover:shadow-[0_8px_30px_rgba(160,73,164,0.5)]",
    outline:
      "border border-neon/50 text-neon hover:bg-neon/10 hover:border-neon hover:shadow-[0_0_20px_rgba(160,73,164,0.3)]",
    ghost: "text-text-muted hover:text-neon hover:bg-surface/50",
  };

  const classes = `${base} ${variants[variant]} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <motion.a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -2, scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
