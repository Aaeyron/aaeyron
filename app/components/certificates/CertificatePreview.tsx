"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import type { Certificate } from "@/lib/content";

type Props = {
  cert: Certificate;
  /** "thumb" = small inline thumbnail, "card" = full-width card image. */
  variant?: "thumb" | "card";
  className?: string;
};

/** Certificate thumbnail that opens a larger preview in a modal dialog (Esc / close button / backdrop to close). */
export default function CertificatePreview({ cert, variant = "card", className = "" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className={`group relative block w-full overflow-hidden rounded-md border border-line bg-surface transition-colors duration-200 hover:border-accent ${className}`}
      >
        <span className="relative block aspect-[1.414]">
          <Image
            src={cert.image}
            alt={cert.alt}
            fill
            sizes={variant === "thumb" ? "(min-width: 640px) 160px, 50vw" : "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"}
            className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </span>
        <span
          aria-hidden
          className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-sm border border-line bg-bg/90 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 size={13} />
        </span>
        <span className="sr-only">, open larger preview</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onClose={() => triggerRef.current?.focus()}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(60rem,calc(100vw-2rem))] max-w-none overflow-auto rounded-lg border border-line bg-bg p-0 text-ink"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
          <div className="min-w-0 py-1.5">
            <h2 id={titleId} className="font-semibold leading-snug">
              {cert.title}
            </h2>
            <p className="label mt-1">
              {cert.issuer} · {cert.date}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            autoFocus
            aria-label="Close preview"
            className="tap -mr-2 inline-flex shrink-0 items-center justify-center rounded-md text-muted hover:text-ink"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        <div className="p-3 sm:p-6">
          <div className="relative aspect-[1.414] w-full bg-surface">
            <Image src={cert.image} alt={cert.alt} fill sizes="(min-width: 60rem) 60rem, 100vw" className="object-contain" />
          </div>
        </div>
      </dialog>
    </>
  );
}
