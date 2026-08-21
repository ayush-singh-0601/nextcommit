export interface VersionedRecord { version: number; [key: string]: unknown }
export type Migration<T extends VersionedRecord> = (record: T) => T;

export function migrateRecord<T extends VersionedRecord>(record: T, targetVersion: number, migrations: Record<number, Migration<T>>): T {
  let current = record;
  while (current.version < targetVersion) {
    const migration = migrations[current.version];
    if (!migration) throw new Error(`No migration from version ${current.version}`);
    current = migration(current);
  }
  return current;
}
