import { useCallback, useEffect, useState } from 'react';

import { useQueryClientContext } from '@/core/providers/QueryProvider';
import { container } from '@/infrastructure/di/container';
import { queryKeys } from '@/infrastructure/cache/queryKeys';
import type { IssuesState } from '@/presentation/hooks/issues/useRepositoryIssues.types';
import type { IssueItemViewModel } from '@/presentation/view-models/IssueItemViewModel';
import { INITIAL_PAGE } from '@/shared/constants/pagination';

export function useRepositoryIssues(owner: string, repo: string) {
  const { queryClient } = useQueryClientContext();
  const [items, setItems] = useState<IssueItemViewModel[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const loadPage = useCallback(
    async (nextPage: number, append: boolean) => {
      const key = queryKeys.repositories.issues(owner, `${repo}:${nextPage}`);
      const cached = queryClient.getQueryData<IssuesState>(key);

      if (cached) {
        setItems((prev) => (append ? [...prev, ...cached.items] : cached.items));
        setHasNextPage(cached.hasNextPage);
        setPage(nextPage);
        setError(null);
        return;
      }

      setLoading(true);
      const result = await container.useCases.getRepositoryIssues.execute(owner, repo, nextPage);
      setLoading(false);

      if (!result.ok) {
        setError(result.error.message);
        return;
      }

      const mappedItems = result.value.items.map((issue) => container.mappers.issue.toItemViewModel(issue));
      const state: IssuesState = { items: mappedItems, hasNextPage: result.value.hasNextPage };
      queryClient.setQueryData(key, state);

      setItems((prev) => (append ? [...prev, ...mappedItems] : mappedItems));
      setHasNextPage(result.value.hasNextPage);
      setPage(nextPage);
      setError(null);
    },
    [owner, queryClient, repo],
  );

  useEffect(() => {
    void loadPage(INITIAL_PAGE, false);
  }, [loadPage]);

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage) {
      return;
    }

    await loadPage(page + 1, true);
  }, [hasNextPage, loadPage, loading, page]);

  return {
    items,
    loading,
    error,
    hasNextPage,
    loadMore,
    refetch: () => loadPage(INITIAL_PAGE, false),
  };
}
