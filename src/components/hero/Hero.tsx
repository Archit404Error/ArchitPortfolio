"use client";

import { Terminal } from "@/components/terminal/Terminal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { button } from "@/components/ui/buttons";
import {
  ANIMATION_DURATIONS,
  ANIMATION_EASING,
  EASE_OUT_ANIMATION,
  STAGGER_INTERVALS,
} from "@/components/ui/motion";
import { SplitText } from "@/components/ui/SplitText";
import { profile } from "@/content/profile";
import { ArrowDown, Mail } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { CodeField } from "./CodeField";

const socials = [
  { href: profile.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.socials.email, label: "Email", Icon: Mail },
];

const entranceVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const headlineVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_INTERVALS.base } },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const terminalScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const terminalOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const getScrollStyle = <T extends object>(style: T) =>
    prefersReducedMotion ? undefined : style;

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-paper"
    >
      <motion.div
        style={getScrollStyle({ opacity: fieldOpacity, y: fieldY })}
        className="absolute inset-0 -z-10 opacity-75 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_85%,transparent)] lg:opacity-90"
        aria-hidden="true"
      >
        <CodeField />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_45%_at_50%_34%,rgb(250_247_241/0.7)_0%,transparent_75%)] lg:bg-none"
        aria-hidden="true"
      />

      <div className="container-page relative flex flex-1 flex-col justify-center pb-24 pt-28 sm:pt-32 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <motion.div
            style={getScrollStyle({ y: copyY, opacity: copyOpacity })}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: STAGGER_INTERVALS.loose,
                  delayChildren: 0.15,
                },
              },
            }}
            data-codefield-shield
            className="relative isolate lg:col-span-6 lg:max-w-[34rem] xl:col-span-6"
          >
            <div
              className="pointer-events-none absolute -inset-x-5 -inset-y-5 -z-10 rounded-[2.5rem] bg-paper blur-lg sm:-inset-x-6 sm:-inset-y-6"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -inset-x-9 -inset-y-9 -z-10 rounded-[3rem] bg-paper/70 blur-2xl sm:-inset-x-12 sm:-inset-y-10"
              aria-hidden="true"
            />
            <motion.div variants={entranceVariants}>
              <a
                href={profile.links.stamp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-surface/85 py-1 pl-1 pr-4 text-sm font-medium text-ink-700 shadow-[0_1px_0_rgb(255_255_255)_inset,0_6px_20px_-12px_rgb(43_36_24/0.35)] backdrop-blur transition-[border-color,color] hover:border-brand-300 hover:text-brand-700"
              >
                <Image
                  src={profile.headshot}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 rounded-full object-cover ring-2 ring-surface"
                  priority
                />
                Building Stamp
                <span className="text-ink-400">(YC W25)</span>
              </a>
            </motion.div>

            <motion.h1
              variants={headlineVariants}
              className="mt-7 font-serif text-balance text-ink-900"
            >
              <SplitText
                text="Archit Mehta"
                className="block text-[3.4rem] font-[450] leading-[0.98] tracking-[-0.025em] sm:text-[4.5rem] lg:text-[4.75rem] xl:text-[5.5rem]"
              />
              <SplitText
                text="Founder & Engineer."
                className="mt-2 block text-[1.85rem] font-normal italic leading-[1.1] tracking-[-0.01em] text-ink-500 sm:mt-3 sm:text-[2.35rem] lg:text-[2.6rem]"
              />
            </motion.h1>

            <motion.p
              variants={entranceVariants}
              className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl"
            >
              I’m a tech entrepreneur building{" "}
              <a
                href={profile.links.stamp}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink-900 underline decoration-brand-300 decoration-2 underline-offset-[5px] transition-colors hover:text-brand-700 hover:decoration-brand-600"
              >
                Stamp
              </a>
              , the AI Secretary. Previously a software engineer at Stripe and
              Apple; interested in working at the technical frontier.
            </motion.p>

            <motion.div
              variants={entranceVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#about"
                className={`${button.primary} ${button.sizes.lg}`}
              >
                See my work
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className={`${button.secondary} ${button.sizes.lg}`}
              >
                Get in touch
              </a>
            </motion.div>

            <motion.ul
              variants={entranceVariants}
              className="mt-8 flex items-center gap-1.5"
              aria-label="Social links"
            >
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="group flex size-10 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li className="ml-1 hidden rounded-md bg-surface/80 px-2 py-1 font-mono text-xs text-ink-500 backdrop-blur-sm sm:block">
                {profile.email}
              </li>
            </motion.ul>
          </motion.div>

          <motion.div
            style={getScrollStyle({
              y: terminalY,
              scale: terminalScale,
              opacity: terminalOpacity,
            })}
            className="relative lg:col-span-6 xl:col-span-6"
          >
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 40, scale: 0.96, rotateX: 8 }
              }
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{
                duration: ANIMATION_DURATIONS.long,
                delay: 0.35,
                ease: ANIMATION_EASING,
              }}
              style={{ transformPerspective: 1200 }}
            >
              <div
                className="pointer-events-none absolute -inset-4 -z-20 rounded-[2.5rem] bg-paper/45 blur-xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgb(0_82_255/0.16),transparent)] blur-2xl"
                aria-hidden="true"
              />
              <Terminal className="h-[440px] sm:h-[500px] lg:h-[520px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={getScrollStyle({ opacity: cueOpacity })}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.a
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION_DURATIONS.slow,
            delay: 1.1,
            ease: ANIMATION_EASING,
          }}
          href="#about"
          aria-label="Scroll to about section"
          data-codefield-shield
          className="inline-flex items-center gap-2.5 rounded-full border border-ink-200/80 bg-paper/90 py-2 pl-4 pr-2.5 text-ink-500 shadow-[0_1px_0_rgb(255_255_255)_inset,0_8px_24px_-14px_rgb(43_36_24/0.4)] backdrop-blur transition-[color,border-color] hover:border-brand-300 hover:text-brand-600"
        >
          <span className="font-serif text-sm italic">Scroll</span>
          <span className="relative h-7 w-4 rounded-full border border-current">
            <span className="absolute left-1/2 top-1.5 size-1 -translate-x-1/2 animate-scroll-hint rounded-full bg-current" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
