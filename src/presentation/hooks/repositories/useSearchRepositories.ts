import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { queryKeys } from '@/infrastructure/cache/app-query-client/AppQueryClient.constants';
import {
  fetchSearchRepositoriesPage,
  flattenSearchPages,
  normalizeSearchQuery,
  resolveNextSearchPage,
} from '@/presentation/hooks/repositories/useSearchRepositories.functions';
import { resolveQueryErrorMessage } from '@/presentation/hooks/query/queryError.functions';
import type { UseSearchRepositoriesResult } from '@/presentation/hooks/repositories/useSearchRepositories.types';
import { INITIAL_PAGE } from '@/shared/constants/pagination';

export function useSearchRepositories(): UseSearchRepositoriesResult {
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const normalizedQuery = normalizeSearchQuery(query);
  const hasQuery = normalizedQuery.length > 0;

  const {
    data,
    error: queryError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKeys.repositories.search(normalizedQuery),
    queryFn: async ({ pageParam }) => {
      const page = typeof pageParam === 'number' ? pageParam : INITIAL_PAGE;
      return fetchSearchRepositoriesPage(normalizedQuery, page);
    },
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: resolveNextSearchPage,
    enabled: hasQuery,
  });

  const items = useMemo(() => flattenSearchPages(data?.pages), [data?.pages]);
  const loading = hasQuery && (isPending || isFetchingNextPage || isRefetching);
  const error = hasQuery ? resolveQueryErrorMessage(queryError) : null;

  const search = useCallback(
    async (nextQuery: string) => {
      const nextNormalizedQuery = normalizeSearchQuery(nextQuery);

      if (nextNormalizedQuery === normalizedQuery) {
        if (nextNormalizedQuery.length > 0) {
          await refetch({ throwOnError: false });
        }

        return;
      }

      setQuery(nextNormalizedQuery);
    },
    [normalizedQuery, refetch],
  );

  const loadMore = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const refresh = useCallback(async () => {
    if (!hasQuery) {
      return;
    }

    setRefreshing(true);
    try {
      await refetch({ throwOnError: false });
    } finally {
      setRefreshing(false);
    }
  }, [hasQuery, refetch]);

  return {
    query,
    items,
    loading,
    refreshing,
    error,
    hasNextPage: Boolean(hasNextPage),
    search,
    loadMore,
    refresh,
  };
}
