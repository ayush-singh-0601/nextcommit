import { createHash } from "node:crypto";
import path from "node:path";
import { collectChurnSignals, collectGitMetadata, resolveRepository } from "./git.js";
import { indexRepositoryFiles, selectScannableFiles } from "./files.js";
import { deriveCandidates } from "./findings.js";
import { collectManifestSignals } from "./manifests.js";
import { extractReadmeIntent } from "./readme.js";
import { ScanReportSchema, type ScanReport, type Signal } from "./schema.js";
import { detectStack } from "./stack.js";
import { saveState } from "./state.js";
import { classifyRepositoryStructure } from "./structure.js";
import { extractTodoSignals } from "./todos.js";

export interface ScanOptions { persistState?: boolean }

export async function scanRepository(inputPath: string, options: ScanOptions = {}): Promise<ScanReport> {
  const repository = await resolveRepository(inputPath);
  const indexed = await indexRepositoryFiles(repository.root);
  const selection = await selectScannableFiles(indexed);
  const [stack, git, readme, todos, manifests, churn] = await Promise.all([
    detectStack(selection.files), collectGitMetadata(repository.root), extractReadmeIntent(selection.files), extractTodoSignals(selection.files), collectManifestSignals(selection.files), collectChurnSignals(repository.root).catch(() => []),
  ]);
  const structure = classifyRepositoryStructure(selection.files);
  const structuralSignals: Signal[] = [
    { type: "source-file-count", value: String(structure.source.length) },
    { type: "test-file-count", value: String(structure.tests.length) },
  ];
  const signals = [...structuralSignals, ...readme, ...todos, ...manifests, ...churn];
  const report = ScanReportSchema.parse({
    schemaVersion: 1,
    repository: { name: path.basename(repository.root), path: repository.inputPath, root: repository.root, git: { head: git.head, branch: git.branch, dirty: git.dirty }, ...stack },
    signals,
    candidates: deriveCandidates(signals),
    warnings: selection.skipped.map((skipped) => `Skipped ${skipped.file}: ${skipped.reason}`),
    scannedAt: new Date().toISOString(),
  });
  if (options.persistState) {
    const fingerprint = createHash("sha256").update(`${git.head ?? ""}:${indexed.map((file) => `${file.relativePath}:${file.size}`).join("|")}`).digest("hex");
    await saveState(repository.root, { version: 1, lastScan: report.scannedAt, repositoryFingerprint: fingerprint, ...(git.head ? { lastCommit: git.head } : {}) });
  }
  return report;
}
