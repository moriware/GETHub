import { DomainError } from '@/domain/errors/DomainError';
import type { Issue } from '@/domain/entities/Issue';
import type { IIssueRepository } from '@/domain/repositories/IIssueRepository';
import type { Result } from '@/domain/types/Result';
import { failure, success } from '@/domain/types/Result';
import { createPagination } from '@/domain/value-objects/Pagination';
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
      return failure(new DomainError('INVALID_REPOSITORY_ID', 'Owner and repo are required.'));
    }

    try {
      const pagination = createPagination({ page, perPage });
      const issues = await this.issueRepository.getRepositoryIssues(owner, repo, pagination);
      return success(issues);
    } catch {
      return failure(new DomainError('ISSUES_FAILED', 'Failed to load repository issues.'));
    }
  }
}
