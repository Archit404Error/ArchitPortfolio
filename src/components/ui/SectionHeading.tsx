"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  REVEAL_VIEWPORT,
  STAGGER_INTERVALS,
} from "./motion";
import { SplitText } from "./SplitText";

interface SectionHeadingProps {
  id?: string;
  title: string;
  titleMuted?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

export function SectionHeading({
  id,
  title,
  titleMuted,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const isCentered = align === "center";
  const isDarkTone = tone === "dark";

  return (
    <motion.div
      className={`${isCentered ? "mx-auto text-center" : ""} max-w-2xl ${className ?? ""}`}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ ...REVEAL_VIEWPORT, once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: STAGGER_INTERVALS.base,
            delayChildren: 0.05,
          },
        },
      }}
    >
      <h2
        id={id}
        className={`font-serif text-balance text-[2.5rem] font-[450] leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem] ${
          isDarkTone ? "text-paper" : "text-ink-900"
        }`}
      >
        <SplitText text={title} />
        {titleMuted ? (
          <>
            {" "}
            <SplitText
              text={titleMuted}
              className={`italic font-normal ${isDarkTone ? "text-ink-400" : "text-ink-500"}`}
            />
          </>
        ) : null}
      </h2>
      {description ? (
        <motion.p
          variants={descriptionVariants}
          className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
            isDarkTone ? "text-ink-300" : "text-ink-600"
          }`}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
