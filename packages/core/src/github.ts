export interface GitHubIssue { number: number; title: string; labels: string[]; state: "open" | "closed" }
export function parseGitHubIssues(value: unknown): GitHubIssue[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => { const issue = item as { number?: unknown; title?: unknown; state?: unknown; labels?: Array<{ name?: unknown }> }; return typeof issue.number === "number" && typeof issue.title === "string" && (issue.state === "open" || issue.state === "closed") ? [{ number: issue.number, title: issue.title, state: issue.state, labels: (issue.labels ?? []).flatMap((label) => typeof label.name === "string" ? [label.name] : []) }] : []; });
}
