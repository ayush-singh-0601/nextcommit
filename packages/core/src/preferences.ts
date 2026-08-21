import path from "node:path";
import { globalStateDirectory } from "./portfolio.js";
import { readJson, writeJsonAtomic } from "./state.js";
export interface Preferences { version: 1; defaultMode?: "easy" | "ambitious" | "release" | "open-source"; excludedCategories: string[] }
export async function loadPreferences(directory = globalStateDirectory()): Promise<Preferences> { return (await readJson<Preferences>(path.join(directory, "preferences.json"))) ?? { version: 1, excludedCategories: [] }; }
export async function savePreferences(preferences: Preferences, directory = globalStateDirectory()): Promise<void> { await writeJsonAtomic(path.join(directory, "preferences.json"), preferences); }
