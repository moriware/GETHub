import React, { createContext, useContext, useMemo } from 'react';

import { createQueryContextValue } from '@/core/providers/QueryProvider.functions';
import type { QueryContextValue, QueryProviderProps } from '@/core/providers/QueryProvider.types';
import { persistQueryClient, restorePersistedQueryClient } from '@/infrastructure/cache/persistQueryClient';

const QueryContext = createContext<QueryContextValue | null>(null);

export function QueryProvider({ children }: QueryProviderProps): React.JSX.Element {
  const value = useMemo<QueryContextValue>(() => {
    restorePersistedQueryClient();
    return createQueryContextValue();
  }, []);

  React.useEffect(() => {
    return () => {
      persistQueryClient();
    };
  }, []);

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
}

export function useQueryClientContext(): QueryContextValue {
  const context = useContext(QueryContext);

  if (!context) {
    throw new Error('useQueryClientContext must be used inside QueryProvider.');
  }

  return context;
}
