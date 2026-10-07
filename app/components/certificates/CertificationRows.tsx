"use client";

import { ArrowUpRight } from "lucide-react";
import type { Certificate } from "@/lib/content";
import { CornerMarks, Label } from "../ui/primitives";
import { CertificateDialog, CertificateThumb, useCertificateDialog } from "./CertificatePreview";

function CertificationRow({ cert, index, boxed }: { cert: Certificate; index: number; boxed: boolean }) {
  const { dialogRef, returnFocus, open } = useCertificateDialog();
  const num = String(index + 1).padStart(2, "0");
  const titleId = `cert-${cert.id}`;

  return (
    <li
      className={`group relative ${
        boxed
          ? "border border-line bg-bg p-5 transition-colors duration-200 hover:border-accent focus-within:border-accent sm:p-8"
          : "border-t border-line py-10 sm:py-12"
      }`}
      data-reveal
    >
      {boxed && <CornerMarks hover />}
      {/* Thin accent line that draws across the top divider on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
      />

      <article aria-labelledby={titleId} className="grid-12 items-center gap-y-8">
        <div className="col-span-4 sm:col-span-4 lg:col-span-5">
          <div className="relative">
            <CornerMarks hover />
            <CertificateThumb
              cert={cert}
              onOpen={open}
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="col-span-4 sm:col-span-4 lg:col-span-6 lg:col-start-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-sm text-accent-text">{num}</span>
            <Label>Certificate</Label>
            <Label plain wrap>
              {cert.issuer}
            </Label>
          </div>

          <h3 id={titleId} className="mt-5 text-2xl font-semibold tracking-[-0.025em] sm:text-[1.75rem]">
            {cert.title}
          </h3>

          {cert.description && (
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {cert.description}
            </p>
          )}

          <dl className="mt-6 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-l border-line pl-4 text-sm">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">Issued</dt>
            <dd>
              <time>{cert.date}</time>
            </dd>
          </dl>

          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn mt-6 inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text"
            >
              Verify Credentials
              <span className="sr-only">: {cert.title} (opens in a new tab)</span>
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              />
            </a>
          ) : (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={open}
              className="group/btn mt-6 inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text"
            >
              View certificate <span className="sr-only">: {cert.title}</span>
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              />
            </button>
          )}
        </div>
      </article>

      <CertificateDialog cert={cert} dialogRef={dialogRef} returnFocus={returnFocus} />
    </li>
  );
}

/** `boxed` = each row in a bordered container with corner marks (Experience page).
 *  Full-width stacked certificate rows (thumbnail + details), one per row on every screen size. */
export default function CertificationRows({ certs, boxed = false }: { certs: Certificate[]; boxed?: boolean }) {
  return (
    <ol className={boxed ? "grid gap-8" : "border-b border-line"}>
      {certs.map((cert, i) => (
        <CertificationRow key={cert.id} cert={cert} index={i} boxed={boxed} />
      ))}
    </ol>
  );
}
