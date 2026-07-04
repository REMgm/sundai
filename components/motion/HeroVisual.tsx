"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero media tile: scale-settle entrance, then a slight scroll parallax
 * for depth. Driven by motion values, never React state.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48]);

  return (
    <div ref={ref}>
      <motion.div
        style={{ y }}
        initial={reduce ? false : { opacity: 0, scale: 0.965 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: EASE }}
        className="overflow-hidden rounded-2xl"
      >
        <Image
          src="/assets/rem-hero-light.jpg"
          alt="Rem, the SundAI Motivation cyborg owl, glowing with a teal aura on an executive desk in a bright office"
          width={1200}
          height={1600}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}
