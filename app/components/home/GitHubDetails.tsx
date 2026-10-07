import { Suspense } from "react";
import { ArrowUpRight, GitCommitHorizontal } from "lucide-react";
import { getRecentCommits, getTopLanguages } from "@/lib/github-activity";
import { Panel } from "../ui/primitives";

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
            className="group/commit flex min-h-11 gap-3 py-5 transition-colors duration-200 hover:text-accent-text sm:gap-4">
            <GitCommitHorizontal size={18} aria-hidden className="mt-1 shrink-0 text-accent-text" />
            <div className="min-w-0 flex-1">
              <p className="break-words text-base font-medium leading-relaxed">{commit.message}</p>
              <p className="mt-2 break-all font-mono text-[0.7rem] text-muted">{commit.repository} <span aria-hidden>·</span> {commit.sha.slice(0, 7)}</p>
              <time dateTime={commit.date} className="mt-1 block font-mono text-[0.7rem] text-muted">
                {commitDate.format(new Date(commit.date))} · {commitTime.format(new Date(commit.date))} PHT
              </time>
              <span className="sr-only">View commit on GitHub (opens in a new tab)</span>
            </div>
            <ArrowUpRight size={16} aria-hidden className="mt-1 shrink-0 text-muted transition-transform duration-200 group-hover/commit:-translate-y-0.5 group-hover/commit:translate-x-0.5 group-hover/commit:text-accent-text" />
          </a>
        </li>
      ))}
    </ol>
  );
}

async function TopLanguages() {
  const data = await getTopLanguages();
  if (!data) return <Status>Language statistics are unavailable right now. Check my repositories on GitHub.</Status>;
  if (!data.languages.length) return <Status>GitHub has not detected any languages in my public repositories yet.</Status>;
  return (
    <>
      <ul className="mt-8 space-y-6">
        {data.languages.map(language => (
          <li key={language.name}>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <span className="min-w-0 break-words text-sm font-medium">{language.name}</span>
              <span className="shrink-0 font-mono text-xs text-accent-text">{language.percent.toFixed(1)}%</span>
            </div>
            <div aria-hidden className="h-1.5 w-full bg-surface">
              <div className="h-full bg-accent" style={{ width: `${language.percent}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        Share of code bytes across {data.repositoryCount} public repositories I own, excluding forks. Based on GitHub’s language detection; refreshed every six hours.
      </p>
    </>
  );
}

export default function GitHubDetails() {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-7" data-reveal>
        <Panel className="h-full p-5 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-[-0.025em]">Recent commits</h3>
          <p className="mt-3 text-sm text-muted">My latest public commits, with links to the changes on GitHub.</p>
          <Suspense fallback={<Status>Loading recent commits…</Status>}><RecentCommits /></Suspense>
        </Panel>
      </div>
      <div className="min-w-0 lg:col-span-5" data-reveal>
        <Panel className="h-full p-5 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-[-0.025em]">Top languages</h3>
          <p className="mt-3 text-sm text-muted">The languages behind my public repositories.</p>
          <Suspense fallback={<Status>Loading language statistics…</Status>}><TopLanguages /></Suspense>
        </Panel>
      </div>
    </div>
  );
}
