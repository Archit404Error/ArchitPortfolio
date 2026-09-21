"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT_ANIMATION } from "./motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

const formatNumber = (value: number, decimals: number) =>
  Number(value.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className,
}: CountUpProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(to);
  const text = useTransform(
    count,
    (value) => `${prefix}${formatNumber(value, decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const controls = animate(count, [0, to], {
      duration,
      ease: EASE_OUT_ANIMATION,
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, count, to, duration]);

  return (
    <motion.span ref={countRef} className={className}>
      {text}
    </motion.span>
  );
}
