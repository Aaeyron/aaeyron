import Image from "next/image";
import { ArrowDown, FileText } from "lucide-react";
import { now, profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import { hasInternshipStarted } from "@/lib/internship";
import heroPhoto from "@/public/images/profile home.png";
import InternshipText from "../ui/InternshipText";
import NowItem from "./NowItem";
import ButtonLink from "../ui/ButtonLink";
import { CornerMarks, enterStyle, Label } from "../ui/primitives";

export default function Hero() {
  const started = hasInternshipStarted();
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-32">
      {/* Left: status, name, bio, actions. Right: photo + Now. Stacked below 1024px.
          Columns stretch to equal height, so the actions sit level with the bottom of Now. */}
      <div className="grid-12 gap-y-14 lg:gap-x-8">
        <div className="col-span-4 flex flex-col sm:col-span-8 lg:col-span-7">
          <div className="enter" style={enterStyle(0)}>
            <Label className="field-label mb-5">About</Label>
          </div>
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
            className="enter draw-x mt-6 block h-px w-full max-w-64 bg-[linear-gradient(to_right,var(--accent)_0,var(--accent)_28px,var(--line-strong)_28px)]"
            style={enterStyle(1)}
          />

          <p className="enter measure mt-6 text-lg text-muted" style={enterStyle(2)}>
            Aspiring Software &amp; AI/ML Engineer based in Davao City, Philippines, building web, mobile, and AI-powered
            projects. Open to opportunities and collaborations.
          </p>

          {/* Side by side, stacked full-width on small phones. Pushed to the bottom on desktop. */}
          <div className="enter mt-10 flex flex-col gap-3 min-[400px]:flex-row lg:mt-auto lg:pt-10" style={enterStyle(3)}>
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
        </div>

        <div className="enter col-span-4 sm:col-span-8 lg:col-span-5" style={enterStyle(4)}>
          <Label className="field-label mb-5">Profile</Label>
          {/* Photo: field-style border and corner marks, an offset outline frame behind it
              with an accent square on its far corner, and a location tab on the bottom border. */}
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
            <span className="chip absolute -bottom-2.5 left-3 z-10 py-0 text-[0.65rem]">
              <span className="sr-only">Location: </span>
              {profile.locationShort}
            </span>
          </div>

          <div className="relative mt-10 border border-line bg-bg p-5">
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
      </div>
    </section>
  );
}
