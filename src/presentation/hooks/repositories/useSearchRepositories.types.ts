import type { RepositoryItemViewModel } from '@/presentation/view-models/RepositoryItemViewModel';

export interface SearchState {
  items: RepositoryItemViewModel[];
  hasNextPage: boolean;
}
