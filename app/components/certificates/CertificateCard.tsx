import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import type { Certificate } from "@/lib/content";
import { CornerMarks } from "../ui/primitives";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One certificate (home "Skills, certified", Experience and /certificates all use this).
 *
 * From 768px: two columns, image (~45%) left and details right, split by a hairline; stacked
 * below that (image on top). The image is simply shown: no link, no enlarge, no zoom.
 * - Image side: framed box (1px border, padding ring with a faint texture, corner marks) and a
 *   fixed 1.3:1 area with object-fit: contain, so nothing is cropped and all cards align.
 * - Details side: COMPLETED tag, title, a mono meta line (issuer · issued date), description
 *   (15px, ~1.65 line-height, ~65ch), a "Final project" note when one was required, and a
 *   "Verify credential" link when a public one exists.
 * Card: site shadow + hover lift (the card lifts, the image doesn't zoom), corner marks that
 * turn accent on hover, and an index tab on the top border.
 */
export default function CertificateCard({
  cert,
  index,
  total,
  headingLevel = "h3",
}: {
  cert: Certificate;
  index: number;
  total: number;
  /** h2 on /certificates (directly under the page h1), h3 inside home / Experience sections. */
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const titleId = `cert-${cert.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="group card card-lift relative flex flex-col border border-line bg-bg hover:border-ink md:grid md:grid-cols-[minmax(0,9fr)_minmax(0,11fr)]"
    >
      <CornerMarks hover />
      <span
        aria-hidden
        className="chip absolute -top-2.5 left-4 z-10 py-0 text-[0.65rem] transition-colors duration-200 group-hover:border-ink group-hover:text-ink"
      >
        <span className="text-accent-text">{pad(index + 1)}</span> / {pad(total)}
      </span>

      {/* ---------- Image side ---------- */}
      <div className="border-b border-line p-5 sm:p-6 md:border-b-0 md:border-r">
        <figure className="field-frame relative border border-line bg-bg p-2.5">
          <CornerMarks inset="-4px" />
          <span aria-hidden className="tex tex-lines" />
          <div className="relative aspect-[1.3] overflow-hidden border border-[var(--field-line)] bg-surface">
            <Image
              src={cert.image}
              alt={cert.alt}
              fill
              sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw"
              className="object-contain"
            />
          </div>
        </figure>
      </div>

      {/* ---------- Details side ---------- */}
      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <span className="inline-flex w-fit items-center gap-1.5 border border-line-strong bg-bg px-1.5 py-0.5 font-mono text-[0.65rem] uppercase leading-none tracking-[0.1em] text-muted">
          <Check size={11} aria-hidden />
          Completed
        </span>

        <H id={titleId} className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
          {cert.title}
        </H>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          {cert.issuer} <span aria-hidden>·</span> Issued <time dateTime={cert.dateIso}>{cert.date}</time>
        </p>

        <span aria-hidden className="mt-5 block h-px bg-line" />

        {cert.description && (
          <p className="measure mt-5 text-[0.9375rem] leading-[1.65] text-ink">{cert.description}</p>
        )}

        {(cert.finalProject || cert.credentialUrl) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
            {cert.finalProject && (
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">
                <span aria-hidden className="size-1.5 bg-ink" />
                Final project
              </span>
            )}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sharp group/v inline-flex min-h-11 items-center gap-1.5 font-medium text-ink transition-colors duration-200 hover:text-accent-text"
              >
                Verify credential
                <span className="sr-only"> for {cert.title} (opens in a new tab)</span>
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover/v:-translate-y-0.5 group-hover/v:translate-x-0.5"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/** A stacked list of certificate cards (one per row). */
export function CertificateList({ certs, headingLevel }: { certs: Certificate[]; headingLevel?: "h2" | "h3" }) {
  return (
    <ol className="grid gap-8">
      {certs.map((cert, i) => (
        <li key={cert.id} data-reveal>
          <CertificateCard cert={cert} index={i} total={certs.length} headingLevel={headingLevel} />
        </li>
      ))}
    </ol>
  );
}
