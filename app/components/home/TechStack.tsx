import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { techStack } from "@/lib/content";
import TechChip from "../stack/TechChip";
import { Highlight, Label, SectionHeader } from "../ui/primitives";

/**
 * Accent treatment, matching the other sections (max ~3 accent touches per element):
 * - header: accent "03" and the drawn-in rule with an accent tip (SectionHeader `rule`).
 * - group headings: a short accent tick, the accent group number, a neutral hairline.
 * - items: TechChip (static labels with the card shadow; they don't react on hover).
 * A "See the full stack" link in the header's action slot goes to /stack.
 */
export default function TechStack() {
  return (
    <section aria-labelledby="stack-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeader
          rule
          id="stack-title"
          index="03"
          label="Tech Stack"
          title={<>What I <Highlight>work</Highlight> with.</>}
          action={
            <Link
              href="/stack"
              className="group inline-flex min-h-11 items-center gap-1.5 font-medium text-ink"
            >
              See the full stack
              <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          }
        >
          <p>Languages, frameworks, and tools I’ve used in my projects.</p>
        </SectionHeader>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, g) => (
            <div key={group.group}>
              <h3 className="mb-4 flex items-center gap-3" data-reveal>
                <span aria-hidden className="h-4 w-0.5 shrink-0 bg-accent" />
                <Label index={String(g + 1).padStart(2, "0")}>{group.group}</Label>
                <span aria-hidden className="h-px min-w-6 flex-1 bg-line" />
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.name} data-reveal>
                    <TechChip item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
