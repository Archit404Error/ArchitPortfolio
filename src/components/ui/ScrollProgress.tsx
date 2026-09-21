"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { SPRING_SCROLL } from "./motion";

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING_SCROLL);
  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX }}
      className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r transition-opacity duration-300 from-brand-600 via-brand-400 to-brand-600 ${className ?? ""}`}
    />
  );
}
