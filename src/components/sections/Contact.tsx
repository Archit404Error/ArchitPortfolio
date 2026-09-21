import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";
import { Mail } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { ContactGrid } from "./ContactGrid";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: profile.socials.email,
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "in/4architmehta",
    href: profile.socials.linkedin,
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "Archit404Error",
    href: profile.socials.github,
    Icon: GithubIcon,
  },
];

const GRID_MASK =
  "[mask-image:radial-gradient(80%_90%_at_60%_40%,black_25%,transparent)]";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-24 text-paper sm:py-28 lg:py-32"
    >
      <div
        className={`bg-grid-dark pointer-events-none absolute inset-0 ${GRID_MASK}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-0 ${GRID_MASK}`}
        aria-hidden="true"
      >
        <ContactGrid cellSize={48} tone="dark" />
      </div>
      <div
        className="pointer-events-none absolute -left-40 top-1/2 -z-0 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-brand-600/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            tone="dark"
            title="Say hello."
            description="Building something ambitious or want to talk about what I'm up to? My inbox is open."
          />

          <RevealGroup
            as="ul"
            stagger={0.1}
            className="mt-12 border-t border-white/10"
            aria-label="Ways to reach me"
          >
            {channels.map(({ label, value, href, Icon }) => (
              <RevealItem
                as="li"
                key={label}
                distance={24}
                className="border-b border-white/10"
              >
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-5 py-5 transition-colors"
                >
                  <Icon
                    className="size-5 shrink-0 text-ink-400 transition-[color,transform] duration-300 group-hover:-rotate-6 group-hover:text-brand-300"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-base italic text-ink-400">
                      {label}
                    </span>
                    <span className="block truncate font-medium text-paper transition-colors group-hover:text-brand-300">
                      {value}
                    </span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.3} className="mt-8">
            <p className="font-serif text-lg italic text-ink-400">
              Based in {profile.location}. Replies usually within a few days.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} distance={36} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
