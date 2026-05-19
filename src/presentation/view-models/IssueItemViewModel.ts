export interface IssueItemViewModel {
  id: number;
  title: string;
  author: string;
  createdAtRelative: string;
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}
