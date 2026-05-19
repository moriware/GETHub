import { queryClient } from '@/infrastructure/cache/queryClient';
import { CACHE_KEY, storage } from './constants';
import { QueryStateSnapshot } from './types';

export async function persistQueryClient(): Promise<void> {
  const snapshot = queryClient.dehydrate();
  await storage.set(CACHE_KEY, JSON.stringify(snapshot));
}

export async function restorePersistedQueryClient(): Promise<void> {
  const cached = await storage.getString(CACHE_KEY);
  if (!cached) {
    return;
  }

  try {
    queryClient.hydrate(JSON.parse(cached) as QueryStateSnapshot);
  } catch {
    await storage.delete(CACHE_KEY);
  }
}
