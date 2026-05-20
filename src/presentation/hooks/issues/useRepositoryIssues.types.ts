import type { IssueItemViewModel } from '@/presentation/view-models/issues/IssueItemViewModel';

export interface IssuesState {
  items: IssueItemViewModel[];
  hasNextPage: boolean;
}
