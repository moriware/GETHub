import { queryClient } from '@/infrastructure/cache/queryClient';
import { CACHE_KEY, storage } from './constants';
import { QueryStateSnapshot } from './types';

export function persistQueryClient(): void {
  const snapshot = queryClient.dehydrate();
  storage.set(CACHE_KEY, JSON.stringify(snapshot));
}

export function restorePersistedQueryClient(): void {
  const cached = storage.getString(CACHE_KEY);
  if (!cached) {
    return;
  }

  try {
    queryClient.hydrate(JSON.parse(cached) as QueryStateSnapshot);
  } catch {
    storage.delete(CACHE_KEY);
  }
}
