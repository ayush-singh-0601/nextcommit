import { readFile } from "node:fs/promises";
import type { IndexedFile } from "./files.js";
import type { Signal } from "./schema.js";

export async function collectManifestSignals(files: IndexedFile[]): Promise<Signal[]> {
  const signals: Signal[] = [];
  const manifest = files.find((file) => file.relativePath === "package.json");
  if (manifest) {
    try {
      const parsed = JSON.parse(await readFile(manifest.absolutePath, "utf8")) as { scripts?: Record<string, string>; dependencies?: Record<string, string> };
      for (const script of Object.keys(parsed.scripts ?? {})) signals.push({ type: "package-script", file: manifest.relativePath, value: script });
      for (const dependency of Object.keys(parsed.dependencies ?? {})) signals.push({ type: "dependency", file: manifest.relativePath, value: dependency });
    } catch {
      signals.push({ type: "invalid-manifest", file: manifest.relativePath, value: "package.json could not be parsed" });
    }
  }
  for (const file of files.filter((item) => item.relativePath.startsWith(".github/workflows/"))) {
    signals.push({ type: "ci-workflow", file: file.relativePath, value: file.relativePath });
  }
  return signals;
}
