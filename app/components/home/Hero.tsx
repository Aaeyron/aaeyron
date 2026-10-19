import Image from "next/image";
import { ArrowDown, FileText } from "lucide-react";
import { capabilities, profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import heroPhoto from "@/public/images/profile home.png";
import ButtonLink from "../ui/ButtonLink";
import { CornerMarks, enterStyle, Label } from "../ui/primitives";

/**
 * Under 768px: one centered column (About → name → bio → photo → capabilities → buttons).
 * From 768px: intro + buttons on the left, photo + capabilities on the right. The right
 * column spans both rows, so the buttons (bottom row) sit level with the capabilities grid.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-32">
      <div className="grid-12 gap-y-12 md:grid-rows-[auto_1fr] md:gap-x-8">
        <div className="col-span-4 text-center sm:col-span-8 md:col-span-4 md:row-start-1 md:text-left lg:col-span-7">
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

        <div
          className="enter col-span-4 flex flex-col items-center sm:col-span-8 md:col-span-4 md:col-start-5 md:row-span-2 md:row-start-1 md:items-start lg:col-span-5 lg:col-start-8"
          style={enterStyle(3)}
        >
          {/* Photo: field-style border and corner marks, an offset outline frame behind it
              with an accent square on its far corner, and a small tab on the bottom border. */}
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

          {/* Capabilities: 2×2 grid with shared 1px field-style borders and corner marks around it. */}
          <div className="field-frame mt-10 w-full">
            <ul className="grid grid-cols-2 border-l border-t border-[var(--field-line)]">
              {capabilities.map((c, i) => (
                <li
                  key={c.title}
                  className="min-w-0 border-b border-r border-[var(--field-line)] bg-bg p-4 text-center md:text-left"
                >
                  <span aria-hidden className="font-mono text-[0.65rem] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-semibold leading-snug text-ink">{c.title}</p>
                  <p className="mt-1 text-sm leading-snug text-ink">{c.detail}</p>
                </li>
              ))}
            </ul>
            <CornerMarks inset="-4px" />
          </div>
        </div>

        {/* Bottom of the left column on desktop; last on mobile. Stacked full-width on small phones. */}
        <div
          className="enter col-span-4 flex flex-col justify-center gap-3 sm:col-span-8 min-[400px]:flex-row md:col-span-4 md:row-start-2 md:justify-start md:self-end lg:col-span-7"
          style={enterStyle(4)}
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
    </section>
  );
}
