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
 * Intro (About, status, name, bio) across the top. Below it: the photo, with the four
 * capability boxes to its right (tops aligned) and the buttons under them.
 * Under 768px everything stacks, centered: intro → photo → capabilities → buttons.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-32">
      <div className="grid gap-y-12 md:grid-cols-[auto_minmax(0,36rem)] md:gap-x-8">
        <div className="text-center md:col-span-2 md:text-left">
          <div className="enter" style={enterStyle(0)}>
            <Label className="field-label mb-5">About</Label>
          </div>
          <div className="enter flex flex-wrap items-center justify-center gap-2 md:justify-start" style={enterStyle(0)}>
            <span className="chip text-ink">
              <span aria-hidden className="status-dot" />
              {profile.status}
            </span>
            {/* Davao City's coordinates — a small technical detail. */}
            <span className="hidden font-mono text-xs text-muted sm:inline">
              <span className="sr-only">Coordinates: </span>7.07°N 125.61°E
            </span>
          </div>

          {/* One word group per line so the name always breaks the same way. */}
          <h1
            id="hero-title"
            className="enter mt-8 text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-ink"
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
        </div>

        {/* Photo: field-style border and corner marks, an offset outline frame behind it
            with an accent square on its far corner, and a small tab on the bottom border. */}
        <div className="enter justify-self-center md:justify-self-start" style={enterStyle(3)}>
          <div className="field-frame w-[200px] sm:w-[280px]">
            <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-line-strong">
              <span className="absolute -bottom-[3px] -right-[3px] size-1.5 bg-accent" />
            </span>
            <Image
              src={heroPhoto}
              alt={`Photo of ${profile.name} working on a laptop`}
              priority
              sizes="(min-width: 640px) 280px, 200px"
              placeholder="blur"
              className="relative block aspect-[3/4] w-full border border-[var(--field-line)] object-cover"
            />
            <CornerMarks inset="-4px" />
            <span className="chip absolute -bottom-2.5 left-3 z-10 py-0 text-[0.65rem]">4th-year IT student</span>
          </div>
        </div>

        <div className="min-w-0">
          {/* Capabilities: one box each, stacked. Each box has crop marks on two corners and a
              short accent tick on its left border, level with the title. */}
          <ul className="enter grid gap-3" style={enterStyle(4)}>
            {capabilities.map((c) => (
              <li key={c.title} className="field-frame border border-[var(--field-line)] bg-bg p-4 md:p-3 lg:p-4">
                <span aria-hidden className="corner" style={markTL} />
                <span aria-hidden className="corner" style={markBR} />
                <span aria-hidden className="absolute -left-px top-4 h-5 w-0.5 bg-accent md:top-3 lg:top-4" />
                <p className="font-semibold leading-snug tracking-[-0.01em] text-ink">{c.title}</p>
                <p className="mt-1 text-[0.9375rem] leading-snug text-ink">{c.detail}</p>
              </li>
            ))}
          </ul>

          {/* Under the capabilities. Stacked full-width on small phones. */}
          <div
            className="enter mt-8 flex flex-col justify-center gap-3 min-[400px]:flex-row md:justify-start"
            style={enterStyle(5)}
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
      </div>
    </section>
  );
}
