import { describe, expect, it } from "vitest";
import { runIntegration } from "@nextcommit/core";
describe("integrations", () => { it("runs only an explicitly supplied provider", async () => expect((await runIntegration({ id: "fixture", describe: () => "fixture", fetch: async () => 2 }, undefined)).data).toBe(2)); });
