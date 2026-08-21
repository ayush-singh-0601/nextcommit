import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

function codexSection(readme: string): string {
  const start = readme.indexOf("## Use with Codex");
  const end = readme.indexOf("\n## ", start + 3);
  return readme.slice(start, end === -1 ? undefined : end).trim();
}

describe("Codex README documentation", () => {
  it("ships the complete setup and workflow in GitHub and npm readmes", async () => {
    const [githubReadme, npmReadme] = await Promise.all([
      readFile("README.md", "utf8"),
      readFile("packages/cli/README.md", "utf8"),
    ]);
    const section = codexSection(githubReadme);
    expect(codexSection(npmReadme)).toBe(section);
    for (const expected of [
      "### Repository setup (recommended)",
      "### User-wide setup",
      "$nextcommit Analyze this repository",
      "### Default two-stage workflow",
      "### Codex prompt cookbook",
      "codex mcp add nextcommit",
      "### Upgrade and refresh",
      "### Troubleshooting",
      "official OpenAI Codex skill documentation",
    ]) expect(section).toContain(expected);
  });
});
