import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import Doodle from "../ui/Doodle";
import { CornerMarks, Label, Tag } from "../ui/primitives";
import ProjectLinks from "./ProjectLinks";

/**
 * Per-project look, from one family so the three cards read as a set:
 * - tint: three tones of the site's blue accent (full, deepened toward ink, softened toward
 *   the page), used for the card's top bar, the image frame's edge and the doodle; never text.
 * - texture: a different pattern per card behind the details, fading in from the bottom-right.
 * - doodle: a small hand-drawn mark themed to the project, in the image caption bar.
 * - short: the project name used in the image caption ("FIG 01 · LIBRARY MGMT").
 */
type Look = { tint: string; texture: string; doodle: "books" | "hanger" | "flashcard"; short: string };
const looks: Record<string, Look> = {
  "library-management-system": { tint: "var(--accent)", texture: "tex-grid", doodle: "books", short: "Library mgmt" },
  "janas-boutique": {
    tint: "color-mix(in srgb, var(--accent) 65%, var(--ink))",
    texture: "tex-lines",
    doodle: "hanger",
    short: "Jana’s Boutique",
  },
  flashmind: { tint: "color-mix(in srgb, var(--accent) 50%, var(--bg))", texture: "tex-dots", doodle: "flashcard", short: "FlashMind" },
};
const fallback = looks["library-management-system"];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Card for one of the three 3rd-year school projects (home "Where I started" and Experience
 * "Early solo projects"), one card per row.
 *
 * Shell (static; only the links inside react on hover): site card shadow, 1px field-style
 * border, a 4px tinted top bar.
 * Layout: from 1024px two columns, about 40% framed image / 60% details, split by a hairline;
 * stacked (image on top) below that.
 * - Image side: a framed box in the PhotoFrame family. 1px border, padding ring with a faint
 *   texture, corner marks, a thin tinted edge, a fixed 4:3 image (or a placeholder), and a
 *   caption bar "FIG 01 · NAME" ending in the project's doodle.
 * - Details side: micro-labels, title with an accent tick, one-line type, a hairline divider,
 *   description, tech tags, then an honest status tag and the links at the bottom; a faint
 *   texture behind it all.
 */
export default function SchoolProjectCard({
  project,
  index,
  total,
  description,
  extraLabel,
  titleId,
  imageSizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  project: Project;
  index: number;
  total: number;
  /** The paragraph to show (home uses `summary`, Experience uses `tagline`). */
  description: string;
  /** Optional extra chip under the type line (Experience shows its "v1 · first solo build" marker). */
  extraLabel?: string;
  titleId: string;
  imageSizes?: string;
}) {
  const look = looks[project.slug] ?? fallback;
  const fig = pad(index + 1);

  return (
    <article
      aria-labelledby={titleId}
      style={{ "--tint": look.tint } as CSSProperties}
      className="field-frame card relative flex w-full flex-col border border-[var(--field-line)] bg-bg lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      {/* Tinted top bar across the whole card. */}
      <span aria-hidden className="absolute inset-x-0 -top-px z-10 h-1 bg-[var(--tint)]" />

      {/* ---------- Image side ---------- */}
      <div className="border-b border-line p-6 lg:border-b-0 lg:border-r">
        <figure className="field-frame relative border border-[var(--field-line)] bg-bg p-2.5">
          <CornerMarks inset="-4px" />
          <span aria-hidden className="tex tex-lines" />
          {/* Thin tinted edge down the frame's left side. */}
          <span aria-hidden className="absolute -left-px inset-y-0 w-0.5 bg-[var(--tint)]" />

          <div className="relative aspect-[4/3] overflow-hidden border border-[var(--field-line)] bg-surface">
            {project.image ? (
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes={imageSizes}
                className="object-cover object-top"
              />
            ) : (
              <div className="tex-dots absolute inset-0 grid place-items-center">
                <span className="flex flex-col items-center gap-2 bg-surface px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                  <Doodle variant={look.doodle} className="h-8 w-10 text-[var(--tint)]" />
                  No preview
                </span>
              </div>
            )}
          </div>

          <figcaption className="relative mt-2.5 flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
            <span>
              Fig {fig} · {look.short}
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <Doodle variant={look.doodle} className="h-4 w-5 shrink-0 text-[var(--tint)]" />
          </figcaption>
        </figure>
      </div>

      {/* ---------- Details side ---------- */}
      <div className="relative flex min-w-0 flex-col p-6">
        <span aria-hidden className={`tex fade-br ${look.texture}`} />

        {/* Header: micro-labels, title with accent tick, type line. */}
        <p className="relative flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
          <span>School project · 3rd year</span>
          <span>
            Ref <span className="text-accent-text">{fig}</span> / {pad(total)}
          </span>
        </p>
        <h3 id={titleId} className="relative mt-4 pl-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink">
          <span aria-hidden className="absolute left-0 top-1 h-5 w-0.5 bg-accent" />
          {project.title}
        </h3>
        <p className="relative mt-1.5 text-sm text-muted">{project.context}</p>
        {extraLabel && (
          <p className="relative mt-3">
            <Label accent>{extraLabel}</Label>
          </p>
        )}

        {/* Hairline divider between header and body. */}
        <span aria-hidden className="relative mt-5 block h-px bg-line" />

        {/* Body: description and tech tags. */}
        <p className="relative mt-5 text-[0.9375rem] leading-relaxed text-ink">{description}</p>
        <ul className="relative mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        {/* Footer: honest status + links, pinned to the bottom of the column. */}
        <div className="relative mt-auto pt-6">
          <Label>{project.status}</Label>
          <ProjectLinks project={project} className="mt-4" />
        </div>
      </div>
    </article>
  );
}
