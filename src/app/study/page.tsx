import { BlogShell } from "@/components/blog/MarkdownContent";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AcademicNotes } from "@/components/study/AcademicNotes";
import { Bookshelf } from "@/components/study/Bookshelf";
import { ResearchQuestions } from "@/components/study/ResearchQuestions";
import { Reveal } from "@/components/ui/Reveal";
import {
  academic,
  bookshelf,
  hasStudyContent,
  researchQuestions,
  studyIntro,
} from "@/content/study";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Study",
  description:
    "Archit Mehta’s bookshelf, open research questions, and notes from the academic side of his life.",
  alternates: { canonical: "/study" },
  openGraph: {
    type: "website",
    url: "/study",
    title: "The Study · Archit Mehta",
    description:
      "Bookshelf, open research questions, and notes from the academic side.",
  },
};

function StudySection({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-t border-ink-200 py-16 sm:py-20"
    >
      <Reveal className="max-w-2xl">
        <h2
          id={`${id}-heading`}
          className="font-serif text-balance text-4xl font-[450] leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-[2.75rem]"
        >
          {title}
        </h2>
        {lede && (
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-600 sm:text-lg">
            {lede}
          </p>
        )}
      </Reveal>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

export default function StudyPage() {
  const year = new Date().getFullYear();
  const showAcademic = academic.some((section) => section.entries.length > 0);

  return (
    <BlogShell>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar variant="blog" />
      <main id="main" className="flex-1">
        <div className="container-page pb-20 pt-28 sm:pb-28 sm:pt-32">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>

          <header className="max-w-3xl">
            <h1 className="font-serif text-balance text-[3.25rem] font-[450] leading-[0.98] tracking-[-0.025em] text-ink-900 sm:text-[4.25rem] lg:text-[5rem]">
              {studyIntro.title}
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-pretty text-xl italic leading-[1.4] text-ink-600 sm:text-2xl">
              {studyIntro.lede}
            </p>
          </header>

          {!hasStudyContent && (
            <p className="mt-16 border-t border-ink-200 pt-10 text-ink-600">
              Nothing on the shelves yet. Add books, questions, and notes in{" "}
              <code className="font-mono text-sm">src/content/study.ts</code>.
            </p>
          )}

          <div className="mt-16 sm:mt-20">
            {bookshelf.length > 0 && (
              <StudySection
                id="bookshelf"
                title="Bookshelf."
                lede="Pick a spine to see why it earned a place here."
              >
                <Bookshelf books={bookshelf} />
              </StudySection>
            )}

            {researchQuestions.length > 0 && (
              <StudySection
                id="questions"
                title="Open questions."
                lede="Problems I keep returning to, that I believe will push the frontier of human technology."
              >
                <ResearchQuestions questions={researchQuestions} />
              </StudySection>
            )}

            {showAcademic && (
              <StudySection id="academic" title="Academic Endeavors.">
                <AcademicNotes sections={academic} />
              </StudySection>
            )}
          </div>
        </div>
      </main>
      <Footer variant="blog" topHref="#" year={year} />
    </BlogShell>
  );
}
