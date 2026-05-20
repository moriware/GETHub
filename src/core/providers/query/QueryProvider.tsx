import { QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AppState } from 'react-native';

import { shouldPersistQueryCache } from '@/core/providers/query/QueryProvider.functions';
import type { QueryProviderProps } from '@/core/providers/query/QueryProvider.types';
import {
  persistQueryClient,
  restorePersistedQueryClient,
  setupQueryFocusManager,
  setupQueryOnlineManager,
} from '@/infrastructure/cache/app-query-client/AppQueryClient.functions';
import { queryClient } from '@/infrastructure/cache/app-query-client/AppQueryClient';

export function QueryProvider({ children }: QueryProviderProps): React.JSX.Element {
  const [isHydrated, setIsHydrated] = useState(false);

  React.useEffect(() => {
    setupQueryOnlineManager();
    const removeFocusListener = setupQueryFocusManager();

    let isMounted = true;

    const hydrateCache = async () => {
      try {
        await restorePersistedQueryClient(queryClient);
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    };

    void hydrateCache();

    return () => {
      isMounted = false;
      removeFocusListener();
      void persistQueryClient(queryClient);
    };
  }, []);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (!shouldPersistQueryCache(nextState)) {
        return;
      }

      void persistQueryClient(queryClient);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
