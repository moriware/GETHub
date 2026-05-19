import type { Issue } from '@/domain/entities/Issue';
import type { Pagination } from '@/domain/value-objects/Pagination';
import type { PaginatedResult } from '@/shared/types/api';

export interface IIssueRepository {
  getRepositoryIssues(
    owner: string,
    repo: string,
    pagination: Pagination,
  ): Promise<PaginatedResult<Issue>>;
}
