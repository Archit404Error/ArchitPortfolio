"use client";

import { GithubIcon } from "@/components/ui/BrandIcons";
import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  HOVER_LIFT,
  LAYOUT_TRANSITION,
  REVEAL_VIEWPORT,
  SPRING_POP,
  SPRING_TILT,
  STAGGER_INTERVALS,
} from "@/components/ui/motion";
import type { Project } from "@/content/projects";
import {
  Blocks,
  Globe,
  Maximize2,
  Package,
  Pause,
  Play,
  Smartphone,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import Image from "next/image";
import {
  type ComponentType,
  type PointerEvent,
  type SVGProps,
  useRef,
  useState,
} from "react";

const MAX_TILT_DEGREES = 6;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.slow + 0.1,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const artworkVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.long,
      ease: EASE_OUT_ANIMATION,
      delay: 0.15,
    },
  },
};

const cardBodyVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const contentLineVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.base,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: SPRING_POP },
};

export const ART_BACKGROUND =
  "bg-[radial-gradient(120%_100%_at_50%_0%,#eef3ff_0%,#f5f1ea_60%,#fffdf9_100%)]";

export function LinkPill({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative z-30 inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-200 bg-surface px-3.5 text-sm font-medium text-ink-700 transition-[border-color,background-color,color] hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}

export function LaptopVideo({
  src,
  poster,
  title,
  featured,
  sizes,
  className,
  priority,
}: {
  src: string;
  poster: string;
  title: string;
  featured?: boolean;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        className ?? (featured ? "p-8 md:p-10" : "px-6 pt-8 pb-5")
      }`}
      style={{ containerType: "size" }}
    >
      <div
        className="relative aspect-[1000/546] w-[min(100%,calc(100cqh*1000/546))] drop-shadow-[0_24px_40px_rgb(43_36_24/0.2)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ containerType: "inline-size" }}
      >
        <div className="relative mx-auto w-[82cqw] rounded-t-[2.6cqw] bg-[linear-gradient(180deg,#1a1c21_0%,#0f1115_100%)] p-[2cqw] pb-[2.2cqw] shadow-[inset_0_0_0_0.15cqw_rgb(255_255_255/0.08)]">
          <span
            className="absolute left-1/2 top-[0.8cqw] size-[0.6cqw] -translate-x-1/2 rounded-full bg-[#2a2f3a] shadow-[inset_0_0_0_0.1cqw_#3c4350]"
            aria-hidden="true"
          />
          <div className="relative h-[47.8cqw] overflow-hidden rounded-[1cqw] bg-[#0d1117]">
            {prefersReducedMotion ? (
              <Image
                src={poster}
                alt={`${title} screenshot`}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover object-left-top"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={src}
                  poster={poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${title} demo`}
                  className="absolute inset-0 size-full object-cover object-left-top"
                />
                <button
                  type="button"
                  onClick={togglePlayback}
                  aria-pressed={!isPlaying}
                  aria-label={
                    isPlaying ? `Pause ${title} demo` : `Play ${title} demo`
                  }
                  className="absolute bottom-[1.5cqw] right-[1.5cqw] z-30 grid size-[4.5cqw] min-h-7 min-w-7 place-items-center rounded-full bg-ink-950/70 text-white/90 opacity-0 backdrop-blur transition-opacity duration-300 hover:bg-ink-950/90 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
                >
                  {isPlaying ? (
                    <Pause
                      className="size-[45%] min-h-3 min-w-3"
                      aria-hidden="true"
                    />
                  ) : (
                    <Play
                      className="size-[45%] min-h-3 min-w-3"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="relative h-[2.6cqw] w-full rounded-b-[2.2cqw] bg-[linear-gradient(180deg,#2a2d33_0%,#141619_55%,#0c0d10_100%)] shadow-[inset_0_0.1cqw_0_rgb(255_255_255/0.18)]">
          <span
            className="absolute left-1/2 top-0 h-[0.9cqw] w-[17cqw] -translate-x-1/2 rounded-b-[0.8cqw] bg-[#0a0b0d]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  featured = false,
  reverse = false,
  active,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  reverse?: boolean;
  active: boolean;
  onOpen: (project: Project) => void;
}) {
  const {
    slug,
    title,
    description,
    image,
    video,
    device,
    url,
    appStore,
    marketplace,
    npm,
    github,
    impact,
    tech,
  } = project;
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLLIElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [featured ? 60 : 40, featured ? -60 : -40],
  );

  const tiltX = useSpring(useMotionValue(0), SPRING_TILT);
  const tiltY = useSpring(useMotionValue(0), SPRING_TILT);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useTransform(
    [glowX, glowY],
    ([horizontalPosition, verticalPosition]) =>
      `radial-gradient(420px circle at ${horizontalPosition}% ${verticalPosition}%, rgb(0 82 255 / 0.12), transparent 60%)`,
  );

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    if (prefersReducedMotion || active || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontalRatio = (event.clientX - bounds.left) / bounds.width;
    const verticalRatio = (event.clientY - bounds.top) / bounds.height;

    tiltY.set((horizontalRatio - 0.5) * MAX_TILT_DEGREES * 2);
    tiltX.set((0.5 - verticalRatio) * MAX_TILT_DEGREES * 2);
    glowX.set(horizontalRatio * 100);
    glowY.set(verticalRatio * 100);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const openProjectArticle = () => {
    // Reset tilt before Motion measures the shared layout.
    tiltX.jump(0);
    tiltY.jump(0);
    onOpen(project);
  };

  const sizes = featured
    ? "(min-width: 768px) 55vw, 100vw"
    : "(min-width: 768px) 50vw, 100vw";

  return (
    <motion.li
      ref={cardRef}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ ...REVEAL_VIEWPORT, once: true }}
      variants={cardVariants}
      whileHover={prefersReducedMotion || active ? undefined : HOVER_LIFT}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
      className={`group ${featured ? "md:col-span-2" : ""}`}
    >
      <motion.article
        layoutId={`project-card-${slug}`}
        aria-labelledby={`project-${slug}-title`}
        transition={LAYOUT_TRANSITION}
        style={{ borderRadius: 28 }}
        className={`relative flex h-full flex-col overflow-hidden border border-ink-200/70 bg-surface shadow-card transition-[box-shadow,border-color] duration-300 hover:border-brand-200 hover:shadow-card-hover ${
          featured ? (reverse ? "md:flex-row-reverse" : "md:flex-row") : ""
        } ${active ? "pointer-events-none" : ""}`}
      >
        <motion.div
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <motion.div
          layoutId={`project-image-${slug}`}
          transition={LAYOUT_TRANSITION}
          className={`relative overflow-hidden ${ART_BACKGROUND} ${
            featured
              ? "h-[280px] shrink-0 md:h-auto md:min-h-[420px] md:w-[55%]"
              : device === "phone"
                ? "h-72 sm:h-80"
                : "h-64 sm:h-72"
          }`}
        >
          <div
            className="bg-grid-faint absolute inset-0 opacity-70 [mask-image:radial-gradient(closest-side,black,transparent)]"
            aria-hidden="true"
          />
          <motion.div variants={artworkVariants} className="absolute inset-0">
            <motion.div
              style={prefersReducedMotion ? undefined : { y: parallaxY }}
              className="absolute inset-0"
            >
              {video ? (
                <LaptopVideo
                  src={video}
                  poster={image}
                  title={title}
                  featured={featured}
                  sizes={sizes}
                />
              ) : (
                <Image
                  src={image}
                  alt={`${title} screenshot`}
                  fill
                  sizes={sizes}
                  className={`object-contain drop-shadow-[0_24px_40px_rgb(43_36_24/0.2)] transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                    featured
                      ? "p-8 md:p-10"
                      : device === "phone"
                        ? "p-5 pt-7"
                        : "px-6 pt-8 pb-5"
                  }`}
                />
              )}
            </motion.div>
          </motion.div>

          {!active && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-4 z-10 inline-flex -translate-y-1 items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1.5 text-xs font-medium text-paper opacity-0 shadow-[0_8px_20px_-8px_rgb(7_13_26/0.6)] backdrop-blur-sm transition-[opacity,translate] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-has-[button:focus-visible]:translate-y-0 group-has-[button:focus-visible]:opacity-100"
            >
              <Maximize2 className="size-3.5" aria-hidden="true" />
              Click to expand
            </span>
          )}
        </motion.div>

        <div
          aria-hidden={active}
          style={{ opacity: active ? 0 : 1 }}
          className={`flex flex-1 flex-col p-6 transition-opacity duration-200 sm:p-7 ${
            featured ? "md:p-10" : ""
          }`}
        >
          <motion.div
            variants={cardBodyVariants}
            className="flex flex-1 flex-col"
          >
            <motion.h3
              id={`project-${slug}-title`}
              variants={contentLineVariants}
              className={`font-serif text-balance leading-[1.05] tracking-[-0.015em] text-ink-900 ${
                featured
                  ? "text-3xl sm:text-[2.5rem]"
                  : "text-2xl sm:text-[1.85rem]"
              }`}
            >
              {title}
            </motion.h3>

            <motion.p
              variants={contentLineVariants}
              className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-600 sm:text-base"
            >
              {description}
            </motion.p>

            {impact && (
              <motion.p
                variants={contentLineVariants}
                className="mt-4 font-serif text-[1.05rem] italic leading-snug text-ink-700"
              >
                {impact}
              </motion.p>
            )}

            {tech && (
              <motion.ul
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: STAGGER_INTERVALS.tight,
                    },
                  },
                }}
                className="mt-4 flex flex-wrap gap-1.5"
                aria-label="Technologies"
              >
                {tech.map((technology) => (
                  <motion.li
                    key={technology}
                    variants={chipVariants}
                    className="rounded-md border border-ink-200/80 px-2 py-0.5 font-mono text-[11px] text-ink-500"
                  >
                    {technology}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <motion.div
              variants={contentLineVariants}
              className="mt-auto flex flex-wrap items-center gap-2 pt-6"
            >
              {url && <LinkPill href={url} label="Website" Icon={Globe} />}
              {appStore && (
                <LinkPill href={appStore} label="App Store" Icon={Smartphone} />
              )}
              {marketplace && (
                <LinkPill
                  href={marketplace}
                  label="VS Code Marketplace"
                  Icon={Blocks}
                />
              )}
              {npm && <LinkPill href={npm} label="npm" Icon={Package} />}
              {github && (
                <LinkPill href={github} label="GitHub" Icon={GithubIcon} />
              )}
              <span
                className="ml-auto text-sm font-medium text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 transition-colors group-hover:decoration-brand-600"
                aria-hidden="true"
              >
                Read the story
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Keeps the link pills as separate interactive controls. */}
        <button
          type="button"
          data-open
          onClick={openProjectArticle}
          aria-label={`Read the story of ${title}`}
          aria-expanded={active}
          className="absolute inset-0 z-20 cursor-pointer rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-inset"
        />
      </motion.article>
    </motion.li>
  );
}
