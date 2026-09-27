/**
 * Internship status that switches automatically on the start date.
 *
 * Start: October 1, 2026, 00:00 in the Philippines (UTC+8).
 * - Before: "incoming" wording and a "Starting Oct 1, 2026" badge.
 * - From then on: "currently" wording and "Oct 2026 · Present" with the pulsing dot.
 *
 * Server pages compute this at render time (and revalidate hourly), and the
 * client re-checks after hydration via useInternshipStarted(), which starts
 * from the server's value so there's never a hydration mismatch.
 */
export const INTERNSHIP_START = new Date("2026-10-01T00:00:00+08:00");

export const hasInternshipStarted = (now: Date = new Date()) => now.getTime() >= INTERNSHIP_START.getTime();

const org = "a Government of India registered MSME enterprise";

export const internshipCopy = (started: boolean) =>
  started
    ? {
        badge: "Oct 2026 · Present",
        nowShort: "AI/ML Engineer Intern @ Apno AI",
        nowDetail: `AI/ML engineering. I’m currently an AI/ML Engineer intern at Apno AI, ${org}.`,
        headingLead: "Where I’m",
        meta: "an AI/ML Engineer internship at Apno AI",
      }
    : {
        badge: "Starting Oct 1, 2026",
        nowShort: "Incoming AI/ML Engineer Intern @ Apno AI",
        nowDetail: `AI/ML engineering. I’m an incoming AI/ML Engineer intern at Apno AI (starting October 2026), ${org}.`,
        headingLead: "Where I’ll be",
        meta: "an incoming AI/ML Engineer internship at Apno AI (starting October 2026)",
      };

export type InternshipCopy = ReturnType<typeof internshipCopy>;
