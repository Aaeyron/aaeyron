"use client";

import { useState, type ReactNode } from "react";

export type StatusFilter = "all" | "learning" | "next" | "target";

const options: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "learning", label: "Learning now" },
  { value: "next", label: "Next up" },
  { value: "target", label: "Target" },
];

/**
 * Jump links to each group plus a status filter, wrapping the page's groups.
 * The filter only sets `data-filter` on the wrapper; CSS in globals.css (.resources-filter)
 * hides non-matching items and empty groups, so no list re-renders and nothing new loads.
 * All items are visible by default. Sticky under the header from 768px only, so it never
 * crowds the navbar on phones.
 */
export default function ResourcesToolbar({
  groups,
  counts,
  children,
}: {
  groups: { id: string; label: string }[];
  /** Number of items per filter value, for the screen-reader announcement. */
  counts: Record<StatusFilter, number>;
  children: ReactNode;
}) {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const active = options.find((o) => o.value === filter)!;
  const announcement =
    filter === "all" ? `Showing all ${counts.all} resources.` : `Showing ${counts[filter]} resources marked ${active.label}.`;

  return (
    <div data-filter={filter} className="resources-filter">
      <div className="z-30 mb-14 border-y border-line bg-bg/95 py-4 md:sticky md:top-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Jump to a section" className="min-w-0">
            <ul className="flex flex-wrap items-center gap-1.5">
              <li aria-hidden className="mr-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                Jump to
              </li>
              {groups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="sharp chip min-h-8 transition-colors duration-200 hover:border-ink hover:text-ink"
                  >
                    {g.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-1.5">
            <span id="status-filter-label" className="mr-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
              Status
            </span>
            <div role="group" aria-labelledby="status-filter-label" className="flex flex-wrap gap-1.5">
              {options.map((o) => {
                const pressed = filter === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setFilter(o.value)}
                    className={`sharp chip min-h-8 cursor-pointer transition-colors duration-200 ${
                      pressed ? "border-ink bg-ink text-bg" : "hover:border-ink hover:text-ink"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>

      {children}
    </div>
  );
}
