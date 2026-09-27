"use client";

import { useId, useRef, type RefObject } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import type { Certificate } from "@/lib/content";

/** Shared open/close logic so several triggers can open one certificate dialog. */
export function useCertificateDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = () => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.showModal();
  };
  return { dialogRef, returnFocus, open };
}

type DialogProps = {
  cert: Certificate;
  dialogRef: RefObject<HTMLDialogElement | null>;
  returnFocus: RefObject<HTMLElement | null>;
};

/** Large certificate preview. Esc, the close button or a backdrop click closes it; focus returns to the trigger. */
export function CertificateDialog({ cert, dialogRef, returnFocus }: DialogProps) {
  const titleId = useId();
  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      onClose={() => returnFocus.current?.focus()}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(60rem,calc(100vw-2rem))] max-w-none overflow-auto border border-line bg-bg p-0 text-ink"
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
  );
}

type ThumbProps = {
  cert: Certificate;
  onOpen: () => void;
  sizes: string;
  className?: string;
};

/** Clickable certificate thumbnail (the image itself is the trigger). */
export function CertificateThumb({ cert, onOpen, sizes, className = "" }: ThumbProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      className={`group/thumb relative block w-full overflow-hidden border border-line bg-surface transition-colors duration-200 hover:border-accent ${className}`}
    >
      <span className="relative block aspect-[1.414]">
        <Image
          src={cert.image}
          alt={cert.alt}
          fill
          sizes={sizes}
          className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.03] group-hover/thumb:scale-[1.03]"
        />
      </span>
      <span
        aria-hidden
        className="absolute right-1.5 top-1.5 grid size-7 place-items-center border border-line bg-bg/90 text-muted opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100"
      >
        <Maximize2 size={13} />
      </span>
      <span className="sr-only">, open larger preview</span>
    </button>
  );
}

