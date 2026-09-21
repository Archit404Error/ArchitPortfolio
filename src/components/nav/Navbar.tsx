"use client";

import { FileText, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { button } from "@/components/ui/buttons";
import { ANIMATION_DURATIONS, SPRING_PILL } from "@/components/ui/motion";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const sectionLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const routeLinks = [
  { href: "/study", label: "Study" },
  { href: "/blog", label: "Blog" },
];

interface NavbarProps {
  variant?: "home" | "blog";
}

const pillClass = (isActive: boolean) =>
  `relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
    isActive ? "text-brand-700" : "text-ink-600 hover:text-ink-900"
  }`;

export function Navbar({ variant = "home" }: NavbarProps) {
  const pathname = usePathname();
  const isOffHome = variant === "blog" || pathname !== "/";
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeSectionId = isOffHome ? null : activeSection;

  const navigationLinks = sectionLinks.map((link) => ({
    ...link,
    href: isOffHome ? `/${link.href}` : link.href,
  }));
  const isActiveRoute = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOffHome) return;

    const sections = sectionLinks
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (mostVisibleEntry) {
          setActiveSection(mostVisibleEntry.target.id);
        } else if (window.scrollY < window.innerHeight * 0.6) {
          setActiveSection(null);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isOffHome]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && setIsMenuOpen(false);

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const activePill = (
    <motion.span
      layoutId="nav-active"
      className="absolute inset-0 -z-10 rounded-full bg-brand-50"
      transition={prefersReducedMotion ? { duration: 0 } : SPRING_PILL}
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || isMenuOpen
          ? "border-b border-ink-200/70 bg-paper/85 shadow-[0_1px_0_rgb(255_255_255/0.5)_inset,0_10px_30px_-20px_rgb(43_36_24/0.3)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <ScrollProgress className={scrolled ? "opacity-100" : "opacity-0"} />
      <nav
        className="container-page flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]"
        aria-label="Primary"
      >
        <Link
          href={isOffHome ? "/" : "#top"}
          className="group flex items-center gap-2.5 rounded-full text-ink-900"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-brand-600 font-serif text-[15px] italic text-white shadow-[0_6px_16px_-6px_rgb(0_82_255/0.7)] transition-transform duration-300 group-hover:-rotate-6">
            AM
          </span>
          <span className="font-serif text-lg tracking-tight">
            Archit Mehta
          </span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-ink-200/70 bg-surface/70 p-1 backdrop-blur md:flex">
          {navigationLinks.map((link) => {
            const isActive = !isOffHome && activeSectionId === link.id;

            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={pillClass(isActive)}
                >
                  {isActive && activePill}
                  {link.label}
                </a>
              </li>
            );
          })}
          {routeLinks.map((link) => {
            const isActive = isActiveRoute(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={pillClass(isActive)}
                >
                  {isActive && activePill}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className={`${button.primary} ${button.sizes.sm}`}
            >
              <FileText className="size-4" aria-hidden="true" />
              Resume
            </a>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-ink-200 bg-surface text-ink-900 transition-colors hover:bg-ink-50 md:hidden"
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: ANIMATION_DURATIONS.fast }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ink-200/70 bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 font-serif text-2xl text-ink-900 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {routeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActiveRoute(link.href) ? "page" : undefined}
                    className={`block rounded-xl px-3 py-3 font-serif text-2xl hover:bg-brand-50 hover:text-brand-700 ${
                      isActiveRoute(link.href)
                        ? "text-brand-700"
                        : "text-ink-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 px-3 pb-2">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className={`${button.primary} ${button.sizes.md} w-full`}
                >
                  <FileText className="size-4" aria-hidden="true" />
                  View Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
