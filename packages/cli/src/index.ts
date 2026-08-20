import { Command } from "commander";
import pc from "picocolors";
import { loadFindings, PRODUCT_NAME, RepositoryError, saveAgentAnalysis, scanRepository, type Finding, type FindingCategory, type ScanReport } from "@nextcommit/core";

export * from "@nextcommit/core";

export function renderReport(report: ScanReport, limit = 5): string {
  const candidates = report.candidates.slice(0, limit);
  const lines = [pc.bold(PRODUCT_NAME), "", `${report.repository.name} · ${report.repository.languages.join(" / ") || "Unknown stack"}`, "", `Signals: ${report.signals.length} · Candidates: ${report.candidates.length}`];
  if (candidates.length === 0) lines.push("", "No evidence-backed candidates yet. Run the Codex skill to verify repository signals.");
  for (const [index, candidate] of candidates.entries()) lines.push("", `${index + 1}. ${candidate.title}`, `   ${candidate.category} · ${candidate.classification} · ~${candidate.estimatedMinutes}m`);
  return `${lines.join("\n")}\n`;
}

export function renderFinding(finding: Finding): string {
  const evidence = finding.evidence.map((item) => `${item.file}${item.lineStart ? `:${item.lineStart}` : ""}`).join(", ");
  return `${finding.title}\n${finding.category} · ${finding.classification} · score ${finding.score}\nEvidence: ${evidence}\n${finding.reason}\n`;
}

function readStandardInput(): Promise<string> {
  return new Promise((resolve, reject) => {
    let value = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk: string) => { value += chunk; });
    process.stdin.once("end", () => resolve(value));
    process.stdin.once("error", reject);
  });
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
  const renderStored = async (target: string, category?: FindingCategory, id?: string, quickWins = false) => {
    const report = await scanRepository(target, { persistState: false });
    const findings = (await loadFindings(report.repository.root)).filter((finding) => (!category || finding.category === category) && (!quickWins || (finding.impact >= 7 && finding.effort <= 3 && finding.confidence >= 0.8 && finding.risk === "low")));
    const selected = id ? findings.find((finding) => finding.id === id) : undefined;
    if (id && !selected) throw new Error(`Finding not found: ${id}`);
    process.stdout.write(selected ? renderFinding(selected) : `${findings.slice(0, 5).map(renderFinding).join("\n") || "No verified findings yet.\n"}`);
  };
  program.command("scan [path]").option("--json", "emit stable JSON").option("--limit <count>", "limit candidates", Number).action(executeScan);
  const categoryCommands: Record<string, FindingCategory> = { bugs: "bug", features: "feature", performance: "performance", tests: "test", maintainability: "maintainability" };
  for (const [command, category] of Object.entries(categoryCommands)) program.command(`${command} [path]`).action((target = ".") => renderStored(target, category));
  program.command("show <id> [path]").action((id, target = ".") => renderStored(target, undefined, id));
  program.command("quick-wins [path]").action((target = ".") => renderStored(target, undefined, undefined, true));
  program.command("agent ingest [path]").description("persist a verified analysis envelope from stdin").action(async (target = ".") => {
    const report = await scanRepository(target, { persistState: false });
    const saved = await saveAgentAnalysis(report.repository.root, JSON.parse(await readStandardInput()));
    process.stdout.write(`${JSON.stringify({ findings: saved.findings.length, plans: saved.plans.length })}\n`);
  });
  program.option("--json", "emit stable JSON").option("--limit <count>", "limit candidates", Number).action(() => executeScan(".", program.opts()));
  try {
    await program.parseAsync(argv);
  } catch (error) {
    const message = error instanceof RepositoryError ? error.message : error instanceof Error ? error.message : "Unexpected error";
    process.stderr.write(`${pc.red("nextcommit:")} ${message}\n`);
    process.exitCode = error instanceof RepositoryError ? 3 : 1;
  }
}
