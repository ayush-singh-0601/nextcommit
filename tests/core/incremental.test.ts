import { describe, expect, it } from "vitest";
import { isCachedScanCurrent, scanFingerprint, type ScanReport } from "@nextcommit/core";
const report: ScanReport = { schemaVersion: 1, repository: { name: "x", path: "x", root: "x", git: { dirty: false, head: "a" }, languages: [], frameworks: [] }, signals: [], candidates: [], warnings: [], scannedAt: "2026-01-01T00:00:00.000Z" };
describe("incremental scans", () => { it("compares deterministic scan fingerprints", () => expect(isCachedScanCurrent({ fingerprint: scanFingerprint(report), report }, report)).toBe(true)); });
