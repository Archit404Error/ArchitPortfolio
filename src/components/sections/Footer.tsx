"use client";

import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { ArrowUp, Mail } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const socials = [
  { href: profile.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.socials.email, label: "Email", Icon: Mail },
];

interface FooterProps {
  variant?: "home" | "blog";
  topHref?: string;
  year: number;
}

export function Footer({ variant = "home", topHref, year }: FooterProps) {
  const prefix = variant === "blog" ? "/" : "";
  const navigationLinks = [
    { href: `${prefix}#about`, label: "About" },
    { href: `${prefix}#experience`, label: "Experience" },
    { href: `${prefix}#projects`, label: "Projects" },
    { href: `${prefix}#skills`, label: "Skills" },
    { href: `${prefix}#contact`, label: "Contact" },
    { href: "/study", label: "Study" },
    { href: "/blog", label: "Blog" },
    { href: profile.resume, label: "Resume", external: true },
  ];
  const resolvedTopHref = topHref ?? (variant === "blog" ? "/blog" : "#top");

  const prefersReducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-white/10 bg-ink-950 text-paper"
    >
      <div className="relative overflow-hidden">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: wordmarkY, opacity: wordmarkOpacity }
          }
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
          aria-hidden="true"
        >
          <span className="translate-y-[34%] select-none whitespace-nowrap font-serif text-[clamp(3.5rem,14vw,15rem)] italic leading-none tracking-[-0.04em] text-brand-400/[0.12]">
            Archit Mehta
          </span>
        </motion.div>

        <RevealGroup
          stagger={0.1}
          className="container-page relative flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between"
        >
          <RevealItem className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-brand-600 font-serif text-base italic text-white">
              AM
            </span>
            <div>
              <p className="font-serif text-lg text-paper">{profile.name}</p>
              <p className="text-sm text-ink-400">{profile.headline}</p>
            </div>
          </RevealItem>

          <RevealItem>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-300">
                {navigationLinks.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-brand-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-brand-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </RevealItem>

          <RevealItem>
            <ul className="flex items-center gap-1" aria-label="Social links">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/10 hover:text-brand-300"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={resolvedTopHref}
                  aria-label="Back to top"
                  className="group ml-1 grid size-10 place-items-center rounded-full border border-white/15 text-ink-300 transition-colors hover:border-brand-400 hover:bg-white/10 hover:text-brand-300"
                >
                  <ArrowUp
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 font-mono text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Archit Mehta. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4">
            <span>
              Set in Newsreader and Geist. Built with Next.js and Motion.
            </span>
            <a
              href="https://github.com/Archit404Error/NewPersonalWebsite"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-ink-700 underline-offset-4 transition-colors hover:text-brand-300 hover:decoration-brand-400"
            >
              View source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
