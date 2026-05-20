import type { RepositoryItemViewModel } from '@/presentation/view-models/repositories/RepositoryItemViewModel';

export interface SearchState {
  items: RepositoryItemViewModel[];
  hasNextPage: boolean;
}
