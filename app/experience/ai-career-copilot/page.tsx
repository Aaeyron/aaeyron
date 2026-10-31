import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { aiCareerCopilot as product, type ProductBullet } from "@/lib/content";
import SectionRail from "../../components/resources/SectionRail";
import ButtonLink from "../../components/ui/ButtonLink";
import { CornerMarks, Highlight, Label, LabelRule, PlusMarks, SectionHeader } from "../../components/ui/primitives";

export const metadata: Metadata = {
  title: "AI Career Copilot",
  alternates: { canonical: `/experience/${product.slug}` },
  description:
    "Case study: AI Career Copilot, an LLM resume analyzer built by Aaron Seth Nagtalon during an AI/ML internship at Apno AI (Oct 2026). Security, prompt engineering, reliability, evaluation and features.",
};

const pad = (n: number) => String(n).padStart(2, "0");
const caption = "font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted";
/** Body copy: 15–16px, ~1.65 line-height, ~65ch lines. */
const body = "max-w-[65ch] text-[0.9375rem] leading-[1.65] sm:text-base";
const sharpBtn = "sharp rounded-none!";

/**
 * Corner + texture per numbered section, so neighbours never match. Each card keeps to three
 * details: a corner treatment, a texture and the accent tick.
 */
const sectionLooks: { corner: "brackets" | "plus" | "notch"; tex: string }[] = [
  { corner: "brackets", tex: "tex-lines fade-tr" },
  { corner: "plus", tex: "tex-dots fade-br" },
  { corner: "notch", tex: "tex-grid fade-tr" },
  { corner: "brackets", tex: "tex-cross fade-bl" },
  { corner: "plus", tex: "tex-lines fade-br" },
  { corner: "notch", tex: "tex-dots fade-tr" },
  { corner: "brackets", tex: "tex-grid fade-bl" },
];

function Corner({ kind }: { kind: (typeof sectionLooks)[number]["corner"] }) {
  if (kind === "plus") return <PlusMarks />;
  if (kind === "notch") return <span aria-hidden className="notch" />;
  return <CornerMarks />;
}

function Bullet({ item }: { item: ProductBullet }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 bg-ink" />
      <span>
        {typeof item === "string" ? (
          item
        ) : (
          <>
            <strong className="font-semibold text-ink">{item.lead}</strong> {item.text}
          </>
        )}
      </span>
    </li>
  );
}

/** "← Back to Experience": a normal link to the internship section (new tab / middle click work). */
function BackLink({ className = "" }: { className?: string }) {
  return (
    <ButtonLink href="/experience#internship" variant="secondary" className={`${sharpBtn} ${className}`}>
      <ArrowLeft size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5" />
      Back to Experience
    </ButtonLink>
  );
}

function ExternalButton({ href, variant, children }: { href: string; variant: "primary" | "secondary"; children: ReactNode }) {
  return (
    <ButtonLink href={href} external variant={variant} className={sharpBtn}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
      <ArrowUpRight
        size={16}
        aria-hidden
        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </ButtonLink>
  );
}

/**
 * Case study for AI Career Copilot (built during the Apno AI internship). Linked from the
 * internship card on /experience; not in the nav, so the navbar keeps Experience active
 * (isActivePath matches /experience/*). Everything is visible (no accordions); the seven
 * numbered sections get the desktop-only section rail (≥1280px) from /resources.
 */
export default function AiCareerCopilotPage() {
  return (
    <div className="container-x section pt-[var(--section-header-gap)]">
      <div className="enter mb-[var(--section-header-gap)]">
        <BackLink />
      </div>

      <SectionHeader
        as="h1"
        rule
        index="03"
        label="Internship · Case study"
        title={
          <>
            <Highlight>{product.titleHighlight}</Highlight>
            {product.titleTail}
          </>
        }
      >
        <p className="font-mono text-xs">{product.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ExternalButton href={product.links.live} variant="primary">
            View live
          </ExternalButton>
          <ExternalButton href={product.links.code} variant="secondary">
            View code
          </ExternalButton>
        </div>
      </SectionHeader>

      {/* Overview + starting point. */}
      <section aria-label="Overview" className="grid gap-8 lg:grid-cols-12" data-reveal>
        <div className="lg:col-span-8">
          <p className={caption}>Overview</p>
          <p className="mt-3 max-w-[65ch] text-lg leading-[1.65] text-ink">{product.overview}</p>
          <div className="mt-8 border-l-2 border-accent pl-4">
            <p className={caption}>Starting point</p>
            <p className={`mt-1.5 text-muted ${body}`}>{product.startingPoint}</p>
          </div>
        </div>
      </section>

      {/* Key numbers: the page's visual highlight. Static card (no hover): card shadow, corner
          brackets, a dot texture from the bottom-right and the accent tick. */}
      <section aria-labelledby="numbers-title" className="mt-[var(--block-gap)]" data-reveal>
        <h2 id="numbers-title" className={caption}>
          Key numbers
        </h2>
        <div className="card relative mt-4 border border-line bg-bg">
          <CornerMarks />
          <span aria-hidden className="tex tex-dots fade-br" />
          <span aria-hidden className="absolute -left-px top-6 h-5 w-0.5 bg-accent" />
          <dl className="relative grid sm:grid-cols-3">
            {product.stats.map((s, n) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse justify-end gap-2 p-6 sm:p-8 ${
                  n > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""
                }`}
              >
                <dt className="text-[0.9375rem] leading-snug text-muted">{s.label}</dt>
                <dd className="text-4xl font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums sm:text-5xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Stack. */}
      <section aria-labelledby="stack-title" className="mt-10" data-reveal>
        <h2 id="stack-title" className={caption}>
          Stack
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.stack.map((t) => (
            <li key={t}>
              <Label plain wrap>
                {t}
              </Label>
            </li>
          ))}
        </ul>
      </section>

      <hr className="my-[var(--block-gap)] border-line" />

      {/* Numbered sections 01–07, with the desktop rail sticky in the left gutter. */}
      <div className="relative">
        <SectionRail sections={product.groups.map((g) => ({ id: g.id, label: g.title }))} />
        <div className="space-y-[var(--block-gap)]">
          {product.groups.map((g, i) => {
            const look = sectionLooks[i % sectionLooks.length];
            const titleId = `${g.id}-title`;
            return (
              <section key={g.id} id={g.id} aria-labelledby={titleId} className="scroll-mt-28" data-reveal>
                <div className="card relative border border-line bg-bg p-6 sm:p-8">
                  <Corner kind={look.corner} />
                  <span aria-hidden className={`tex ${look.tex}`} />
                  <span aria-hidden className="absolute -left-px top-7 h-5 w-0.5 bg-accent sm:top-9" />
                  <div className="relative grid gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4">
                      <LabelRule index={pad(i + 1)} className="max-w-56">
                        Section
                      </LabelRule>
                      <h2 id={titleId} className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink">
                        {g.title}
                      </h2>
                    </div>
                    <ul className={`space-y-3 text-muted lg:col-span-8 ${body}`}>
                      {g.items.map((item, n) => (
                        <Bullet key={n} item={item} />
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Footer notes + the second back link. */}
      <div className="mt-[var(--block-gap)] border-t border-line pt-6">
        <div className="space-y-1.5 text-sm leading-relaxed text-muted">
          {product.footnotes.map((f) => (
            <p key={f} className="max-w-[70ch]">
              {f}
            </p>
          ))}
        </div>
        <BackLink className="mt-10" />
      </div>
    </div>
  );
}
