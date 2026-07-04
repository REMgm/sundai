"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero wordmark entrance: each line rises out of an overflow mask in
 * sequence. Storytelling motion: the brand arrives before the pitch.
 */
export function KineticTitle({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();

  return (
    <h1
      aria-label={lines.join(" ")}
      className="font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-[clamp(2.5rem,6.6vw,5.5rem)]"
    >
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** Fade-up for the hero elements that follow the wordmark. */
export function HeroFade({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
