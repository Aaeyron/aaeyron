import type { ReactNode } from "react";
import { profile } from "@/lib/content";
import { CornerMarks, Highlight, Label, SectionHeader } from "../ui/primitives";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Website named in the legal pages' contact section, next to the email address. */
export const legalSite = "aaeyron.tech";

/**
 * Shared layout for /privacy and /terms: page header, an "On this page" index (sticky on
 * desktop), and numbered sections. Each section has an index tab, a heading with an accent
 * tick, and plain-language body text. The contact block at the end has corner marks.
 */
export default function LegalPage({
  label,
  title,
  highlight,
  intro,
  updated,
  sections,
}: {
  label: string;
  title: string;
  /** The word in `title` to highlight (accent colour). */
  highlight: string;
  intro: ReactNode;
  /** Human-readable "last updated" date, e.g. "October 22, 2026". */
  updated: { label: string; iso: string };
  sections: LegalSection[];
}) {
  const at = title.indexOf(highlight);
  const heading =
    at === -1 ? (
      title
    ) : (
      <>
        {title.slice(0, at)}
        <Highlight>{highlight}</Highlight>
        {title.slice(at + highlight.length)}
      </>
    );
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="container-x section">
      <SectionHeader as="h1" rule label={label} title={heading}>
        <p>{intro}</p>
        <p className="mt-4">
          <Label>
            Last updated <time dateTime={updated.iso}>{updated.label}</time>
          </Label>
        </p>
      </SectionHeader>

      <div className="grid-12 gap-y-10">
        {/* On this page: sticky index on desktop. */}
        <nav aria-label="On this page" className="col-span-4 sm:col-span-8 lg:col-span-3" data-reveal>
          <div className="relative border border-line bg-bg p-5 lg:sticky lg:top-24">
            <CornerMarks />
            <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">On this page</p>
            <ol className="space-y-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex min-h-9 items-baseline gap-3 text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <span aria-hidden className="font-mono text-[0.7rem]">
                      {pad(i + 1)}
                    </span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="relative border-t border-line py-8 first:pt-0 first:border-t-0"
              data-reveal
            >
              <div className="flex items-center gap-3">
                <span className="chip py-0 text-[0.65rem]">
                  {pad(i + 1)} / {pad(sections.length)}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <h2 id={`${s.id}-title`} className="relative mt-5 pl-4 text-xl font-semibold tracking-[-0.02em] text-ink">
                <span aria-hidden className="absolute left-0 top-1 h-5 w-0.5 bg-accent" />
                {s.title}
              </h2>
              <div className="measure mt-4 space-y-3 text-muted [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-none [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:size-1 [&_li]:before:bg-line-strong">
                {s.body}
              </div>
            </section>
          ))}

          {/* Contact block. */}
          <div className="relative mt-4" data-reveal>
            <CornerMarks />
            <div className="border border-line bg-bg p-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Questions?</p>
              <p className="mt-3 text-ink">
                Email me at{" "}
                <a href={`mailto:${profile.email}`} className="link break-all">
                  {profile.email}
                </a>{" "}
                or reach me through <span className="font-medium">{legalSite}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
