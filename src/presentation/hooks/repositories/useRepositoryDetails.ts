import { useCallback, useEffect, useState } from 'react';

import { useQueryClientContext } from '@/core/providers/query/QueryProvider';
import { queryKeys } from '@/infrastructure/cache/app-query-client/AppQueryClient.constants';
import { container } from '@/infrastructure/di/container';
import type { RepositoryDetailsViewModel } from '@/presentation/view-models/repositories/RepositoryDetailsViewModel';

export function useRepositoryDetails(owner: string, repo: string) {
  const { queryClient } = useQueryClientContext();
  const [repository, setRepository] = useState<RepositoryDetailsViewModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const key = queryKeys.repositories.details(owner, repo);
    const cached = queryClient.getQueryData<RepositoryDetailsViewModel>(key);

    if (cached) {
      setRepository(cached);
      setError(null);
      return;
    }

    setLoading(true);
    const result = await container.useCases.getRepositoryDetails.execute(owner, repo);
    setLoading(false);

    if (!result.ok) {
      setError(result.error.message);
      return;
    }

    const viewModel = container.mappers.repository.toDetailsViewModel(result.value);
    queryClient.setQueryData(key, viewModel);
    setRepository(viewModel);
    setError(null);
  }, [owner, queryClient, repo]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    repository,
    loading,
    error,
    refetch: load,
  };
}
