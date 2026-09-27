"use client";

import { useSyncExternalStore } from "react";
import { hasInternshipStarted, internshipCopy, type InternshipCopy } from "@/lib/internship";

const noopSubscribe = () => () => {};

/**
 * Starts from the server's value (so hydration always matches), then
 * re-checks the real date on the client, e.g. if a cached page was built
 * before October 1 but is viewed after.
 */
export function useInternshipStarted(serverStarted: boolean) {
  return useSyncExternalStore(noopSubscribe, () => hasInternshipStarted(), () => serverStarted);
}

/** Renders one piece of internship copy that switches automatically on the start date. */
export default function InternshipText({ field, serverStarted }: { field: keyof InternshipCopy; serverStarted: boolean }) {
  const started = useInternshipStarted(serverStarted);
  return <>{internshipCopy(started)[field]}</>;
}

/** Status badge: "Starting Oct 1, 2026" before the start date, "Oct 2026 · Present" with the pulsing dot after. */
export function InternshipBadge({ serverStarted }: { serverStarted: boolean }) {
  const started = useInternshipStarted(serverStarted);
  return (
    <span className={`chip ${started ? "chip-accent" : ""}`}>
      <span className="inline-flex items-center gap-2">
        {started ? <span aria-hidden className="status-dot" /> : <span aria-hidden className="size-1.5 border border-accent" />}
        {internshipCopy(started).badge}
      </span>
    </span>
  );
}
