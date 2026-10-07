import { contactLinks } from "./content";

export const githubProfile = contactLinks.find((link) => link.id === "github")!;
export const githubUsername = new URL(githubProfile.href).pathname.split("/").filter(Boolean)[0];

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

/** Public GitHub activity, cached hourly. An outage must not break the home page. */
export async function getGitHubContributions(): Promise<ContributionDay[] | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(githubUsername)}?y=last`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data.contributions) || data.contributions.length === 0) return null;
    const valid = data.contributions.every((day: ContributionDay) =>
      day && /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
      Number.isFinite(Date.parse(`${day.date}T00:00:00Z`)) &&
      Number.isInteger(day.count) && day.count >= 0 &&
      Number.isInteger(day.level) && day.level >= 0 && day.level <= 4,
    );
    if (!valid) return null;

    return [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return null;
  }
}
