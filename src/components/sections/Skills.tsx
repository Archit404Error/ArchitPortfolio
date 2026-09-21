"use client";

import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  REVEAL_VIEWPORT,
  SPRING_POP,
  STAGGER_INTERVALS,
} from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/content/skills";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { LogoMarquee } from "./LogoMarquee";

const allSkills = skillGroups.flatMap((group) => group.skills);

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      ease: EASE_OUT_ANIMATION,
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      duration: ANIMATION_DURATIONS.slow + 0.1,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const skillVariants: Variants = {
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

const iconVariants: Variants = {
  hidden: { scale: 0.4, rotate: -25, opacity: 0 },
  show: { scale: 1, rotate: 0, opacity: 1, transition: SPRING_POP },
};

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-24 overflow-x-clip border-t border-ink-200/60 bg-paper-2/60 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="skills-heading"
          title="Areas of expertise."
          description="Across the stack, from model training to application building, these are the tools I’ve leveraged to build production ready solutions."
          align="center"
        />
      </div>

      <Reveal delay={0.2} className="mt-12 lg:mt-14">
        <LogoMarquee items={allSkills} />
      </Reveal>

      <div className="container-page">
        <motion.ul
          className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ ...REVEAL_VIEWPORT, once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: STAGGER_INTERVALS.base },
            },
          }}
        >
          {skillGroups.map((group, groupIndex) => {
            const isWide = groupIndex === skillGroups.length - 1;

            return (
              <motion.li
                key={group.skillType}
                variants={groupVariants}
                className={`relative pt-5 ${
                  isWide ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <motion.span
                  variants={ruleVariants}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-ink-300"
                  aria-hidden="true"
                />
                <h3 className="font-serif text-2xl italic leading-none text-ink-900">
                  {group.skillType}
                </h3>
                <ul
                  className={`mt-5 grid gap-1 ${
                    isWide ? "sm:grid-cols-2 lg:grid-cols-4" : ""
                  }`}
                >
                  {group.skills.map((skill) => (
                    <motion.li
                      key={skill.name}
                      variants={skillVariants}
                      className={`group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-300 hover:bg-surface ${
                        isWide ? "sm:mr-6" : ""
                      }`}
                    >
                      <motion.span
                        variants={iconVariants}
                        className="grid size-9 shrink-0 place-items-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                      >
                        <Image
                          src={skill.imageUrl}
                          alt=""
                          width={36}
                          height={36}
                          className="size-7 object-contain"
                        />
                      </motion.span>
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-medium text-ink-900">
                          {skill.name}
                        </p>
                        <p className="truncate text-xs text-ink-500">
                          {skill.subtitle}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
