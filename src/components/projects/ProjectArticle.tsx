"use client";

import { Blocks, Globe, Package, Smartphone, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/content/projects";
import { GithubIcon } from "@/components/ui/BrandIcons";
import {
  ART_BACKGROUND,
  LaptopVideo,
  LinkPill,
} from "@/components/sections/ProjectCard";
import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  LAYOUT_TRANSITION,
} from "@/components/ui/motion";
import { TypewriterBlocks } from "./Typewriter";

function subscribe() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

function ArticleHeroMedia({ project }: { project: Project }) {
  const { image, video, title, device } = project;

  if (video) {
    return (
      <LaptopVideo
        src={video}
        poster={image}
        title={title}
        sizes="100vw"
        priority
        className="px-6 py-10 sm:px-12 sm:py-14"
      />
    );
  }

  return (
    <Image
      src={image}
      alt={`${title} screenshot`}
      fill
      sizes="100vw"
      priority
      className={`object-contain drop-shadow-[0_28px_60px_rgb(43_36_24/0.24)] ${
        device === "phone"
          ? "p-8 sm:p-12 md:p-14"
          : "px-8 pt-10 pb-8 sm:px-16 sm:pt-14 sm:pb-12"
      }`}
    />
  );
}

interface ProjectArticleProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectArticle({ project, onClose }: ProjectArticleProps) {
  const prefersReducedMotion = useReducedMotion();
  const titleId = useId();
  const isMounted = useIsClient();

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const articleBlocks = useMemo(() => {
    if (!project) return [];

    const contentBlocks: {
      key: string;
      text: string;
      as?: "p" | "h2";
      className?: string;
    }[] = [];

    project.article.lead.forEach((paragraph, index) => {
      contentBlocks.push({
        key: `lead-${index}`,
        text: paragraph,
        as: "p",
        className:
          "font-serif text-pretty text-[1.35rem] leading-[1.45] text-ink-800 sm:text-[1.5rem]" +
          (index > 0 ? " mt-5" : ""),
      });
    });

    project.article.sections.forEach((section, sectionIndex) => {
      contentBlocks.push({
        key: `h-${sectionIndex}`,
        text: section.heading,
        as: "h2",
        className:
          "mt-12 font-serif text-3xl leading-tight tracking-[-0.015em] text-ink-900 sm:mt-14 sm:text-[2.25rem]",
      });

      section.paragraphs.forEach((paragraph, paragraphIndex) => {
        contentBlocks.push({
          key: `s-${sectionIndex}-${paragraphIndex}`,
          text: paragraph,
          as: "p",
          className:
            "mt-4 text-pretty text-base leading-relaxed text-ink-600 sm:text-lg",
        });
      });
    });

    return contentBlocks;
  }, [project]);

  if (!isMounted) return null;

  const articleLayoutTransition = {
    layout: {
      duration: prefersReducedMotion ? 0 : LAYOUT_TRANSITION.layout.duration,
      ease: LAYOUT_TRANSITION.layout.ease,
    },
  };

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="fixed inset-0 z-[80]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.button
            type="button"
            aria-label="Close article"
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
            onClick={onClose}
          />

          <div
            className="absolute inset-0 flex items-start justify-center overflow-y-auto overscroll-contain"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <motion.article
              layoutId={`project-card-${project.slug}`}
              className="relative flex min-h-full w-full flex-col overflow-hidden bg-paper shadow-[0_40px_120px_-24px_rgb(7_13_26/0.55)]"
              style={{ borderRadius: 0 }}
              transition={articleLayoutTransition}
            >
              <motion.button
                type="button"
                onClick={onClose}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.25,
                  duration: 0.25,
                }}
                className="absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-ink-950/55 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-ink-950/75 sm:right-6 sm:top-6"
                aria-label="Close project article"
              >
                <X className="size-5" />
              </motion.button>

              <motion.div
                layoutId={`project-image-${project.slug}`}
                className={`group relative z-10 h-[min(52vh,420px)] w-full shrink-0 overflow-hidden sm:h-[min(56vh,520px)] ${ART_BACKGROUND}`}
                transition={articleLayoutTransition}
              >
                <div
                  className="bg-grid-faint absolute inset-0 opacity-70 [mask-image:radial-gradient(closest-side,black,transparent)]"
                  aria-hidden="true"
                />
                <ArticleHeroMedia project={project} />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent"
                  aria-hidden="true"
                />
              </motion.div>

              <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-2 sm:px-8 sm:pb-24">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.28,
                    duration: ANIMATION_DURATIONS.base,
                    ease: EASE_OUT_ANIMATION,
                  }}
                >
                  {project.article.kicker && (
                    <p className="font-serif text-lg italic text-ink-500">
                      {project.article.kicker}
                    </p>
                  )}
                  <h1
                    id={titleId}
                    className="mt-2 font-serif text-balance text-4xl font-[450] leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-5xl md:text-[3.5rem]"
                  >
                    {project.title}
                  </h1>

                  {project.impact && (
                    <p className="mt-5 font-serif text-lg italic leading-snug text-ink-700">
                      {project.impact}
                    </p>
                  )}

                  {project.tech && (
                    <ul
                      className="mt-5 flex flex-wrap gap-1.5"
                      aria-label="Technologies"
                    >
                      {project.tech.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-md border border-ink-200/80 px-2 py-0.5 font-mono text-[11px] text-ink-500"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>

                <TypewriterBlocks
                  key={project.slug}
                  blocks={articleBlocks}
                  delayMilliseconds={prefersReducedMotion ? 0 : 360}
                  millisecondsPerCharacter={1.1}
                  gapMilliseconds={40}
                  className="mt-10"
                />

                {(project.url ||
                  project.appStore ||
                  project.marketplace ||
                  project.npm ||
                  project.github) && (
                  <motion.div
                    className="mt-12 flex flex-wrap gap-2 border-t border-ink-200 pt-8"
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.9,
                      duration: ANIMATION_DURATIONS.base,
                    }}
                  >
                    {project.url && (
                      <LinkPill
                        href={project.url}
                        label="Website"
                        Icon={Globe}
                      />
                    )}
                    {project.appStore && (
                      <LinkPill
                        href={project.appStore}
                        label="App Store"
                        Icon={Smartphone}
                      />
                    )}
                    {project.marketplace && (
                      <LinkPill
                        href={project.marketplace}
                        label="VS Code Marketplace"
                        Icon={Blocks}
                      />
                    )}
                    {project.npm && (
                      <LinkPill href={project.npm} label="npm" Icon={Package} />
                    )}
                    {project.github && (
                      <LinkPill
                        href={project.github}
                        label="GitHub"
                        Icon={GithubIcon}
                      />
                    )}
                  </motion.div>
                )}
              </div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
