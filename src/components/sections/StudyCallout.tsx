"use client";

import { Spine } from "@/components/study/Bookshelf";
import { button } from "@/components/ui/buttons";
import { REVEAL_VIEWPORT, STAGGER_INTERVALS } from "@/components/ui/motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { bookshelf, hasStudyContent, researchQuestions } from "@/content/study";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function StudyCallout() {
  const prefersReducedMotion = useReducedMotion();
  if (!hasStudyContent) return null;

  const previewBooks = bookshelf.slice(0, 5);
  const featuredQuestion = researchQuestions[0];

  return (
    <section
      id="study"
      aria-labelledby="study-heading"
      className="relative overflow-hidden border-t border-ink-200/60 bg-paper py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-brand-600/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <RevealGroup stagger={STAGGER_INTERVALS.base} className="lg:col-span-6">
          <RevealItem>
            <p className="font-serif text-lg italic text-ink-500">
              After hours
            </p>
          </RevealItem>
          <RevealItem>
            <h2
              id="study-heading"
              className="mt-2 font-serif text-balance text-[2.5rem] font-[450] leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[3.5rem]"
            >
              The Study: A Peek Into My Brain.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-600 sm:text-lg">
              Check out the Study to learn about the best books I’ve read, the
              research questions I’m currently pondeirng, and notes from the
              academic side of my life.
            </p>
          </RevealItem>
          {featuredQuestion && (
            <RevealItem>
              <blockquote className="mt-7 max-w-xl border-l border-ink-300 pl-5 font-serif text-xl italic leading-[1.35] text-ink-700">
                {featuredQuestion.question}
              </blockquote>
            </RevealItem>
          )}
          <RevealItem>
            <Link
              href="/study"
              className={`${button.primary} ${button.sizes.lg} mt-9`}
            >
              Visit the Study
            </Link>
          </RevealItem>
        </RevealGroup>

        {previewBooks.length > 0 && (
          <Reveal from="scale" className="lg:col-span-6">
            <Link
              href="/study#bookshelf"
              aria-label="Open the bookshelf in the Study"
              className="group block rounded-[var(--radius-card-lg)] outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            >
              <motion.div
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="show"
                viewport={{ ...REVEAL_VIEWPORT, once: true }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: STAGGER_INTERVALS.tight,
                      delayChildren: 0.2,
                    },
                  },
                }}
                className="relative mx-auto max-w-md transition-transform duration-500 ease-out group-hover:-translate-y-1"
              >
                <div className="flex items-end justify-center gap-1.5 px-6 pt-4 sm:gap-2">
                  {previewBooks.map((book) => (
                    <Spine
                      key={book.title}
                      book={book}
                      compact
                      interactive={false}
                    />
                  ))}
                </div>
                <div
                  className="h-2 rounded-b-sm bg-ink-300 shadow-[0_14px_24px_-12px_rgb(43_36_24/0.55)]"
                  aria-hidden="true"
                />
                <p className="mt-5 text-center font-serif text-base italic text-ink-500 transition-colors group-hover:text-brand-700">
                  Browse the shelf
                </p>
              </motion.div>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
