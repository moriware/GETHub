import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { queryKeys } from '@/infrastructure/cache/app-query-client/AppQueryClient.constants';
import { resolveQueryErrorMessage } from '@/presentation/hooks/query/queryError.functions';
import {
  canLoadRepositoryDetails,
  fetchRepositoryDetails,
} from '@/presentation/hooks/repositories/useRepositoryDetails.functions';
import type { UseRepositoryDetailsResult } from '@/presentation/hooks/repositories/useRepositoryDetails.types';

export function useRepositoryDetails(owner: string, repo: string): UseRepositoryDetailsResult {
  const enabled = canLoadRepositoryDetails(owner, repo);

  const {
    data,
    error: queryError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: queryKeys.repositories.details(owner, repo),
    queryFn: () => fetchRepositoryDetails(owner, repo),
    enabled,
  });

  const load = useCallback(async (): Promise<void> => {
    if (!enabled) {
      return;
    }

    await refetch({ throwOnError: false });
  }, [enabled, refetch]);

  return {
    repository: data ?? null,
    loading: enabled && isPending,
    error: enabled ? resolveQueryErrorMessage(queryError) : null,
    refetch: load,
  };
}
