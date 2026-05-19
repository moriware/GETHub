import type { Owner } from '@/domain/entities/Owner';

export interface IssueLabel {
  id: number;
  name: string;
  color: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  author: Owner;
  labels: IssueLabel[];
  createdAt: string;
  htmlUrl: string;
}
