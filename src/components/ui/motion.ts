export const ANIMATION_EASING = [0.21, 0.47, 0.32, 0.98] as const;
export const EASE_OUT_ANIMATION = [0.16, 1, 0.3, 1] as const;

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
  long: 1.1,
} as const;

export const STAGGER_INTERVALS = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;

export const REVEAL_VIEWPORT = { margin: "0px 0px -12% 0px" } as const;

export const SPRING_SOFT = {
  type: "spring",
  stiffness: 120,
  damping: 24,
  mass: 0.6,
} as const;

export const SPRING_POP = {
  type: "spring",
  stiffness: 420,
  damping: 26,
  mass: 0.8,
} as const;

export const SPRING_PILL = {
  type: "spring",
  stiffness: 380,
  damping: 32,
} as const;

export const SPRING_SCROLL = {
  stiffness: 150,
  damping: 30,
  mass: 0.45,
} as const;

export const SPRING_TILT = { stiffness: 220, damping: 22 } as const;

export const LAYOUT_TRANSITION = {
  layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
} as const;

export const HOVER_LIFT = { y: -6 } as const;

export function wrapValue(
  minimum: number,
  maximum: number,
  value: number,
): number {
  const range = maximum - minimum;

  return ((((value - minimum) % range) + range) % range) + minimum;
}
