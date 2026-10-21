import Image, { type StaticImageData } from "next/image";
import { CornerMarks } from "./primitives";

/**
 * Shared frame for profile photos (home hero, 05 Focus, Experience): an outer 1px frame with
 * 12px padding and a fine diagonal hairline texture showing in that ring, corner marks,
 * registration ticks at the middle of each edge, the photo in its own 1px border, and a
 * caption bar (label · hairline · ink marker). Black/white only.
 */
export default function PhotoFrame({
  src,
  alt,
  sizes,
  label,
  priority = false,
  aspect = "aspect-[4/5]",
  position = "object-[50%_35%]",
  className = "",
}: {
  src: string | StaticImageData;
  alt: string;
  sizes: string;
  label: string;
  priority?: boolean;
  /** Tailwind aspect-ratio class for the photo. */
  aspect?: string;
  /** Tailwind object-position class (keeps the face in frame when cropped). */
  position?: string;
  className?: string;
}) {
  return (
    <figure className={`relative ${className}`}>
      <CornerMarks />
      <div className="field-frame relative border border-line bg-bg p-3">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--lines)_0_1px,transparent_1px_6px)]"
        />
        {/* Registration ticks at the middle of each edge, pointing inward. */}
        <span aria-hidden className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-line-strong" />
        <span aria-hidden className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-line-strong" />
        <span aria-hidden className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-line-strong" />
        <span aria-hidden className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-line-strong" />

        <div className={`relative ${aspect} overflow-hidden border border-[var(--field-line)] bg-surface`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder={typeof src === "string" ? "empty" : "blur"}
            className={`object-cover ${position}`}
          />
        </div>

        <figcaption className="relative mt-3 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
          <span>{label}</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span aria-hidden className="size-1.5 bg-ink" />
        </figcaption>
      </div>
    </figure>
  );
}
