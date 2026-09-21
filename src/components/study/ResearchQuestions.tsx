import { ArrowUpRight } from "lucide-react";
import { type ResearchQuestion, questionStatusLabel } from "@/content/study";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ResearchQuestions({
  questions,
}: {
  questions: ResearchQuestion[];
}) {
  if (!questions.length) return null;

  return (
    <RevealGroup
      as="ol"
      stagger={0.1}
      className="ledger border-t border-ink-200"
    >
      {questions.map((question) => (
        <RevealItem
          as="li"
          key={question.question}
          distance={24}
          className="grid gap-4 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
        >
          <div className="sm:col-span-3">
            <p className="font-serif text-base italic text-ink-500">
              {questionStatusLabel[question.status]}
            </p>
          </div>
          <div className="min-w-0 sm:col-span-9">
            <h3 className="font-serif text-balance text-2xl leading-[1.15] tracking-[-0.01em] text-ink-900 sm:text-[1.85rem]">
              {question.question}
            </h3>
            <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-600 sm:text-base">
              {question.why}
            </p>
            {question.links?.length ? (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {question.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-600"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
