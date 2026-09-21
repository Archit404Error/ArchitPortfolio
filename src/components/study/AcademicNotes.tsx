import { ArrowUpRight } from "lucide-react";
import type { AcademicSection } from "@/content/study";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function AcademicNotes({ sections }: { sections: AcademicSection[] }) {
  const visibleSections = sections.filter(
    (section) => section.entries.length > 0,
  );
  if (!visibleSections.length) return null;

  return (
    <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-10 lg:gap-x-16">
      {visibleSections.map((section) => (
        <RevealGroup
          key={section.id}
          as="section"
          stagger={0.08}
          className="relative pt-5"
        >
          <span
            className="absolute inset-x-0 top-0 block h-px bg-ink-300"
            aria-hidden="true"
          />
          <RevealItem>
            <h3 className="font-serif text-2xl italic leading-none text-ink-900">
              {section.heading}
            </h3>
            {section.lede && (
              <p className="mt-2 text-sm text-ink-500">{section.lede}</p>
            )}
          </RevealItem>
          <RevealItem as="ul" className="ledger mt-5">
            {section.entries.map((entry) => (
              <li key={entry.title} className="py-4 first:pt-0">
                {entry.href ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-start gap-1 font-medium text-ink-900 transition-colors hover:text-brand-700"
                  >
                    {entry.title}
                    <ArrowUpRight
                      className="mt-1 size-3.5 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <p className="font-medium text-ink-900">{entry.title}</p>
                )}
                {entry.meta && (
                  <p className="mt-0.5 font-mono text-xs text-ink-500">
                    {entry.meta}
                  </p>
                )}
                {entry.detail && (
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink-600">
                    {entry.detail}
                  </p>
                )}
              </li>
            ))}
          </RevealItem>
        </RevealGroup>
      ))}
    </div>
  );
}
