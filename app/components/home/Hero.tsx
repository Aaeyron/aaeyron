import type { CSSProperties } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { capabilities, profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import heroPhoto from "@/public/images/profile home.png";
import ButtonLink from "../ui/ButtonLink";
import Doodle from "../ui/Doodle";
import PhotoFrame from "../ui/PhotoFrame";
import { CornerMarks, enterStyle, Label } from "../ui/primitives";

// Two of the four crop marks (top-left, bottom-right) for each capability box.
const markTL: CSSProperties = { top: -4, left: -4, borderTopWidth: 1, borderLeftWidth: 1, transformOrigin: "top left" };
const markBR: CSSProperties = { bottom: -4, right: -4, borderBottomWidth: 1, borderRightWidth: 1, transformOrigin: "bottom right" };

/**
 * From 768px: a text column (name → bio → capabilities → buttons) beside the photo. The About
 * label sits in its own row, so the photo's top lines up with the name. The text column and the
 * photo end at about the same height, so nothing is left floating and the buttons stay in view.
 * Under 768px: one left-aligned column (photo centered): About → name → bio → photo → capabilities → buttons.
 *
 * The photo is sized exactly like the "05 Focus" photo (grid-12 col-span-4, 4:5), measured from
 * this section's content width via @container / cqw. On phones it's capped at 300px so the
 * capabilities and buttons aren't pushed far down.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="@container container-x pb-20 pt-12 sm:pb-28 sm:pt-20 lg:pt-24">
      <div className="grid gap-y-8 md:grid-cols-[minmax(0,1fr)_calc(50cqw-12px)] md:grid-rows-[auto_auto_auto_auto_1fr] md:gap-x-10 lg:grid-cols-[minmax(0,1fr)_calc(100cqw/3-16px)] lg:gap-x-16">
        <div className="md:col-start-1 md:row-start-1">
          <div className="enter" style={enterStyle(0)}>
            {/* "About" + a short tagline, split by a thin divider (same as the index divider in <Label>). */}
            <Label className="field-label" wrap>
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>About</span>
                <span aria-hidden className="h-3 w-px bg-line-strong" />
                <span className="font-medium">Building web apps end to end</span>
              </span>
            </Label>
          </div>
        </div>

        {/* Top padding lowers name + bio toward the photo's vertical middle (photo itself stays put). */}
        <div className="pt-6 md:col-start-1 md:row-start-2 md:pt-9 lg:pt-14">
          {/* One word group per line so the name always breaks the same way. */}
          <h1
            id="hero-title"
            className="enter text-[clamp(2.75rem,5.5vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-ink"
            style={enterStyle(1)}
          >
            <span className="block">Aaron Seth</span>
            <span className="block">Nagtalon</span>
          </h1>
          {/* Thin rule with an accent tip that draws in under the name (same motif as section labels). */}
          <span
            aria-hidden
            className="enter draw-x mt-6 block h-px w-full max-w-64 bg-[linear-gradient(to_right,var(--accent)_0,var(--accent)_28px,var(--line-strong)_28px)]"
            style={enterStyle(1)}
          />
          <p className="enter measure mt-6 text-lg text-muted" style={enterStyle(2)}>
            Aspiring Software &amp; AI/ML Engineer based in Davao City, Philippines, building web, mobile, and AI-powered
            projects. Open to opportunities and collaborations.
          </p>
        </div>

        {/* Photo in the shared PhotoFrame (same frame as the 05 Focus and Experience photos).
            Spans the text rows on desktop; the trailing 1fr row absorbs any extra height. */}
        <div
          className="enter mx-auto mt-2 w-[min(100cqw,300px)] md:col-start-2 md:row-span-4 md:row-start-2 md:mx-0 md:mt-0 md:w-full md:self-start"
          style={enterStyle(3)}
        >
          <PhotoFrame
            src={heroPhoto}
            alt={`Photo of ${profile.name} working on a laptop`}
            priority
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 300px"
            position="object-[50%_40%]"
            label="Aaeyron"
            fig="Fig. 01"
          />
        </div>

        {/* Capabilities: a small caption + hairline rule, then the boxes side by side under the bio
            on desktop (same width as the bio), stacked below that. Each box (static, not clickable): card shadow,
            crop marks on two corners and an accent tick on the left border.
            A small hand-drawn arrow points at them. */}
        <div
          className="enter measure mt-4 w-full md:col-start-1 md:row-start-3 md:mt-2"
          style={enterStyle(4)}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Capabilities</span>
            <Doodle variant="arrow" className="-mb-3 h-4 w-6 shrink-0 text-muted" />
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
          <ul className="grid gap-3 text-left lg:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.title} className="field-frame card relative border border-[var(--field-line)] bg-bg p-3">
                <span aria-hidden className="corner" style={markTL} />
                <span aria-hidden className="corner" style={markBR} />
                <span aria-hidden className="absolute -left-px top-3 h-4 w-0.5 bg-accent" />
                <p className="text-base font-semibold leading-snug tracking-[-0.01em] text-ink">{c.title}</p>
                <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink">{c.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Directly under the capabilities, set off by a hairline divider the same width as the
            bio and boxes. Stacked full-width on small phones. */}
        <div
          className="enter measure flex w-full flex-col gap-3 border-t border-line pt-6 min-[400px]:flex-row md:col-start-1 md:row-start-4"
          style={enterStyle(5)}
        >
          <ButtonLink href="#work" variant="ink" className="sharp w-full rounded-none! min-[400px]:w-auto">
            <CornerMarks inset="-4px" />
            See my work <ArrowDown size={17} aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5" />
          </ButtonLink>
          <ButtonLink
            href={resumeUrl}
            variant="secondary"
            external
            aria-label={resumeAriaLabel}
            className="sharp w-full rounded-none! min-[400px]:w-auto"
          >
            <FileText size={17} aria-hidden /> View résumé
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
