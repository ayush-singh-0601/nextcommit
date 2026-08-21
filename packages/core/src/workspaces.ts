import { readFile } from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";

export interface WorkspacePackage { name: string; path: string; private: boolean }

export async function discoverWorkspacePackages(root: string): Promise<WorkspacePackage[]> {
  const files = await fg(["package.json", "packages/*/package.json", "apps/*/package.json"], { cwd: root, ignore: ["**/node_modules/**"] });
  const packages = await Promise.all(files.map(async (file) => {
    const parsed = JSON.parse(await readFile(path.join(root, file), "utf8")) as { name?: string; private?: boolean };
    return parsed.name ? { name: parsed.name, path: file, private: Boolean(parsed.private) } : undefined;
  }));
  return packages.filter((item): item is WorkspacePackage => Boolean(item)).sort((left, right) => left.path.localeCompare(right.path));
}
