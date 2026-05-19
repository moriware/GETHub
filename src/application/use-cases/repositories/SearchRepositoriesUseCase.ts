import type { SearchRepositoriesParams } from '@/application/dto/SearchRepositoriesParams';
import type { Repository } from '@/domain/entities/Repository';
import { DomainError } from '@/domain/errors/DomainError';
import type { IRepositoryRepository } from '@/domain/repositories/IRepositoryRepository';
import type { Result } from '@/domain/types/Result';
import { failure, success } from '@/domain/types/Result';
import { createPagination } from '@/domain/value-objects/Pagination';
import type { PaginatedResult } from '@/shared/types/api';

export class SearchRepositoriesUseCase {
  constructor(private readonly repositoryRepository: IRepositoryRepository) {}

  async execute(
    params: SearchRepositoriesParams,
  ): Promise<Result<PaginatedResult<Repository>, DomainError>> {
    const query = params.query.trim();

    if (!query) {
      return failure(new DomainError('EMPTY_QUERY', 'Search query is required.'));
    }

    try {
      const pagination = createPagination({ page: params.page, perPage: params.perPage });
      const result = await this.repositoryRepository.searchRepositories(query, pagination);

      return success(result);
    } catch {
      return failure(new DomainError('SEARCH_FAILED', 'Failed to search repositories.'));
    }
  }
}
