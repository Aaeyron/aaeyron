import type { Metadata } from "next";
import { ArrowRight, CalendarDays } from "lucide-react";
import { experience } from "@/lib/content";
import { hasInternshipStarted, internshipCopy } from "@/lib/internship";
import ButtonLink from "../components/ui/ButtonLink";
import { InternshipBadge } from "../components/ui/InternshipText";
import { Highlight, LabelRule, SectionHeader } from "../components/ui/primitives";

// Re-render hourly so the internship "incoming" → "currently" switch also reaches the HTML and meta tags.
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const internship = internshipCopy(hasInternshipStarted()).meta;
  return {
    title: "Experience",
    alternates: { canonical: "/experience" },
    description: `Aaron Seth Nagtalon's experience: ${internship}, including AI Career Copilot, an LLM resume analyzer built during the internship.`,
  };
}

/**
 * Experience: internship experience only. Everything personal (profile, early projects, tech
 * events) lives on /about. The internship section keeps the #internship anchor, which the
 * AI Career Copilot case study's Back buttons link to.
 */
export default function Experience() {
  const started = hasInternshipStarted();

  return (
    <>
      <div className="container-x pt-[var(--section-pad)]">
        <SectionHeader as="h1" rule label="Experience" title={<>Where I’ve <Highlight>worked</Highlight>.</>}>
          <p>My experience as an Aspiring AI/ML Engineer intern.</p>
        </SectionHeader>
      </div>

      {/* 01 · Internship. The page title already says "Where I've worked.", so the section shows
          only its number + label (the heading stays for screen readers). */}
      <section id="internship" aria-labelledby="internship-title" className="border-t border-line pb-[var(--section-pad)] pt-[var(--section-header-gap)]">
        <div className="container-x">
          <LabelRule index="01" className="mb-6 max-w-md">
            Internship
          </LabelRule>
          <h2 id="internship-title" className="sr-only">
            Internship
          </h2>

          {/* Per job: text straight on the page (no cards). Two columns from 1024px, 50/50, split
              by a 1px hairline in the middle of a 96px gutter; stacked below with a hairline
              between, role first. The only bordered bits are small: the date badge, chips and button.
              Spacing sticks to 8 / 16 / 24 / 32 / 48px. */}
          <ol className="grid gap-12">
            {experience.map((job) => (
              <li key={job.company} className="grid lg:grid-cols-2" data-reveal>
                {/* The role. */}
                <article aria-labelledby="internship-role" className="pb-8 lg:border-r lg:border-line lg:pb-0 lg:pr-12">
                  {/* Caption + hairline rule + date badge (h-6 so both captions share a top line). */}
                  <div className="flex h-6 items-center gap-4">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Position</span>
                    <span aria-hidden className="h-px min-w-4 flex-1 bg-line" />
                    <InternshipBadge
                      serverStarted={started}
                      mono
                      icon={<CalendarDays size={13} aria-hidden className="text-muted" />}
                    />
                  </div>

                  <h3 id="internship-role" className="mt-4 text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-2 font-semibold text-ink">{job.company}</p>

                  {/* Details: a plain definition list split by hairlines. */}
                  <dl className="mt-4">
                    {[
                      { k: "Type", v: job.type },
                      { k: "Start", v: <time dateTime={job.start.iso}>{job.start.label}</time> },
                      { k: "Company", v: job.company },
                      { k: "About", v: job.companyNote },
                    ].map((f) => (
                      <div key={f.k} className="flex items-baseline gap-4 border-t border-line py-2">
                        <dt className="w-20 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">{f.k}</dt>
                        <dd className="text-[0.9375rem] leading-[1.6] text-ink">{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>

                {/* The project(s) built during it, with one blue accent line on the left (static). The
                    button (to /experience/<slug>) is the only thing here that reacts on hover. */}
                {job.builtDuring.map((product) => (
                  <article
                    key={product.slug}
                    aria-labelledby={`built-${product.slug}`}
                    className="border-t border-line pt-8 lg:border-t-0 lg:pl-12 lg:pt-0"
                  >
                    <div className="border-l-2 border-accent pl-4 sm:pl-6">
                      <div className="flex h-6 items-center gap-4">
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Built during this internship</span>
                        <span aria-hidden className="h-px min-w-4 flex-1 bg-line" />
                      </div>

                      {/* Two deliberate lines: "AI Career" / "Copilot: LLM Resume Analyzer". The second
                          stays on one line from 768px (size eases down with clamp() to fit the column);
                          on phones it may wrap, balanced. The trailing space keeps the accessible name
                          "AI Career Copilot: …" with a space between the lines. */}
                      <h3
                        id={`built-${product.slug}`}
                        className="mt-4 text-xl font-semibold leading-tight tracking-[-0.02em] md:text-[clamp(1.25rem,0.75rem+1.1vw,1.5rem)]"
                      >
                        <span className="block">{product.titleLines[0]} </span>
                        <span className="block text-balance md:whitespace-nowrap">{product.titleLines[1]}</span>
                      </h3>
                      <p className="mt-2 max-w-[65ch] text-[0.9375rem] leading-[1.6] text-muted">{product.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
                        {product.summaryStack.map((t) => (
                          <li key={t} className="border border-line px-2 font-mono text-[0.7rem] leading-6 text-ink">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <ButtonLink href={`/experience/${product.slug}`} variant="secondary" className="sharp mt-6 rounded-none!">
                        View project details <span className="sr-only">: {product.title}</span>
                        <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </ButtonLink>
                    </div>
                  </article>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
