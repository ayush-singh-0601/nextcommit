import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("packaged Codex skill", () => {
  it("resolves local and global launchers before scanning", async () => {
    const skill = await readFile("packages/cli/skills/nextcommit/SKILL.md", "utf8");
    expect(skill).toContain("node_modules/nextcommit/dist/cli/src/bin.js");
    expect(skill).toContain("npm root -g");
    expect(skill).toContain("Never claim a scan completed unless the command exited successfully");
    expect(skill).toContain("<launcher> scan . --json");
  });

  it("shortlists issues before planning the selected issue", async () => {
    const skill = await readFile("packages/cli/skills/nextcommit/SKILL.md", "utf8");
    expect(skill).toContain("present 5 or 6 credible issues");
    expect(skill).toContain("Ask the user to select an issue by number or id");
    expect(skill).toContain("After the user selects an issue, automatically");
    expect(skill).toContain("<launcher> agent ingest .");
    expect(skill).toContain('"repositoryFingerprint": "<repositoryFingerprint from scan JSON>"');
  });

  it("keeps the repository and packaged skills synchronized", async () => {
    const [repositorySkill, packagedSkill] = await Promise.all([
      readFile("skills/nextcommit/SKILL.md", "utf8"),
      readFile("packages/cli/skills/nextcommit/SKILL.md", "utf8"),
    ]);
    expect(packagedSkill).toBe(repositorySkill);
  });
});
