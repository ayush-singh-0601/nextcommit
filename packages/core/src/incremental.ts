import { createHash } from "node:crypto";
import type { ScanReport } from "./schema.js";

export interface CachedScan { fingerprint: string; report: ScanReport }

export function scanFingerprint(report: ScanReport): string {
  return createHash("sha256").update(JSON.stringify({ head: report.repository.git.head, dirty: report.repository.git.dirty, signals: report.signals.map((signal) => [signal.type, signal.file, signal.line, signal.value]) })).digest("hex");
}

export function isCachedScanCurrent(cached: CachedScan | undefined, report: ScanReport): boolean {
  return cached?.fingerprint === scanFingerprint(report);
}
