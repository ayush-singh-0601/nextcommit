import { readFile } from "node:fs/promises";
import type { IndexedFile } from "./files.js";
import type { Signal } from "./schema.js";

const TODO_PATTERN = /\b(TODO|FIXME)\b\s*[:\-]?\s*(.+)$/i;

export async function extractTodoSignals(files: IndexedFile[]): Promise<Signal[]> {
  const signals: Signal[] = [];
  for (const file of files) {
    const content = await readFile(file.absolutePath, "utf8");
    for (const [index, line] of content.split(/\r?\n/).entries()) {
      const match = line.match(TODO_PATTERN);
      if (!match?.[1] || !match[2]) continue;
      const kind = match[1].toUpperCase();
      const value = match[2].trim();
      signals.push({
        type: kind.toLowerCase(),
        file: file.relativePath,
        line: index + 1,
        value,
        evidence: {
          type: "todo",
          file: file.relativePath,
          lineStart: index + 1,
          summary: `${kind}: ${value}`,
        },
      });
    }
  }
  return signals;
}
