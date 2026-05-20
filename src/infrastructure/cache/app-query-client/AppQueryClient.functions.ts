import { queryClient } from '@/infrastructure/cache/app-query-client/AppQueryClient';
import { QueryStateSnapshot } from '@/infrastructure/cache/app-query-client/AppQueryClient.types';
import { storage } from '../../storage/Storage.constants';
import { CACHE_KEY } from './AppQueryClient.constants';

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
