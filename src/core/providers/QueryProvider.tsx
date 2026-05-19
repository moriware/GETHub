import React, { createContext, useContext, useMemo, useState } from 'react';
import { AppState } from 'react-native';

import { createQueryContextValue } from '@/core/providers/QueryProvider.functions';
import type { QueryContextValue, QueryProviderProps } from '@/core/providers/QueryProvider.types';
import {
  persistQueryClient,
  restorePersistedQueryClient,
} from '@/infrastructure/cache/persistQueryClient';

const QueryContext = createContext<QueryContextValue | null>(null);

export function QueryProvider({ children }: QueryProviderProps): React.JSX.Element {
  const value = useMemo<QueryContextValue>(() => createQueryContextValue(), []);
  const [isHydrated, setIsHydrated] = useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const hydrateCache = async () => {
      try {
        await restorePersistedQueryClient();
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    };

    void hydrateCache();

    return () => {
      isMounted = false;
      void persistQueryClient();
    };
  }, []);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        return;
      }

      void persistQueryClient();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
}

export function useQueryClientContext(): QueryContextValue {
  const context = useContext(QueryContext);

  if (!context) {
    throw new Error('useQueryClientContext must be used inside QueryProvider.');
  }

  return context;
}
