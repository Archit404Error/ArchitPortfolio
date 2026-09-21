"use client";

import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  REVEAL_VIEWPORT,
  SPRING_PILL,
  SPRING_POP,
  SPRING_SCROLL,
} from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience, type Experience as Role } from "@/content/experience";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";

const timelineNodeVariants: Variants = {
  hidden: { scale: 0, rotate: -20, opacity: 0 },
  show: { scale: 1, rotate: 0, opacity: 1, transition: SPRING_POP },
};

const roleCardVariants: Variants = {
  hidden: { opacity: 0, x: 56 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      ease: EASE_OUT_ANIMATION,
      delay: 0.08,
    },
  },
};

const bulletListVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};

const bulletVariants: Variants = {
  hidden: { opacity: 0, x: 12 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.base,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const getRoleId = (role: Role) =>
  `role-${`${role.organization}-${role.title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

function TimelineEntry({
  role,
  index,
  onActive,
}: {
  role: Role;
  index: number;
  onActive: (index: number) => void;
}) {
  const entryRef = useRef<HTMLLIElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isCurrent = role.endDate === "Present";
  const isActive = useInView(entryRef, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isActive) onActive(index);
  }, [isActive, index, onActive]);

  return (
    <motion.li
      ref={entryRef}
      id={getRoleId(role)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ ...REVEAL_VIEWPORT, once: true }}
      variants={{ hidden: {}, show: {} }}
      className="relative scroll-mt-32 pb-12 pl-16 last:pb-0 sm:pl-20"
    >
      <motion.span
        variants={timelineNodeVariants}
        className="absolute left-0 top-0 grid size-12 place-items-center overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-ink-200 sm:size-14"
      >
        <Image
          src={role.image}
          alt=""
          width={56}
          height={56}
          className={`size-full object-cover ${role.image.endsWith(".svg") && role.organization.startsWith("Stamp") ? "p-2" : ""}`}
        />
      </motion.span>

      <motion.article
        variants={roleCardVariants}
        className="group relative -mx-4 rounded-[var(--radius-card-lg)] px-4 py-1 transition-colors duration-300 hover:bg-surface/70 sm:-mx-6 sm:px-6"
      >
        <header className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h3 className="font-serif text-2xl leading-tight text-ink-900 sm:text-[1.75rem]">
              {role.title}
            </h3>
            <p className="mt-1 font-medium text-brand-700">
              {role.organization}
            </p>
          </div>
          <p className="inline-flex shrink-0 items-center gap-2 font-mono text-xs text-ink-500 tabular-nums">
            {isCurrent && (
              <span
                className="size-1.5 rounded-full bg-brand-600"
                aria-hidden="true"
              />
            )}
            {role.startDate}
            <span aria-hidden="true">–</span>
            <span className="sr-only">to</span>
            {role.endDate}
          </p>
        </header>
        <motion.ul
          variants={bulletListVariants}
          className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-ink-600"
        >
          {role.description.map((description) => (
            <motion.li
              key={description}
              variants={bulletVariants}
              className="flex gap-3"
            >
              <span
                className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand-300"
                aria-hidden="true"
              />
              <span className="text-pretty">{description}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.article>
    </motion.li>
  );
}

export function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, SPRING_SCROLL);

  const scrollToRole = (
    event: MouseEvent<HTMLAnchorElement>,
    roleId: string,
  ) => {
    const roleElement = document.getElementById(roleId);
    if (!roleElement) return;

    event.preventDefault();
    roleElement.scrollIntoView({
      block: "center",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(window.history.state, "", `#${roleId}`);
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-24 overflow-x-clip bg-paper py-24 sm:py-28 lg:py-32"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="experience-heading"
                title="Where I’ve worked."
                description="From YC-backed founder to engineer at Stripe and Apple: the teams and problems that shaped how I build."
              />
              <Reveal delay={0.2} className="mt-10 hidden lg:block">
                <nav aria-label="Jump to a role">
                  <ol className="relative border-l border-ink-200 font-mono text-sm">
                    {experience.map((role, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <li
                          key={role.organization + role.title}
                          className="relative"
                        >
                          {isActive && (
                            <motion.span
                              layoutId="experience-active"
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : SPRING_PILL
                              }
                              className="absolute -left-px top-0 h-full w-0.5 rounded-full bg-brand-600"
                              aria-hidden="true"
                            />
                          )}
                          <a
                            href={`#${getRoleId(role)}`}
                            onClick={(event) =>
                              scrollToRole(event, getRoleId(role))
                            }
                            aria-current={isActive ? "true" : undefined}
                            className={`group/rail flex items-baseline gap-2 truncate rounded-r-lg py-1.5 pl-4 pr-3 transition-colors duration-300 hover:bg-surface hover:text-ink-900 ${
                              isActive ? "text-ink-900" : "text-ink-500"
                            }`}
                          >
                            <span
                              className={`tabular-nums transition-colors ${
                                isActive
                                  ? "text-brand-600"
                                  : "text-ink-300 group-hover/rail:text-brand-500"
                              }`}
                            >
                              {role.startDate.slice(-4)}
                            </span>
                            <span className="truncate">
                              {role.organization}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </Reveal>
            </div>
          </div>

          <ol ref={listRef} className="relative lg:col-span-8">
            <div
              className="absolute bottom-6 left-6 top-6 w-px bg-ink-200 sm:left-7"
              aria-hidden="true"
            />
            <motion.div
              style={prefersReducedMotion ? undefined : { scaleY: lineScale }}
              className="absolute bottom-6 left-6 top-6 w-px origin-top bg-gradient-to-b from-brand-600 via-brand-500 to-brand-300 shadow-[0_0_12px_rgb(0_82_255/0.45)] sm:left-7"
              aria-hidden="true"
            />
            {experience.map((role, index) => (
              <TimelineEntry
                key={role.organization + role.title}
                role={role}
                index={index}
                onActive={setActiveIndex}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
