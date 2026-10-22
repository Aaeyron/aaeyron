import { ArrowRight } from "lucide-react";
import { homeFocus, profile } from "@/lib/content";
import ButtonLink from "../ui/ButtonLink";
import PhotoFrame from "../ui/PhotoFrame";
import { Label } from "../ui/primitives";

export default function AboutTeaser() {
  return (
    <section aria-labelledby="focus-title" className="section border-t border-line">
      <div className="container-x grid-12 items-center gap-y-10">
        <div className="col-span-4 sm:col-span-4 lg:col-span-4" data-reveal>
          <PhotoFrame
            src={profile.photo}
            alt={profile.name}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label="aaeyron"
            fig="Fig. 02"
          />
        </div>

        <div className="col-span-4 sm:col-span-8 lg:col-span-7 lg:col-start-6" data-reveal>
          <Label index="05" className="mb-5">
            Focus
          </Label>
          <h2 id="focus-title" className="h2">
            {homeFocus.heading}
          </h2>
          <p className="measure mt-6 text-lg text-ink">{homeFocus.text}</p>
          <ButtonLink href="/experience" variant="secondary" className="mt-8">
            More about me <ArrowRight size={16} aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
