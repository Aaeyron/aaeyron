import { githubUsername } from "./github-contributions";

type Repository = { full_name: string; fork: boolean; owner: { login: string } };
type LanguageBytes = Record<string, number>;
export type RecentCommit = { sha: string; repository: string; message: string; date: string; url: string };
export type LanguageShare = { name: string; percent: number };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function githubFetch(path: string, revalidate: number): Promise<unknown> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "Aaeyron-Portfolio" },
    next: { revalidate },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
  return response.json();
}

/** Search authored public commits; push events do not reliably include commit details. */
export async function getRecentCommits(): Promise<RecentCommit[] | null> {
  try {
    const query = encodeURIComponent(`author:${githubUsername}`);
    const data = await githubFetch(`/search/commits?q=${query}&sort=committer-date&order=desc&per_page=5`, 3600);
    if (!isRecord(data) || data.incomplete_results !== false || !Array.isArray(data.items)) return null;
    const commits: RecentCommit[] = [];
    for (const item of data.items) {
      if (!isRecord(item) || typeof item.sha !== "string" || !/^[a-f0-9]{40}$/i.test(item.sha) ||
        !isRecord(item.repository) || typeof item.repository.full_name !== "string" ||
        !/^[\w.-]+\/[\w.-]+$/.test(item.repository.full_name) || !isRecord(item.commit) ||
        typeof item.commit.message !== "string" || !isRecord(item.commit.committer) ||
        typeof item.commit.committer.date !== "string" || !Number.isFinite(Date.parse(item.commit.committer.date))) return null;
      commits.push({
        sha: item.sha,
        repository: item.repository.full_name,
        message: item.commit.message.split(/\r?\n/)[0].trim() || "Untitled commit",
        date: new Date(item.commit.committer.date).toISOString(),
        url: `https://github.com/${item.repository.full_name}/commit/${item.sha}`,
      });
    }
    return commits.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  } catch {
    return null;
  }
}

/** Percentages use all code bytes. Group the remainder and round to a total of 100.0%. */
export function summarizeLanguages(repositories: LanguageBytes[]): LanguageShare[] {
  const totals = new Map<string, number>();
  for (const languages of repositories) {
    for (const [name, bytes] of Object.entries(languages)) totals.set(name, (totals.get(name) ?? 0) + bytes);
  }
  const sorted = [...totals.entries()].filter(([, bytes]) => bytes > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const total = sorted.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (!total) return [];
  const buckets = sorted.slice(0, 5);
  if (sorted.length > 5) buckets.push(["Other", sorted.slice(5).reduce((sum, [, bytes]) => sum + bytes, 0)]);
  const shares = buckets.map(([name, bytes]) => ({ name, units: Math.floor(bytes / total * 1000), exact: bytes / total * 1000 }));
  const missing = 1000 - shares.reduce((sum, share) => sum + share.units, 0);
  const remainderOrder = [...shares].sort((a, b) => (b.exact - b.units) - (a.exact - a.units));
  for (let i = 0; i < missing; i++) remainderOrder[i].units++;
  return shares.map(({ name, units }) => ({ name, percent: units / 10 }));
}

/** Fetch every public owned repository, including pagination. Never display partial percentages. */
export async function getTopLanguages(): Promise<{ languages: LanguageShare[]; repositoryCount: number } | null> {
  try {
    const repositories: Repository[] = [];
    for (let page = 1; ; page++) {
      const data = await githubFetch(`/users/${encodeURIComponent(githubUsername)}/repos?type=owner&per_page=100&sort=full_name&page=${page}`, 21600);
      if (!Array.isArray(data)) return null;
      for (const repo of data) {
        if (!isRecord(repo) || typeof repo.full_name !== "string" || !/^[\w.-]+\/[\w.-]+$/.test(repo.full_name) ||
          typeof repo.fork !== "boolean" || !isRecord(repo.owner) || typeof repo.owner.login !== "string") return null;
        if (!repo.fork && repo.owner.login.toLowerCase() === githubUsername.toLowerCase()) repositories.push(repo as Repository);
      }
      if (data.length < 100) break;
    }
    const languageData: LanguageBytes[] = [];
    // Limit concurrency to keep the API requests modest, even as the account grows.
    for (let i = 0; i < repositories.length; i += 6) {
      const batch = await Promise.all(repositories.slice(i, i + 6).map(repo => githubFetch(`/repos/${repo.full_name}/languages`, 21600)));
      for (const languages of batch) {
        if (!isRecord(languages) || !Object.values(languages).every(bytes => typeof bytes === "number" && Number.isSafeInteger(bytes) && bytes >= 0)) return null;
        languageData.push(languages as LanguageBytes);
      }
    }
    return { languages: summarizeLanguages(languageData), repositoryCount: repositories.length };
  } catch {
    return null;
  }
}
