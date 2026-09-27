import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { profile, story } from "@/lib/content";
import ButtonLink from "../ui/ButtonLink";
import { Highlight } from "../ui/primitives";

export default function AboutTeaser() {
  return (
    <section aria-labelledby="about-title" className="section border-t border-line">
      <div className="container-x grid-12 items-center gap-y-10">
        <div className="col-span-4 sm:col-span-4 lg:col-span-4" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface">
            <Image
              src={profile.aboutImage}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="col-span-4 sm:col-span-8 lg:col-span-7 lg:col-start-6" data-reveal>
          <p className="label mb-4 flex gap-3">
            <span className="text-accent-text">04</span>
            <span>About</span>
          </p>
          <h2 id="about-title" className="h2">
            A developer in progress, <Highlight>building with intention</Highlight>.
          </h2>
          <div className="measure mt-6 space-y-4 text-muted">
            <p className="text-lg text-ink">{profile.intro}</p>
            <p>{story[1]}</p>
          </div>
          <ButtonLink href="/about" variant="secondary" className="mt-8">
            More about me <ArrowRight size={16} aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
