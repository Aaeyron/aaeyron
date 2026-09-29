import { ArrowDown, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { now, profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import { hasInternshipStarted } from "@/lib/internship";
import InternshipText from "../ui/InternshipText";
import ButtonLink from "../ui/ButtonLink";
import { CornerMarks, enterStyle, Highlight, Label } from "../ui/primitives";

/** Short line with the full description in a tooltip (hover, keyboard focus or tap). */
function NowItem({ id, term, short, detail }: { id: string; term: string; short: ReactNode; detail: ReactNode }) {
  return (
    <div className="flex flex-col gap-x-4 sm:flex-row">
      <dt className="shrink-0 text-muted sm:w-20">{term}</dt>
      <dd className="group relative">
        <span
          tabIndex={0}
          aria-describedby={id}
          className="cursor-help underline decoration-line-strong decoration-dotted underline-offset-4 outline-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-accent"
        >
          {short}
        </span>
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none invisible absolute left-0 top-full z-10 mt-2 w-[min(20rem,80vw)] translate-y-1 rounded-md border border-line bg-bg p-3 font-sans text-sm leading-snug text-ink opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {detail}
        </span>
      </dd>
    </div>
  );
}

export default function Hero() {
  const started = hasInternshipStarted();
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-32">
      <div className="enter flex flex-wrap items-center gap-2" style={enterStyle(0)}>
        <span className="chip text-ink">
          <span aria-hidden className="status-dot" />
          {profile.status}
        </span>
        {/* Davao City's coordinates — a small technical detail. */}
        <span className="hidden font-mono text-xs text-muted sm:inline">
          <span className="sr-only">Coordinates: </span>7.07°N 125.61°E
        </span>
      </div>

      <h1 id="hero-title" className="display enter mt-8 max-w-[18ch]" style={enterStyle(1)}>
        I build web apps <Highlight>end to end</Highlight>, from the interface to the database behind it.
      </h1>

      <div className="grid-12 mt-10 gap-y-10">
        <p className="enter col-span-4 text-lg text-muted sm:col-span-6 lg:col-span-6" style={enterStyle(2)}>
          Aspiring Software &amp; AI/ML Engineer based in Davao City, Philippines, building web, mobile, and AI-powered
          projects. Open to opportunities and collaborations.
        </p>

        <div className="enter relative col-span-4 border border-line bg-bg p-5 sm:col-span-8 lg:col-span-5 lg:col-start-8" style={enterStyle(3)}>
          <CornerMarks />
          <div className="mb-4 flex items-center justify-between gap-4">
            <Label accent>Now</Label>
            <span aria-hidden className="font-mono text-[0.7rem] text-muted">
              status.log
            </span>
          </div>
          <dl className="space-y-2 border-l-2 border-accent pl-4 font-mono text-sm">
            <NowItem id="now-building" term="building" short={now.building.short} detail={now.building.detail} />
            <NowItem
              id="now-learning"
              term="learning"
              short={<InternshipText field="nowShort" serverStarted={started} />}
              detail={<InternshipText field="nowDetail" serverStarted={started} />}
            />
          </dl>
        </div>
      </div>

      {/* Side by side, stacked full-width on small phones. */}
      <div className="enter mt-10 flex flex-col gap-3 min-[400px]:flex-row" style={enterStyle(4)}>
        <ButtonLink href="#work" className="w-full min-[400px]:w-auto">
          See my work <ArrowDown size={17} aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5" />
        </ButtonLink>
        <ButtonLink
          href={resumeUrl}
          variant="secondary"
          external
          aria-label={resumeAriaLabel}
          className="w-full min-[400px]:w-auto"
        >
          <FileText size={17} aria-hidden /> View résumé
        </ButtonLink>
      </div>
    </section>
  );
}
