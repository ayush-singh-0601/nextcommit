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
});
