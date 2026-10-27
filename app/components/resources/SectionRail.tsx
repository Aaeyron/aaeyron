"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Slim section rail for /resources, desktop only (≥1280px). A hairline with a short tick and
 * the section number for each group, like a ruler. Scroll-spy (IntersectionObserver) marks the
 * section in view: its number turns ink with a longer accent tick and the link gets
 * aria-current. Each number is a plain anchor (Lenis smooth-scrolls it, or it jumps instantly
 * with reduced motion); the section name slides out on hover/focus.
 *
 * Place it inside a `relative` wrapper around the sections: it sits in the left gutter and
 * stays sticky below the header only while that wrapper is on screen, so it never reaches the
 * navbar or the footer.
 */
export default function SectionRail({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    // A section counts as "current" while it crosses a band ~30–40% down the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Sections on this page"
      className="pointer-events-none absolute inset-y-0 right-full mr-2 hidden w-7 xl:block"
    >
      <div className="pointer-events-auto sticky top-28">
        {/* The ruler's spine. */}
        <span aria-hidden className="absolute inset-y-1 left-0 w-px bg-line" />
        <ol className="relative">
        {sections.map((s, i) => {
          const current = s.id === active;
          return (
            <li key={s.id} className="relative">
              <a
                href={`#${s.id}`}
                aria-current={current ? "location" : undefined}
                className="group sharp relative flex h-7 items-center gap-1.5 font-mono text-[0.65rem] tabular-nums"
              >
                <span
                  aria-hidden
                  className={`h-px shrink-0 transition-[width,background-color] duration-200 ${
                    current ? "w-3 bg-accent" : "w-1.5 bg-line-strong group-hover:bg-ink group-focus-visible:bg-ink"
                  }`}
                />
                <span
                  className={`transition-colors duration-200 ${
                    current ? "text-ink" : "text-muted group-hover:text-ink group-focus-visible:text-ink"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                {/* Section name: slides out on hover / keyboard focus. */}
                <span className="pointer-events-none absolute left-full ml-2 -translate-x-1 whitespace-nowrap bg-chrome px-1.5 py-0.5 uppercase tracking-[0.1em] text-ink opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
        </ol>
      </div>
    </nav>
  );
}
