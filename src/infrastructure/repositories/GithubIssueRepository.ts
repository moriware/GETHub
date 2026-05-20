import type { IIssueRepository } from '@/domain/contracts/IIssueRepository';
import type { Issue } from '@/domain/entities/Issue';
import type { Pagination } from '@/domain/value-objects/pagination/Pagination';
import { GithubIssuesApi } from '@/infrastructure/api/github/GithubIssuesApi';
import type { GithubIssueResponse } from '@/infrastructure/api/github/types';
import { GithubIssueMapper } from '@/infrastructure/mappers/GithubIssueMapper';
import type { PaginatedResult } from '@/shared/types/api';

export class GithubIssueRepository implements IIssueRepository {
  constructor(
    private readonly api: GithubIssuesApi,
    private readonly mapper: GithubIssueMapper,
  ) {}

  async getRepositoryIssues(
    owner: string,
    repo: string,
    pagination: Pagination,
  ): Promise<PaginatedResult<Issue>> {
    const response: GithubIssueResponse[] = await this.api.getRepositoryIssues(
      owner,
      repo,
      pagination.page,
      pagination.perPage,
    );

    return this.mapper.toPaginatedDomain(response, pagination.page, pagination.perPage);
  }
}
