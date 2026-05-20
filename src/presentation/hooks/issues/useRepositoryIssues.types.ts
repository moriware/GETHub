import type { IssueItemViewModel } from '@/presentation/view-models/issues/IssueItemViewModel';

export interface RepositoryIssuesPage {
  items: IssueItemViewModel[];
  page: number;
  hasNextPage: boolean;
}

export interface UseRepositoryIssuesResult {
  items: IssueItemViewModel[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}
