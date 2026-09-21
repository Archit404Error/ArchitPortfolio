"use client";

import { motion, type Variants } from "motion/react";
import { ANIMATION_DURATIONS, EASE_OUT_ANIMATION } from "./motion";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const splitWord: Variants = {
  hidden: { y: "115%", rotate: 3, opacity: 0 },
  show: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.slow + 0.1,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

export function SplitText({ text, className, wordClassName }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden px-[0.04em] -mx-[0.04em] pb-[0.16em] -mb-[0.16em] align-top"
          >
            <motion.span
              variants={splitWord}
              className={`inline-block origin-bottom-left will-change-transform ${wordClassName ?? ""}`}
            >
              {word}
              {index < words.length - 1 ? "\u00a0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
