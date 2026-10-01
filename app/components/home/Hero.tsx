import { ArrowDown, FileText } from "lucide-react";
import { now, profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import { hasInternshipStarted } from "@/lib/internship";
import InternshipText from "../ui/InternshipText";
import NowItem from "./NowItem";
import ButtonLink from "../ui/ButtonLink";
import { CornerMarks, enterStyle, Highlight, Label } from "../ui/primitives";

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
          <dl className="space-y-1 border-l-2 border-accent pl-4 font-mono text-sm">
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
