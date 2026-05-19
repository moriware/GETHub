import { useCallback, useState } from 'react';

import { useQueryClientContext } from '@/core/providers/QueryProvider';
import { queryKeys } from '@/infrastructure/cache/queryKeys';
import { container } from '@/infrastructure/di/container';
import type { SearchState } from '@/presentation/hooks/repositories/useSearchRepositories.types';
import type { RepositoryItemViewModel } from '@/presentation/view-models/RepositoryItemViewModel';
import { INITIAL_PAGE } from '@/shared/constants/pagination';

export function useSearchRepositories() {
  const { queryClient } = useQueryClientContext();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<RepositoryItemViewModel[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    async (nextQuery: string, nextPage: number, append: boolean) => {
      const trimmed = nextQuery.trim();

      if (!trimmed) {
        setItems([]);
        setError(null);
        setHasNextPage(false);
        setPage(INITIAL_PAGE);
        return;
      }

      const cacheKey = queryKeys.repositories.search(`${trimmed}:${nextPage}`);
      const cached = queryClient.getQueryData<SearchState>(cacheKey);

      if (cached) {
        setItems((prev) => (append ? [...prev, ...cached.items] : cached.items));
        setHasNextPage(cached.hasNextPage);
        setPage(nextPage);
        setError(null);
        return;
      }

      setLoading(true);
      const result = await container.useCases.searchRepositories.execute({
        query: trimmed,
        page: nextPage,
      });
      setLoading(false);

      if (!result.ok) {
        setError(result.error.message);
        return;
      }

      const mappedItems = result.value.items.map((repo) =>
        container.mappers.repository.toItemViewModel(repo),
      );
      const state: SearchState = {
        items: mappedItems,
        hasNextPage: result.value.hasNextPage,
      };

      queryClient.setQueryData(cacheKey, state);
      setItems((prev) => (append ? [...prev, ...mappedItems] : mappedItems));
      setHasNextPage(result.value.hasNextPage);
      setPage(nextPage);
      setError(null);
    },
    [queryClient],
  );

  const search = useCallback(
    async (nextQuery: string) => {
      setQuery(nextQuery);
      await fetchPage(nextQuery, INITIAL_PAGE, false);
    },
    [fetchPage],
  );

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage) {
      return;
    }

    await fetchPage(query, page + 1, true);
  }, [fetchPage, hasNextPage, loading, page, query]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPage(query, INITIAL_PAGE, false);
    setRefreshing(false);
  }, [fetchPage, query]);

  return {
    query,
    items,
    loading,
    refreshing,
    error,
    hasNextPage,
    search,
    loadMore,
    refresh,
  };
}
