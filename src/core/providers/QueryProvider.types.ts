import type { queryClient } from '@/infrastructure/cache/queryClient';

export interface QueryContextValue {
  queryClient: typeof queryClient;
}

export interface QueryProviderProps {
  children: React.ReactNode;
}
