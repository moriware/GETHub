import {
  QueryClient,
  dehydrate,
  focusManager,
  hydrate,
  onlineManager,
} from '@tanstack/react-query';
import * as Network from 'expo-network';
import { AppState, type AppStateStatus, Platform } from 'react-native';

import { storage } from '@/infrastructure/storage/Storage.constants';

import { CACHE_KEY, CACHE_VERSION, QUERY_DEFAULTS } from './AppQueryClient.constants';
import type { PersistedQueryClientState } from './AppQueryClient.types';

let hasOnlineManagerBinding = false;

/**
 * Cria a instância central do QueryClient com padrões de cache/retry da aplicação.
 */
export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_DEFAULTS.staleTimeMs,
        gcTime: QUERY_DEFAULTS.gcTimeMs,
        retry: QUERY_DEFAULTS.retryAttempts,
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      },
      mutations: {
        retry: QUERY_DEFAULTS.retryAttempts,
      },
    },
  });
}

/**
 * Liga o onlineManager ao expo-network para refetch automático ao reconectar.
 */
export function setupQueryOnlineManager(): void {
  if (hasOnlineManagerBinding) {
    return;
  }

  hasOnlineManagerBinding = true;

  onlineManager.setEventListener((setOnline) => {
    let hasNetworkEvent = false;

    const subscription = Network.addNetworkStateListener((state) => {
      hasNetworkEvent = true;
      setOnline(Boolean(state.isConnected));
    });

    Network.getNetworkStateAsync()
      .then((state) => {
        if (!hasNetworkEvent) {
          setOnline(Boolean(state.isConnected));
        }
      })
      .catch(() => {
        // Algumas plataformas podem rejeitar a leitura inicial do estado.
      });

    return () => subscription.remove();
  });
}

/**
 * Sincroniza foco do app (foreground/background) com o focusManager do React Query.
 */
export function setupQueryFocusManager(): () => void {
  focusManager.setFocused(Platform.OS === 'web' ? true : AppState.currentState === 'active');

  const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
    if (Platform.OS === 'web') {
      return;
    }

    focusManager.setFocused(status === 'active');
  });

  return () => {
    subscription.remove();
  };
}

/**
 * Persiste o estado atual de queries bem-sucedidas para hidratação no próximo boot.
 */
export async function persistQueryClient(queryClient: QueryClient): Promise<void> {
  const persistedState: PersistedQueryClientState = {
    version: CACHE_VERSION,
    dehydratedState: dehydrate(queryClient),
  };

  await storage.set(CACHE_KEY, JSON.stringify(persistedState));
}

/**
 * Restaura o estado persistido do QueryClient quando existir payload válido.
 */
export async function restorePersistedQueryClient(queryClient: QueryClient): Promise<void> {
  const cached = await storage.getString(CACHE_KEY);

  if (!cached) {
    return;
  }

  try {
    const parsed = JSON.parse(cached) as unknown;

    if (!isPersistedQueryClientState(parsed) || parsed.version !== CACHE_VERSION) {
      await storage.delete(CACHE_KEY);
      return;
    }

    hydrate(queryClient, parsed.dehydratedState);
  } catch {
    await storage.delete(CACHE_KEY);
  }
}

function isPersistedQueryClientState(value: unknown): value is PersistedQueryClientState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return 'version' in value && 'dehydratedState' in value;
}
