import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { capabilities, profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import heroPhoto from "@/public/images/profile home.png";
import ButtonLink from "../ui/ButtonLink";
import { CornerMarks, enterStyle, Label } from "../ui/primitives";

// Two of the four crop marks (top-left, bottom-right) for each capability box.
const markTL: CSSProperties = { top: -4, left: -4, borderTopWidth: 1, borderLeftWidth: 1, transformOrigin: "top left" };
const markBR: CSSProperties = { bottom: -4, right: -4, borderBottomWidth: 1, borderRightWidth: 1, transformOrigin: "bottom right" };

/**
 * From 768px: row 1 holds the About label (left only). Row 2 holds name, bio and buttons on
 * the left, photo + capabilities on the right, so the photo's top lines up with the name.
 * The buttons are pushed to the bottom of row 2, level with the last capability box.
 * Under 768px everything stacks, centered: About → name → bio → buttons → photo → capabilities.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-32">
      <div className="grid gap-y-8 md:grid-cols-[minmax(0,1fr)_18.5rem] md:gap-x-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-x-10">
        {/* Left-aligned at every size (the rest of the hero is centered on mobile). */}
        <div className="md:col-start-1">
          <div className="enter" style={enterStyle(0)}>
            <Label className="field-label">About</Label>
          </div>
        </div>

        <div className="flex flex-col text-center md:col-start-1 md:row-start-2 md:text-left">
          {/* One word group per line so the name always breaks the same way. */}
          <h1
            id="hero-title"
            className="enter text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-ink"
            style={enterStyle(1)}
          >
            <span className="block">Aaron Seth</span>
            <span className="block">Nagtalon</span>
          </h1>
          {/* Thin rule with an accent tip that draws in under the name (same motif as section labels). */}
          <span
            aria-hidden
            className="enter draw-x mx-auto mt-6 block h-px w-full max-w-64 bg-[linear-gradient(to_right,var(--accent)_0,var(--accent)_28px,var(--line-strong)_28px)] md:mx-0"
            style={enterStyle(1)}
          />

          <p className="enter measure mx-auto mt-6 text-lg text-muted md:mx-0" style={enterStyle(2)}>
            Aspiring Software &amp; AI/ML Engineer based in Davao City, Philippines, building web, mobile, and AI-powered
            projects. Open to opportunities and collaborations.
          </p>

          {/* Below the bio; pushed to the bottom on desktop. Stacked full-width on small phones. */}
          <div
            className="enter mt-10 flex flex-col justify-center gap-3 min-[400px]:flex-row md:mt-auto md:justify-start md:pt-10"
            style={enterStyle(3)}
          >
            <ButtonLink href="#work" className="sharp w-full rounded-none! min-[400px]:w-auto">
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

        {/* Photo + capabilities share one column as wide as the photo (--photo-w: 240px, 300px from
            768px, 330px from 1024px), starting where it always has; a bigger photo grows rightward. */}
        <div className="mx-auto mt-6 w-[var(--photo-w)] [--photo-w:240px] md:col-start-2 md:row-start-2 md:mx-0 md:mt-0 md:[--photo-w:300px] lg:[--photo-w:330px]">
          {/* Photo: field-style border and corner marks, an offset outline frame behind it
              with an accent square on its far corner, and a small tab on the bottom border. */}
          <div className="enter" style={enterStyle(3)}>
            <div className="field-frame">
              <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-line-strong">
                <span className="absolute -bottom-[3px] -right-[3px] size-1.5 bg-accent" />
              </span>
              <Image
                src={heroPhoto}
                alt={`Photo of ${profile.name} working on a laptop`}
                priority
                sizes="(min-width: 1024px) 330px, (min-width: 768px) 300px, 240px"
                placeholder="blur"
                className="relative block aspect-[3/4] w-full border border-[var(--field-line)] object-cover"
              />
              <CornerMarks inset="-4px" />
              <span className="chip absolute -bottom-2.5 left-3 z-10 py-0 text-[0.65rem]">4th-year IT student</span>
            </div>
          </div>

          {/* Capabilities: one box each, stacked. Each box has crop marks on two corners and a
              short accent tick on its left border, level with the title.
              Wider than the photo (--cap-w: 290px, 370px from 768px, 410px from 1024px): the negative
              left margin equals the extra width, so the right edge stays on the photo's right edge and
              only the left edge grows. On narrow phones the width caps at 50vw + 104px, which keeps
              the boxes' left edge at least 16px from the screen edge (photo is centered there). */}
          <ul
            className="enter mt-8 ml-[calc(var(--photo-w)-var(--cap-w))] grid w-[var(--cap-w)] gap-3 [--cap-w:min(290px,calc(50vw+104px))] md:[--cap-w:370px] lg:[--cap-w:410px]"
            style={enterStyle(4)}
          >
            {capabilities.map((c) => (
              <li key={c.title} className="field-frame border border-[var(--field-line)] bg-bg p-3">
                <span aria-hidden className="corner" style={markTL} />
                <span aria-hidden className="corner" style={markBR} />
                <span aria-hidden className="absolute -left-px top-3 h-4 w-0.5 bg-accent" />
                <p className="text-base font-semibold leading-snug tracking-[-0.01em] text-ink">{c.title}</p>
                <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink">{c.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
