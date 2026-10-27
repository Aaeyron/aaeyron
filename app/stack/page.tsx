import type { Metadata } from "next";
import { techStack } from "@/lib/content";
import TechChip from "../components/stack/TechChip";
import { CornerMarks, Highlight, LabelRule, SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Stack",
  alternates: { canonical: "/stack" },
  description:
    "The languages, frameworks, databases, tools and design apps Aaron Seth Nagtalon builds with.",
};

const pad = (n: number) => String(n).padStart(2, "0");

/** One-line description per category (same categories and items as the home Tech Stack). */
const blurbs: Record<string, string> = {
  Languages: "The languages I write code in.",
  "Frontend & Mobile": "What I build web interfaces and mobile apps with.",
  Backend: "Servers, APIs and the logic behind them.",
  Databases: "Where the data lives.",
  "Tools & Deployment": "Testing APIs, building and shipping.",
  Design: "Planning screens, flows and visuals.",
};

/** A different texture per section so neighbouring panels don't look identical. */
const textures = ["tex-dots", "tex-grid", "tex-lines", "tex-cross"];

/**
 * /stack: every category from lib/content.ts `techStack` as its own numbered section (label +
 * rule, heading, one-line description), with the items as TechChips inside a framed panel
 * (corner marks + a fading texture). Same data as the home section; nothing new is added.
 */
export default function Stack() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" rule label="Stack" title={<>What I <Highlight>work</Highlight> with.</>}>
        <p>Languages, frameworks and tools I build with.</p>
      </SectionHeader>

      <div className="space-y-16 sm:space-y-20">
        {techStack.map((group, gi) => {
          const id = group.group.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");
          return (
            <section key={group.group} id={id} aria-labelledby={`${id}-title`}>
              <div data-reveal>
                <LabelRule index={pad(gi + 1)} className="mb-5">
                  {group.group}
                </LabelRule>
                <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                  {group.group}
                </h2>
                {blurbs[group.group] && <p className="mt-2 text-muted">{blurbs[group.group]}</p>}
              </div>

              <div className="relative mt-8 border border-line bg-bg p-6 sm:p-8" data-reveal>
                <CornerMarks />
                <span aria-hidden className={`tex fade-br ${textures[gi % textures.length]}`} />
                <ul className="relative flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <TechChip item={item} size="lg" />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
