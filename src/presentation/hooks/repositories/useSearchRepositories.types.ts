import type { RepositoryItemViewModel } from '@/presentation/view-models/repositories/RepositoryItemViewModel';

export interface SearchRepositoriesPage {
  items: RepositoryItemViewModel[];
  page: number;
  hasNextPage: boolean;
}

export interface UseSearchRepositoriesResult {
  query: string;
  items: RepositoryItemViewModel[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  hasNextPage: boolean;
  search: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}
