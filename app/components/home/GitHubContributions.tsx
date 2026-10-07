import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { getGitHubContributions, githubProfile } from "@/lib/github-contributions";
import { Highlight, Panel, SectionHeader } from "../ui/primitives";
import GitHubDetails from "./GitHubDetails";

const cell = 12;
const gap = 4;
const step = cell + gap;
const left = 36;
const top = 28;
const dayMs = 86_400_000;
const colors = [
  "var(--surface)",
  "color-mix(in srgb, var(--accent) 25%, var(--bg))",
  "color-mix(in srgb, var(--accent) 50%, var(--bg))",
  "color-mix(in srgb, var(--accent) 75%, var(--bg))",
  "var(--accent)",
];
const dateFormat = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });

async function ContributionCalendar() {
  const days = await getGitHubContributions();
  if (!days) {
    return (
      <p className="py-8 text-sm text-muted" role="status">
        Contribution activity is unavailable right now. You can still view my latest work on GitHub.
      </p>
    );
  }

  const firstDate = new Date(`${days[0].date}T00:00:00Z`);
  const start = firstDate.getTime() - firstDate.getUTCDay() * dayMs;
  const last = new Date(`${days[days.length - 1].date}T00:00:00Z`);
  const weeks = Math.floor((last.getTime() - start) / (7 * dayMs)) + 1;
  const width = left + weeks * step;
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const activeDays = days.filter((day) => day.count > 0).length;
  const months: { label: string; week: number; key: string }[] = [];
  for (const day of days) {
    const date = new Date(`${day.date}T00:00:00Z`);
    const week = Math.floor((date.getTime() - start) / (7 * dayMs));
    if (date.getUTCDate() === 1 && week < weeks - 1) {
      months.push({ label: monthFormat.format(date), week, key: day.date });
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-lg font-medium">
          <span className="text-accent-text">{total.toLocaleString("en")}</span> contributions in the last year
        </p>
        <p className="font-mono text-xs text-muted">{activeDays} active days</p>
      </div>
      <div className="overflow-x-auto pb-3" tabIndex={0} role="region" aria-label="GitHub contribution calendar, scroll horizontally to see all months">
        <svg
          viewBox={`0 0 ${width} ${top + 7 * step}`}
          className="block w-full min-w-[760px]"
          role="img"
          aria-labelledby="contributions-chart-title contributions-chart-description"
        >
          <title id="contributions-chart-title">GitHub contributions for {githubProfile.handle}</title>
          <desc id="contributions-chart-description">
            {total} contributions across {activeDays} active days, from {dateFormat.format(firstDate)} to {dateFormat.format(last)}. Darker blue squares show more daily contributions.
          </desc>
          <g className="font-mono text-[10px]" fill="var(--muted)" aria-hidden="true">
            {months.map((month) => <text key={month.key} x={left + month.week * step} y={12}>{month.label}</text>)}
            {["Mon", "Wed", "Fri"].map((label, i) => <text key={label} x={0} y={top + (i * 2 + 1) * step + 10}>{label}</text>)}
          </g>
          {days.map((day) => {
            const date = new Date(`${day.date}T00:00:00Z`);
            const week = Math.floor((date.getTime() - start) / (7 * dayMs));
            return (
              <rect
                key={day.date}
                x={left + week * step}
                y={top + date.getUTCDay() * step}
                width={cell}
                height={cell}
                rx={1}
                fill={colors[day.level]}
                stroke="var(--line)"
                strokeWidth={0.5}
              >
                <title>{day.count} {day.count === 1 ? "contribution" : "contributions"} on {dateFormat.format(date)}</title>
              </rect>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 font-mono text-[0.7rem] text-muted">
        <p>{dateFormat.format(firstDate)} – {dateFormat.format(last)}</p>
        <div className="flex items-center gap-1.5" aria-label="Contribution intensity: less to more">
          <span className="mr-1">Less</span>
          {colors.map((color, i) => <span key={i} aria-hidden className="size-3 border border-line" style={{ background: color }} />)}
          <span className="ml-1">More</span>
        </div>
      </div>
    </>
  );
}

export default function GitHubContributions() {
  return (
    <section id="github-activity" aria-labelledby="github-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeader
          id="github-title"
          index="06"
          label="GitHub activity"
          title={<>Learning through <Highlight>building</Highlight>.</>}
          action={
            <a href={githubProfile.href} target="_blank" rel="noopener noreferrer" aria-label={githubProfile.ariaLabel}
              className="group inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text">
              View GitHub <ArrowUpRight size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          }
        >
          <p>A look at my contributions as I build projects, practise new skills, and keep learning.</p>
        </SectionHeader>
        <div data-reveal>
          <Panel className="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-mono text-xs text-muted">
              <span className="text-ink">{githubProfile.handle}</span>
              <span>Contribution activity</span>
            </div>
            <Suspense fallback={<p className="py-8 text-sm text-muted" role="status">Loading contribution activity…</p>}>
              <ContributionCalendar />
            </Suspense>
          </Panel>
        </div>
        <GitHubDetails />
      </div>
    </section>
  );
}
