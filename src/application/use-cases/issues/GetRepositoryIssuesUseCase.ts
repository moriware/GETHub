import type { IIssueRepository } from '@/domain/contracts/IIssueRepository';
import type { Issue } from '@/domain/entities/Issue';
import { DomainError } from '@/domain/errors/DomainError';
import { createPagination } from '@/domain/value-objects/pagination/Pagination';
import type { Result } from '@/domain/value-objects/result/Result';
import { failure, success } from '@/domain/value-objects/result/Result';
import type { PaginatedResult } from '@/shared/types/api';

export class GetRepositoryIssuesUseCase {
  constructor(private readonly issueRepository: IIssueRepository) {}

  async execute(
    owner: string,
    repo: string,
    page?: number,
    perPage?: number,
  ): Promise<Result<PaginatedResult<Issue>, DomainError>> {
    if (!owner.trim() || !repo.trim()) {
      return failure(
        new DomainError('INVALID_REPOSITORY_ID', 'Dono e repositório são obrigatórios.'),
      );
    }

    try {
      const pagination = createPagination({ page, perPage });
      const issues = await this.issueRepository.getRepositoryIssues(owner, repo, pagination);
      return success(issues);
    } catch {
      return failure(new DomainError('ISSUES_FAILED', 'Falha ao carregar issues do repositório.'));
    }
  }
}
