import { Command } from "commander";
import pc from "picocolors";
import { PRODUCT_NAME, RepositoryError, scanRepository, type ScanReport } from "@nextcommit/core";

export * from "@nextcommit/core";

export function renderReport(report: ScanReport, limit = 5): string {
  const candidates = report.candidates.slice(0, limit);
  const lines = [pc.bold(PRODUCT_NAME), "", `${report.repository.name} · ${report.repository.languages.join(" / ") || "Unknown stack"}`, "", `Signals: ${report.signals.length} · Candidates: ${report.candidates.length}`];
  if (candidates.length === 0) lines.push("", "No evidence-backed candidates yet. Run the Codex skill to verify repository signals.");
  for (const [index, candidate] of candidates.entries()) lines.push("", `${index + 1}. ${candidate.title}`, `   ${candidate.category} · ${candidate.classification} · ~${candidate.estimatedMinutes}m`);
  return `${lines.join("\n")}\n`;
}

export async function runCli(argv = process.argv): Promise<void> {
  const program = new Command();
  program.name("nextcommit").description("Give every repository a next step.").version("0.1.0-dev");
  const executeScan = async (target: string, options: { json?: boolean; limit?: number }) => {
    const globalOptions = program.opts<{ json?: boolean; limit?: number }>();
    const effectiveOptions = { json: options.json ?? globalOptions.json, limit: options.limit ?? globalOptions.limit };
    const report = await scanRepository(target, { persistState: true });
    process.stdout.write(effectiveOptions.json ? `${JSON.stringify(report, null, 2)}\n` : renderReport(report, effectiveOptions.limit));
  };
  program.command("scan [path]").option("--json", "emit stable JSON").option("--limit <count>", "limit candidates", Number).action(executeScan);
  program.option("--json", "emit stable JSON").option("--limit <count>", "limit candidates", Number).action(() => executeScan(".", program.opts()));
  try {
    await program.parseAsync(argv);
  } catch (error) {
    const message = error instanceof RepositoryError ? error.message : error instanceof Error ? error.message : "Unexpected error";
    process.stderr.write(`${pc.red("nextcommit:")} ${message}\n`);
    process.exitCode = error instanceof RepositoryError ? 3 : 1;
  }
}
