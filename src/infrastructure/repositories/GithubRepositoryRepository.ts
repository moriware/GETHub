import type { IRepositoryRepository } from '@/domain/contracts/IRepositoryRepository';
import type { Repository } from '@/domain/entities/Repository';
import type { Pagination } from '@/domain/value-objects/pagination/Pagination';
import { GithubRepositoryApi } from '@/infrastructure/api/github/GithubRepositoryApi';
import { GithubRepositoryMapper } from '@/infrastructure/mappers/GithubRepositoryMapper';
import type { PaginatedResult } from '@/shared/types/api';

export class GithubRepositoryRepository implements IRepositoryRepository {
  constructor(
    private readonly api: GithubRepositoryApi,
    private readonly mapper: GithubRepositoryMapper,
  ) {}

  async searchRepositories(
    query: string,
    pagination: Pagination,
  ): Promise<PaginatedResult<Repository>> {
    const response = await this.api.searchRepositories({
      q: query,
      page: pagination.page,
      perPage: pagination.perPage,
    });

    return this.mapper.toPaginatedDomain(response, pagination.page, pagination.perPage);
  }

  async getRepositoryDetails(owner: string, repo: string): Promise<Repository> {
    const response = await this.api.getRepositoryDetails(owner, repo);
    return this.mapper.toDomain(response);
  }
}
