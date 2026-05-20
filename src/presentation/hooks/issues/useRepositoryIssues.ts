import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { queryKeys } from '@/infrastructure/cache/app-query-client/AppQueryClient.constants';
import {
  canLoadRepositoryIssues,
  fetchRepositoryIssuesPage,
  flattenRepositoryIssuesPages,
  resolveNextRepositoryIssuesPage,
} from '@/presentation/hooks/issues/useRepositoryIssues.functions';
import type { UseRepositoryIssuesResult } from '@/presentation/hooks/issues/useRepositoryIssues.types';
import { resolveQueryErrorMessage } from '@/presentation/hooks/query/queryError.functions';
import { INITIAL_PAGE } from '@/shared/constants/pagination';

export function useRepositoryIssues(owner: string, repo: string): UseRepositoryIssuesResult {
  const enabled = canLoadRepositoryIssues(owner, repo);
  const [refreshing, setRefreshing] = useState(false);

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
    queryKey: queryKeys.repositories.issues(owner, repo),
    queryFn: async ({ pageParam }) => {
      const page = typeof pageParam === 'number' ? pageParam : INITIAL_PAGE;
      return fetchRepositoryIssuesPage(owner, repo, page);
    },
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: resolveNextRepositoryIssuesPage,
    enabled,
  });

  const items = useMemo(() => flattenRepositoryIssuesPages(data?.pages), [data?.pages]);
  const error = enabled ? resolveQueryErrorMessage(queryError) : null;
  const loading = enabled && (isPending || isFetchingNextPage || isRefetching);

  const loadMore = useCallback(async (): Promise<void> => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const reload = useCallback(async (): Promise<void> => {
    if (!enabled) {
      return;
    }

    await refetch({ throwOnError: false });
  }, [enabled, refetch]);

  const refresh = useCallback(async (): Promise<void> => {
    if (!enabled) {
      return;
    }

    setRefreshing(true);
    try {
      await refetch({ throwOnError: false });
    } finally {
      setRefreshing(false);
    }
  }, [enabled, refetch]);

  return {
    items,
    loading,
    refreshing,
    error,
    hasNextPage: Boolean(hasNextPage),
    loadMore,
    refresh,
    refetch: reload,
  };
}
