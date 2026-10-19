import Image from "next/image";
import { ArrowDown, FileText } from "lucide-react";
import { now, profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import { hasInternshipStarted } from "@/lib/internship";
import heroPhoto from "@/public/images/profile home.png";
import InternshipText from "../ui/InternshipText";
import NowItem from "./NowItem";
import ButtonLink from "../ui/ButtonLink";
import { CornerMarks, enterStyle, Label, Panel } from "../ui/primitives";

/**
 * Centered hero: photo → name → bio → Now → actions, inside one Panel.
 * Plays the page-load entrance (.enter), staggered top to bottom.
 */
export default function Hero() {
  const started = hasInternshipStarted();
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-32">
      <div className="enter" style={enterStyle(0)}>
        <Panel className="flex flex-col items-center p-5 text-center sm:p-7">
          {/* Photo: sharp corners, field-style border and small corner marks. */}
          <div className="field-frame enter w-[180px] sm:w-[240px]" style={enterStyle(1)}>
            <CornerMarks inset="-4px" />
            <Image
              src={heroPhoto}
              alt={`Photo of ${profile.name} working on a laptop`}
              priority
              sizes="(min-width: 640px) 240px, 180px"
              placeholder="blur"
              className="block aspect-[3/4] w-full border border-[var(--field-line)] object-cover"
            />
          </div>

          <h1 id="hero-title" className="display enter mt-5" style={enterStyle(2)}>
            {profile.name}
          </h1>

          <p className="enter measure mt-4 text-ink" style={enterStyle(3)}>
            I build web apps end to end, from the interface to the database behind it. Aspiring Software &amp; AI/ML
            Engineer based in Davao City, Philippines, building web, mobile, and AI-powered projects. Open to opportunities
            and collaborations.
          </p>

          <div
            className="enter relative mt-8 w-full max-w-xl border border-line bg-bg p-5 text-left"
            style={enterStyle(4)}
          >
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

          {/* Side by side, stacked full-width on small phones. */}
          <div
            className="enter mt-8 flex w-full flex-col justify-center gap-3 min-[400px]:w-auto min-[400px]:flex-row"
            style={enterStyle(5)}
          >
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
        </Panel>
      </div>
    </section>
  );
}
