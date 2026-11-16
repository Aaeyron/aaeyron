import { ArrowDown, FileText } from "lucide-react";
import { profile, resumeAriaLabel, resumeUrl } from "@/lib/content";
import heroPhoto from "@/public/images/profile home.png";
import AiTools from "./AiTools";
import ButtonLink from "../ui/ButtonLink";
import PhotoFrame from "../ui/PhotoFrame";
import { CornerMarks, enterStyle, Label } from "../ui/primitives";

/**
 * From 768px: a text column (About label, then name → bio → buttons) beside the photo. The photo
 * starts in the About label's row, so the top of the label and the top of the frame line up; the
 * name/bio/buttons block is centred vertically in the rest of the photo's height, so the two sides
 * stay balanced without fixed offsets.
 * Under 768px: one left-aligned column (photo centered): About → name → bio → buttons → photo.
 *
 * The photo is sized exactly like the "05 Focus" photo (grid-12 col-span-4, 4:5), measured from
 * this section's content width via @container / cqw. On phones it's capped at 300px.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="@container container-x py-[var(--section-pad)]">
      <div className="grid gap-y-8 md:grid-cols-[minmax(0,1fr)_calc(50cqw-12px)] md:grid-rows-[auto_1fr] md:gap-x-10 lg:grid-cols-[minmax(0,1fr)_calc(100cqw/3-16px)] lg:gap-x-16">
        <div className="md:col-start-1 md:row-start-1">
          {/* md:flex (not a line box) so, beside the photo, the label's top border sits exactly on the
              row's top line. Phones keep the original line box. */}
          <div className="enter md:flex" style={enterStyle(0)}>
            {/* "About" + a short tagline, split by a thin divider (same as the index divider in <Label>). */}
            <Label className="field-label" wrap>
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>About</span>
                <span aria-hidden className="h-3 w-px bg-line-strong" />
                <span className="font-medium">Building web apps end to end</span>
              </span>
            </Label>
          </div>
        </div>

        {/* Name, bio and buttons as one block. From 768px it's centred in the row beside the photo
            (self-center), which keeps it balanced against the photo at every width. */}
        <div className="text-halo pt-6 md:col-start-1 md:row-start-2 md:self-center md:pt-0">
          {/* One word group per line so the name always breaks the same way. */}
          <h1
            id="hero-title"
            className="enter text-[clamp(2.75rem,5.5vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-ink"
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

          {/* Supporting lines under the bio: one size down and muted, so the bio stays the main
              paragraph; ~65 characters per line. Then the AI tools row. */}
          <div className="enter" style={enterStyle(2)}>
            <p className="mt-4 max-w-[65ch] text-muted">
              Currently focused on generative AI and prompt engineering.
            </p>
            <AiTools className="mt-5" />
          </div>

          {/* Buttons under the hero text: side by side and left-aligned at every width, 32px below
              it and 12px apart; they stack full width only on very narrow phones (<400px). */}
          <div className="enter mt-8 flex w-full flex-col gap-3 min-[400px]:flex-row" style={enterStyle(3)}>
            <ButtonLink href="#work" variant="ink" className="sharp w-full rounded-none! min-[400px]:w-auto">
              <CornerMarks inset="-4px" />
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

        {/* Photo in the shared PhotoFrame (same frame as the 05 Focus photo). From 768px it starts
            in the About label's row (both align to the top), so the label's top border and the
            frame's top border share one line, and spans the text row below. */}
        <div
          className="enter mx-auto mt-2 w-[min(100cqw,300px)] md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0 md:mt-0 md:w-full md:self-start"
          style={enterStyle(4)}
        >
          <PhotoFrame
            src={heroPhoto}
            alt={`Photo of ${profile.name} working on a laptop`}
            priority
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 300px"
            position="object-[50%_40%]"
            label="Aaeyron"
            fig="Fig. 01"
          />
        </div>
      </div>
    </section>
  );
}
