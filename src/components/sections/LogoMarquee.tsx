"use client";

import { wrapValue } from "@/components/ui/motion";
import type { Skill } from "@/content/skills";
import { Pause, Play } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

interface LogoMarqueeProps {
  items: Skill[];
  baseVelocity?: number;
  className?: string;
}

export function LogoMarquee({
  items,
  baseVelocity = 2.2,
  className,
}: LogoMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(marqueeRef);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const horizontalOffset = useTransform(
    baseX,
    (value) => `${wrapValue(-50, 0, value)}%`,
  );

  const scrollDirection = useRef(1);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || !isInView || paused || hovered) return;

    const factor = velocityFactor.get();
    if (factor < 0) scrollDirection.current = -1;
    else if (factor > 0) scrollDirection.current = 1;

    let moveBy = scrollDirection.current * baseVelocity * (delta / 1000);
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const renderStrip = (ariaHidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((skill) => (
        <li
          key={skill.name}
          className="flex shrink-0 items-center gap-2.5 rounded-full border border-ink-200/80 bg-surface py-1.5 pl-2 pr-4 shadow-card"
        >
          <Image
            src={skill.imageUrl}
            alt=""
            width={32}
            height={32}
            className="size-6 object-contain"
          />
          <span className="whitespace-nowrap text-sm font-medium text-ink-700">
            {skill.name}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={marqueeRef}
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        onPointerEnter={(event) =>
          event.pointerType === "mouse" && setHovered(true)
        }
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { x: horizontalOffset }}
          className="flex w-max"
        >
          {renderStrip(false)}
          {renderStrip(true)}
        </motion.div>
      </div>
      {!prefersReducedMotion && (
        <div className="container-page mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => setPaused((isPaused) => !isPaused)}
            aria-pressed={paused}
            aria-label={paused ? "Play logo strip" : "Pause logo strip"}
            className="grid size-8 place-items-center rounded-full border border-ink-200 bg-surface text-ink-500 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {paused ? (
              <Play className="size-3.5" aria-hidden="true" />
            ) : (
              <Pause className="size-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
