"use client";

import { CountUp } from "@/components/ui/CountUp";
import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  REVEAL_VIEWPORT,
  STAGGER_INTERVALS,
} from "@/components/ui/motion";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { affiliations, introParagraphs, profile } from "@/content/profile";
import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";

type Stat = { label: string } & (
  | { to: number; prefix?: string; suffix?: string; decimals?: number }
  | { text: string }
);

const stats: Stat[] = [
  { text: "YC W25", label: "Stamp, the AI Secretary" },
  {
    to: 10,
    decimals: 1,
    suffix: "M+",
    label: "emails processed through Stamp",
  },
  {
    to: 1,
    prefix: "$",
    suffix: "M+",
    decimals: 1,
    label: "saved annually at Stripe",
  },
  { to: 100_000, suffix: "+", label: "users across my other apps" },
];

const glance = [
  { Icon: MapPin, text: profile.location },
  { Icon: GraduationCap, text: "CS + Applied Math, Cornell" },
];

const portrait: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0% round 1.75rem)", scale: 1.08 },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.long,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const frame: Variants = {
  hidden: { opacity: 0, x: -12, y: -12 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      delay: 0.5,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const caption: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      delay: 0.7,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const statCell: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

const statRule: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      duration: ANIMATION_DURATIONS.slow + 0.1,
      delay: 0.2,
      ease: EASE_OUT_ANIMATION,
    },
  },
};

function Label({ children }: { children: string }) {
  return <p className="font-serif text-lg italic text-ink-500">{children}</p>;
}

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 border-t border-ink-200/60 bg-paper-2/60 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.div
            className="relative mx-auto max-w-sm lg:sticky lg:top-28 lg:mx-0"
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ ...REVEAL_VIEWPORT, once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <div
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-brand-600/[0.07] [mask-image:radial-gradient(closest-side,black,transparent)]"
              aria-hidden="true"
            />
            <motion.div
              variants={frame}
              className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-[1.75rem] border border-brand-200/80 bg-brand-50/70"
              aria-hidden="true"
            />
            <motion.div
              variants={portrait}
              className="relative overflow-hidden rounded-[1.75rem] bg-surface shadow-card ring-1 ring-ink-200/70"
            >
              <Image
                src={profile.headshot}
                alt="Archit Mehta smiling, wearing a black hoodie."
                width={640}
                height={640}
                sizes="(min-width: 1024px) 420px, 90vw"
                className="aspect-square w-full object-cover"
              />
              <div className="flex items-center justify-between gap-3 border-t border-ink-100 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-serif text-lg text-ink-900">
                    {profile.name}
                  </p>
                  <p className="truncate text-sm text-ink-500">
                    {profile.headline}
                  </p>
                </div>
                <a
                  href={profile.links.stamp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-700"
                >
                  stampmail.ai
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            <motion.ul
              variants={caption}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 font-mono text-xs text-ink-500"
              aria-label="At a glance"
            >
              {glance.map(({ Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon
                    className="size-3.5 text-brand-600"
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            id="about-heading"
            title="Hi, I’m Archit."
            titleMuted="Builder, founder, engineer."
          />

          <RevealGroup
            stagger={STAGGER_INTERVALS.loose}
            className="mt-9 space-y-5 text-pretty"
          >
            {introParagraphs.map((tokens, paragraphIndex) => (
              <RevealItem
                key={paragraphIndex}
                as="p"
                blur
                className={
                  paragraphIndex === 0
                    ? "font-serif text-[1.45rem] leading-[1.4] text-ink-800 sm:text-[1.6rem]"
                    : "text-[17px] leading-[1.75] text-ink-700 sm:text-lg"
                }
              >
                {tokens.map((token, tokenIndex) =>
                  typeof token === "string" ? (
                    token
                  ) : (
                    <a
                      key={tokenIndex}
                      href={token.href}
                      target={token.external ? "_blank" : undefined}
                      rel={token.external ? "noreferrer" : undefined}
                      className="font-medium text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-[4px] transition-colors hover:text-brand-600 hover:decoration-brand-600"
                    >
                      {token.text}
                    </a>
                  ),
                )}
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-14">
            <RevealGroup>
              <RevealItem>
                <Label>By the numbers</Label>
              </RevealItem>
            </RevealGroup>
            <motion.dl
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ ...REVEAL_VIEWPORT, once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09 } },
              }}
              className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statCell}
                  className="group relative pt-4"
                >
                  <motion.span
                    variants={statRule}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-ink-300 transition-colors duration-300 group-hover:bg-brand-600"
                    aria-hidden="true"
                  />
                  <dd className="order-first whitespace-nowrap font-serif text-[2.1rem] font-[450] leading-none tabular-nums tracking-[-0.02em] text-ink-900 transition-colors duration-300 group-hover:text-brand-600 sm:text-[2.35rem] lg:text-[2.5rem]">
                    {"text" in stat ? (
                      stat.text
                    ) : (
                      <CountUp
                        to={stat.to}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    )}
                  </dd>
                  <dt className="mt-2.5 text-sm leading-snug text-ink-500">
                    {stat.label}
                  </dt>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          <div className="mt-14">
            <RevealGroup>
              <RevealItem>
                <Label>Where I’ve been</Label>
              </RevealItem>
            </RevealGroup>
            <RevealGroup
              as="ul"
              stagger={0.09}
              className="ledger mt-4 border-y border-ink-200"
            >
              {affiliations.map((affiliation, index) => (
                <RevealItem
                  as="li"
                  key={affiliation.name}
                  from={index % 2 === 0 ? "left" : "right"}
                  distance={40}
                  className="group relative isolate flex items-start gap-4 py-4 before:absolute before:-inset-x-3 before:inset-y-0 before:-z-10 before:rounded-xl before:transition-colors before:duration-300 hover:before:bg-surface/80 sm:gap-5 sm:py-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                    <Image
                      src={affiliation.logo}
                      alt=""
                      width={44}
                      height={44}
                      className={`size-11 rounded-lg object-cover ${affiliation.name === "Stamp" ? "bg-surface p-1 ring-1 ring-ink-200/70" : ""}`}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink-900">
                      {affiliation.name}
                    </p>
                    <p className="mt-0.5 text-pretty text-[15px] leading-snug text-ink-600">
                      {affiliation.blurb}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
