import type { queryClient } from '@/infrastructure/cache/app-query-client/AppQueryClient';

export interface QueryContextValue {
  queryClient: typeof queryClient;
}

export interface QueryProviderProps {
  children: React.ReactNode;
}
