import { ArrowDown, Download } from "lucide-react";
import { now, profile } from "@/lib/content";
import ButtonLink from "../ui/ButtonLink";
import { Highlight, Txt } from "../ui/primitives";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-32">
      <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
        <span aria-hidden className="status-dot" />
        <span className="text-ink">{profile.status}</span>
        <span aria-hidden>/</span>
        <span>{profile.location}</span>
      </p>

      <h1 id="hero-title" className="display mt-8 max-w-[18ch]">
        I build web apps <Highlight>end to end</Highlight>, from the interface to the database behind it.
      </h1>

      <div className="grid-12 mt-10 gap-y-10">
        <p className="col-span-4 text-lg text-muted sm:col-span-6 lg:col-span-6">
          I’m {profile.name}, an aspiring full-stack developer and AI/ML learner in Davao City, looking for internships
          and mentorship.
        </p>

        <div className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8">
          <p className="label mb-3">Now</p>
          <dl className="space-y-2 border-l-2 border-accent pl-4 font-mono text-sm">
            <div className="flex flex-col gap-x-4 sm:flex-row">
              <dt className="shrink-0 text-muted sm:w-20">building</dt>
              <dd>
                <Txt>{now.building}</Txt>
              </dd>
            </div>
            <div className="flex flex-col gap-x-4 sm:flex-row">
              <dt className="shrink-0 text-muted sm:w-20">learning</dt>
              <dd>
                <Txt>{now.learning}</Txt>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="#work">
          See my work <ArrowDown size={17} aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5" />
        </ButtonLink>
        <ButtonLink href={profile.resume} variant="secondary" download>
          <Download size={17} aria-hidden /> Download résumé
        </ButtonLink>
      </div>
    </section>
  );
}
