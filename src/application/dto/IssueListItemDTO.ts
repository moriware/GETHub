export interface IssueListItemDTO {
  id: number;
  title: string;
  author: string;
  createdAtRelative: string;
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
}
