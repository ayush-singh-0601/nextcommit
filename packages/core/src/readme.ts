import { readFile } from "node:fs/promises";
import type { IndexedFile } from "./files.js";
import type { Signal } from "./schema.js";

export async function extractReadmeIntent(files: IndexedFile[]): Promise<Signal[]> {
  const documents = files.filter((file) => /(^|\/)(readme|roadmap|todo)(\.[^.]+)?$/i.test(file.relativePath));
  const signals: Signal[] = [];
  for (const document of documents) {
    const lines = (await readFile(document.absolutePath, "utf8")).split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      const match = line.match(/^\s*[-*]\s+\[\s\]\s+(.+)$/);
      if (!match?.[1]) continue;
      signals.push({
        type: "unfinished-roadmap",
        file: document.relativePath,
        line: index + 1,
        value: match[1].trim(),
        evidence: {
          type: "readme",
          file: document.relativePath,
          lineStart: index + 1,
          summary: `Unfinished documented intent: ${match[1].trim()}`,
        },
      });
    }
  }
  return signals;
}
