import { Suspense } from "react";
import { ArrowUpRight, GitCommitHorizontal } from "lucide-react";
import { githubUser } from "@/lib/content";
import { getRecentCommits, getTopLanguages } from "@/lib/github-activity";
import { CornerMarks } from "../ui/primitives";

const commitDate = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Manila" });
const commitTime = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Manila" });

function Status({ children }: { children: React.ReactNode }) {
  return <p role="status" className="mt-6 text-sm leading-relaxed text-muted">{children}</p>;
}

async function RecentCommits() {
  const commits = await getRecentCommits();
  if (!commits) return <Status>Recent commits are unavailable right now. Visit my GitHub profile for the latest activity.</Status>;
  if (!commits.length) return <Status>No public commits to show yet.</Status>;
  return (
    <ol className="mt-6">
      {commits.map(commit => (
        <li key={`${commit.repository}-${commit.sha}`} className="border-t border-line first:border-t-0">
          <a href={commit.url} target="_blank" rel="noopener noreferrer"
            className="group/commit relative flex min-h-11 gap-3 py-5 sm:gap-4">
            {/* Hover cue: a thin ink line draws down the row's left edge. */}
            <span aria-hidden className="absolute -left-3 bottom-5 top-5 w-px origin-top scale-y-0 bg-ink transition-transform duration-300 group-hover/commit:scale-y-100 sm:-left-4" />
            <GitCommitHorizontal size={18} aria-hidden className="mt-1 shrink-0 text-muted transition-colors duration-200 group-hover/commit:text-ink" />
            <div className="min-w-0 flex-1">
              <p className="break-words text-base font-medium leading-relaxed">{commit.message}</p>
              <p className="mt-2 break-all font-mono text-[0.7rem] text-muted">{commit.repository} <span aria-hidden>·</span> {commit.sha.slice(0, 7)}</p>
              <time dateTime={commit.date} className="mt-1 block font-mono text-[0.7rem] text-muted">
                {commitDate.format(new Date(commit.date))} · {commitTime.format(new Date(commit.date))} PHT
              </time>
              <span className="sr-only">View commit on GitHub (opens in a new tab)</span>
            </div>
            <ArrowUpRight size={16} aria-hidden className="mt-1 shrink-0 text-muted transition-transform duration-200 group-hover/commit:-translate-y-0.5 group-hover/commit:translate-x-0.5 group-hover/commit:text-ink" />
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Whole-number share, but never a misleading "0%" for a tiny language. */
const percentLabel = (p: number) => (p > 0 && p < 1 ? "<1%" : `${Math.round(p)}%`);

/**
 * Top languages as a ranked list: one row per language (rank · name · percentage on the
 * right), split by hairlines; no separators between items. Static (not links).
 */
async function TopLanguages() {
  const data = await getTopLanguages();
  if (!data) return <Status>Language statistics are unavailable right now. Check my repositories on GitHub.</Status>;
  if (!data.languages.length) return <Status>GitHub has not detected any languages in my public repositories yet.</Status>;
  return (
    <>
      <ol className="mt-6">
        {data.languages.map((language, i) => (
          <li key={language.name} className="flex items-baseline gap-3 border-b border-line py-3.5 first:border-t">
            <span aria-hidden className="w-5 shrink-0 font-mono text-[0.65rem] text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-ink">{language.name}</span>
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{percentLabel(language.percent)}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Share of code across {data.repositoryCount} public repositories I own, excluding forks.
      </p>
    </>
  );
}

/** Hairline rule with a short tick at each end (header rule, dividers, footer). */
function TickRule({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex flex-1 items-center ${className}`}>
      <span className="h-2 w-px bg-line-strong" />
      <span className="h-px flex-1 bg-line" />
      <span className="h-2 w-px bg-line-strong" />
    </span>
  );
}

/**
 * One GitHub activity panel (the panel itself is static; only the commit rows and the profile
 * link inside react on hover). Frame: 1px border, corner marks,
 * a faint diagonal texture fading in from the top-right, and an accent tick on the left
 * border. Inside: a full-width "GitHub activity" caption with a tick-ended rule; Recent
 * commits (left, ~60%) and Top languages (right, ~40%) split by a vertical hairline; and a
 * footer row (source note + profile link) closing the panel. Black/white apart from the
 * panel's accent tick.
 */
export default function GitHubDetails() {
  return (
    <div className="relative mt-8" data-reveal>
      <CornerMarks />
      <div className="card relative border border-line bg-bg p-6 sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--lines)_0_1px,transparent_1px_9px)] [mask-image:linear-gradient(225deg,#000,transparent_40%)]"
        />
        <span aria-hidden className="absolute -left-px top-6 h-5 w-0.5 bg-accent sm:top-8" />

        <div className="relative">
          {/* Header caption. */}
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-3 w-0.5 bg-ink" />
            <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-ink">GitHub activity</span>
            <TickRule />
          </div>

          {/* Two columns from 1024px (about 60/40), split by a vertical hairline; stacked
              below that with a horizontal hairline. */}
          <div className="mt-6 grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="min-w-0 lg:pr-8">
              <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Recent commits</h3>
              <p className="mt-2 text-sm text-muted">My latest public commits, with links to the changes on GitHub.</p>
              <Suspense fallback={<Status>Loading recent commits…</Status>}><RecentCommits /></Suspense>
            </div>

            <div className="min-w-0 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Top languages</h3>
              <p className="mt-2 text-sm text-muted">The languages behind my public repositories.</p>
              <Suspense fallback={<Status>Loading language statistics…</Status>}><TopLanguages /></Suspense>
            </div>
          </div>

          {/* Footer: closes the panel with a tick-ended rule, the data note and a profile link. */}
          <div className="mt-8">
            <div className="flex">
              <TickRule />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted">
              <span>Data from GitHub · refreshed every six hours</span>
              <a
                href={`https://github.com/${githubUser}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/gh inline-flex min-h-11 items-center gap-1 text-ink sm:min-h-0"
              >
                github.com/{githubUser}
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight size={12} aria-hidden className="transition-transform duration-200 group-hover/gh:-translate-y-0.5 group-hover/gh:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
