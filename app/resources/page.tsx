import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { resourceGroups, type ResourceLink, type ResourceStatus } from "@/lib/content";
import SectionRail from "../components/resources/SectionRail";
import Doodle from "../components/ui/Doodle";
import { CornerMarks, Highlight, LabelRule, SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Resources",
  alternates: { canonical: "/resources" },
  description:
    "Where Aaron Seth Nagtalon started learning: Harvard’s CS50 path, from CS50’s Introduction to Computer Science to Programming with Python and Artificial Intelligence.",
};

const pad = (n: number) => String(n).padStart(2, "0");
const domainOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

type DoodleName = "books" | "arrow" | "spark" | "wrench" | "sigma" | "gear" | "graph" | "flag" | "flashcard" | "squiggle";

/** One doodle and one texture per group (varied so neighbouring sections differ). */
const groupStyle: Record<string, { doodle: DoodleName; texture: string; dashed?: boolean }> = {
  "learn-ai-ml": { doodle: "flashcard", texture: "tex-dots" },
  "where-i-started": { doodle: "arrow", texture: "tex-grid" },
  "prompt-engineering": { doodle: "spark", texture: "tex-cross" },
  "math-fundamentals": { doodle: "sigma", texture: "tex-lines" },
  "mlops-data": { doodle: "gear", texture: "tex-dots" },
  "llms-agents-mcp": { doodle: "graph", texture: "tex-cross" },
  "deep-learning": { doodle: "books", texture: "tex-grid" },
  "stretch-goals": { doodle: "flag", texture: "tex-lines", dashed: true },
  communities: { doodle: "squiggle", texture: "tex-dots" },
  tools: { doodle: "wrench", texture: "" },
};
const styleFor = (id: string) => groupStyle[id] ?? { doodle: "books" as const, texture: "tex-dots" };

/**
 * Status tag. Learning: solid ink with the accent status dot (the only accent use).
 * Next: outlined. Target: dashed outline. Completed: outlined with a check mark.
 */
const statusLabel: Record<ResourceStatus, string> = {
  learning: "Learning now",
  next: "Next up",
  target: "Target",
  done: "Completed",
};
function StatusTag({ status }: { status: ResourceStatus }) {
  const base = "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border px-1.5 py-0.5 font-mono text-[0.6rem] uppercase leading-none tracking-[0.1em]";
  const look: Record<ResourceStatus, string> = {
    learning: "border-ink bg-ink text-bg",
    next: "border-line-strong bg-bg text-ink",
    target: "border-dashed border-line-strong bg-bg text-muted",
    done: "border-line-strong bg-bg text-muted",
  };
  return (
    <span className={`${base} ${look[status]}`}>
      {status === "learning" && <span aria-hidden className="status-dot" />}
      {status === "done" && <Check size={11} aria-hidden />}
      {statusLabel[status]}
    </span>
  );
}

/** Arrow that nudges up-right on hover/focus (link opens in a new tab). */
function ExternalArrow() {
  return (
    <ArrowUpRight
      size={18}
      aria-hidden
      className="shrink-0 text-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:text-ink"
    />
  );
}

/**
 * Link card: title with the status tag top-right, a muted "why" line, an optional short note,
 * then the domain and arrow at the bottom. Details: card shadow + hover lift, corner marks
 * (ink on hover), and the group's texture; stretch goals use a dashed border.
 */
function LinkCard({ link, texture, dashed }: { link: ResourceLink; texture: string; dashed?: boolean }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`sharp group card card-lift relative flex h-full w-full flex-col border border-line bg-bg p-5 hover:border-ink ${
        dashed ? "border-dashed" : ""
      }`}
    >
      <CornerMarks hover inset="-4px" />
      {texture && <span aria-hidden className={`tex fade-br ${texture}`} />}
      <span className="relative flex items-start justify-between gap-3">
        <span className="min-w-0 font-semibold leading-snug text-ink">{link.title}</span>
        {link.status && <StatusTag status={link.status} />}
      </span>
      {link.why && <span className="relative mt-1.5 block text-sm leading-relaxed text-muted">{link.why}</span>}
      {link.note && (
        <span className="relative mt-2 block font-mono text-[0.68rem] leading-relaxed text-muted">
          <span aria-hidden>↳ </span>
          {link.note}
        </span>
      )}
      <span className="relative mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="min-w-0 break-all font-mono text-[0.7rem] text-muted">{domainOf(link.url)}</span>
        <ExternalArrow />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * The CS50 "path" card: the starting course, then its follow-on courses, joined by a vertical
 * connector with numbered step markers. Details: card shadow, corner marks, grid texture.
 */
function PathCard({ start, texture }: { start: ResourceLink; texture: string }) {
  const steps = [start, ...(start.next ?? [])];
  return (
    <div className="card relative border border-line bg-bg p-5 sm:p-6">
      <CornerMarks />
      {texture && <span aria-hidden className={`tex fade-br ${texture}`} />}
      <ol className="relative">
        <span aria-hidden className="absolute bottom-8 left-4 top-8 w-px bg-line-strong" />
        {steps.map((s, i) => (
          <li key={s.url} className={i > 0 ? "mt-3" : ""}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="sharp group relative flex items-start gap-4 py-3 pr-2">
              <span
                aria-hidden
                className={`relative z-10 grid size-8 shrink-0 place-items-center border font-mono text-[0.65rem] transition-colors duration-200 group-hover:border-ink ${
                  i === 0 ? "border-ink bg-ink text-bg" : "border-line-strong bg-bg text-muted"
                }`}
              >
                {pad(i + 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
                  {i === 0 ? "Start here" : "Next step"}
                </span>
                <span className={`mt-1 block font-semibold leading-snug text-ink ${i === 0 ? "text-lg" : ""}`}>{s.title}</span>
                <span className="mt-1 block break-all font-mono text-[0.7rem] text-muted">{domainOf(s.url)}</span>
              </span>
              <span className="mt-0.5">
                <ExternalArrow />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Tool chips: plain labelled boxes (no links) with a small ink marker. */
function ToolChips({ tools }: { tools: string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {tools.map((t) => (
        <li key={t} className="card flex items-center gap-2.5 border border-line bg-bg px-4 py-3 text-sm font-medium text-ink">
          <span aria-hidden className="size-1.5 shrink-0 bg-ink" />
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * One-line status summary under the subtitle ("4 LEARNING NOW · 8 NEXT UP · 3 TARGETS"),
 * computed from the data. Each count has a marker matching the card tags, so it doubles as a
 * legend: solid square = learning, outlined = next, dashed = target. Plain text, not interactive.
 */
function StatusSummary() {
  const all = resourceGroups.flatMap((g) =>
    g.kind === "links" ? g.links : g.kind === "path" ? [g.start, ...(g.start.next ?? [])] : [],
  );
  const count = (s: ResourceStatus) => all.filter((l) => l.status === s).length;
  const items = [
    { n: count("learning"), label: "Learning now", marker: "border border-ink bg-ink" },
    { n: count("next"), label: "Next up", marker: "border border-ink" },
    { n: count("target"), label: count("target") === 1 ? "Target" : "Targets", marker: "border border-dashed border-ink" },
  ].filter((i) => i.n > 0);
  if (!items.length) return null;

  return (
    <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted">
      {items.map((i, idx) => (
        <span key={i.label} className="inline-flex items-center gap-3">
          {idx > 0 && <span aria-hidden>·</span>}
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className={`size-2 shrink-0 ${i.marker}`} />
            <span>
              <span className="text-ink">{i.n}</span> {i.label}
            </span>
          </span>
        </span>
      ))}
    </p>
  );
}

export default function Resources() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" rule label="Resources" title={<>Resources<Highlight>.</Highlight></>}>
        <p>What I learn from, what I’m learning now, and where I’m headed.</p>
        <StatusSummary />
      </SectionHeader>

      {/* One hairline between the header and the first section. */}
      <hr className="-mt-2 mb-[var(--section-header-gap)] border-line sm:-mt-6" />

      {/* Sections, with the desktop-only rail (≥1280px) sticky in the left gutter beside them. */}
      <div className="relative">
        {/* The rail only helps when there's more than one section to jump between. */}
        {resourceGroups.length > 1 && <SectionRail sections={resourceGroups.map((g) => ({ id: g.id, label: g.label }))} />}
        <div className="space-y-[var(--block-gap)]">
          {resourceGroups.map((g, gi) => {
            const style = styleFor(g.id);
            const headingId = `${g.id}-title`;
            return (
              <section key={g.id} id={g.id} aria-labelledby={headingId}>
                <div data-reveal>
                  <LabelRule index={pad(gi + 1)} className="mb-5">
                    {g.label}
                  </LabelRule>
                  <div className="mb-8 flex items-end gap-3">
                    <h2 id={headingId} className="text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                      {g.title}
                    </h2>
                    <Doodle variant={style.doodle} className="mb-1 h-6 w-8 shrink-0 text-muted" />
                  </div>
                </div>

                {g.kind === "links" && (
                  <ul className="grid gap-6 md:grid-cols-2">
                    {g.links.map((l) => (
                      <li key={l.url} className="flex" data-reveal>
                        <LinkCard link={l} texture={style.texture} dashed={style.dashed} />
                      </li>
                    ))}
                  </ul>
                )}
                {g.kind === "path" && (
                  <div data-reveal>
                    <PathCard start={g.start} texture={style.texture} />
                  </div>
                )}
                {g.kind === "tools" && (
                  <div data-reveal>
                    <ToolChips tools={g.tools} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
