import {
  type QueryKey,
  QueryStateSnapshot,
} from '@/infrastructure/cache/app-query-client/AppQueryClient.types';

class AppQueryClient {
  private readonly cache = new Map<string, unknown>();

  getQueryData<T>(key: QueryKey): T | undefined {
    return this.cache.get(this.serialize(key)) as T | undefined;
  }

  setQueryData<T>(key: QueryKey, value: T): void {
    this.cache.set(this.serialize(key), value);
  }

  invalidateQueries(keyPrefix: QueryKey): void {
    const serializedPrefix = this.serialize(keyPrefix);

    for (const key of this.cache.keys()) {
      if (key.startsWith(serializedPrefix.slice(0, -1))) {
        this.cache.delete(key);
      }
    }
  }

  dehydrate(): QueryStateSnapshot {
    const snapshot: QueryStateSnapshot = {};

    this.cache.forEach((value, key) => {
      snapshot[key] = value;
    });

    return snapshot;
  }

  hydrate(snapshot: QueryStateSnapshot): void {
    this.cache.clear();
    Object.entries(snapshot).forEach(([key, value]) => {
      this.cache.set(key, value);
    });
  }

  private serialize(key: QueryKey): string {
    return JSON.stringify(key);
  }
}

export const queryClient = new AppQueryClient();
