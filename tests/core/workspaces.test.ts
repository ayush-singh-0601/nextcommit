import { describe, expect, it } from "vitest";
import { discoverWorkspacePackages } from "@nextcommit/core";
describe("workspace discovery", () => { it("finds workspace package manifests", async () => { const packages = await discoverWorkspacePackages(process.cwd()); expect(packages.map((item) => item.name)).toContain("nextcommit"); }); });
