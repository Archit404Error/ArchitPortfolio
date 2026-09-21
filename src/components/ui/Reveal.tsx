"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  REVEAL_VIEWPORT,
  STAGGER_INTERVALS,
} from "./motion";

export type RevealFrom = "up" | "down" | "left" | "right" | "scale" | "none";

type Tag = "div" | "li" | "ul" | "ol" | "article" | "section" | "span" | "p";

interface BaseProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
}

interface RevealProps extends BaseProps {
  delay?: number;
  from?: RevealFrom;
  distance?: number;
  blur?: boolean;
  once?: boolean;
}

interface RevealGroupProps extends BaseProps {
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}

interface RevealItemProps extends BaseProps {
  from?: RevealFrom;
  distance?: number;
  blur?: boolean;
}

export function revealVariants({
  from = "up",
  distance = 28,
  blur = false,
  delay = 0,
  duration = ANIMATION_DURATIONS.slow,
}: {
  from?: RevealFrom;
  distance?: number;
  blur?: boolean;
  delay?: number;
  duration?: number;
} = {}): Variants {
  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
    scale: { scale: 0.92 },
    none: {},
  }[from];

  return {
    hidden: {
      opacity: 0,
      ...offset,
      ...(blur ? { filter: "blur(6px)" } : {}),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: { duration, delay, ease: EASE_OUT_ANIMATION },
    },
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  distance,
  blur,
  once = true,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={revealVariants({ from, distance, blur, delay })}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ ...REVEAL_VIEWPORT, once }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = STAGGER_INTERVALS.base,
  delay = 0,
  once = true,
  amount,
  as = "div",
}: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ ...REVEAL_VIEWPORT, once, ...(amount ? { amount } : {}) }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  from = "up",
  distance,
  blur,
  as = "div",
}: RevealItemProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={revealVariants({ from, distance, blur })}
    >
      {children}
    </Component>
  );
}
