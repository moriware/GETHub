import type { IssueItemViewModel } from '@/presentation/view-models/IssueItemViewModel';

export interface IssuesState {
  items: IssueItemViewModel[];
  hasNextPage: boolean;
}
