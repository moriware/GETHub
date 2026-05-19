export interface KeyValueStorage {
  getString(key: string): string | null;
  set(key: string, value: string): void;
  delete(key: string): void;
}

export class MMKVStorage implements KeyValueStorage {
  private readonly memory = new Map<string, string>();

  getString(key: string): string | null {
    return this.memory.get(key) ?? null;
  }

  set(key: string, value: string): void {
    this.memory.set(key, value);
  }

  delete(key: string): void {
    this.memory.delete(key);
  }
}
