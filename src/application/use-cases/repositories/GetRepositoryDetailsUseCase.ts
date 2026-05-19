import type { Repository } from '@/domain/entities/Repository';
import { DomainError } from '@/domain/errors/DomainError';
import type { IRepositoryRepository } from '@/domain/repositories/IRepositoryRepository';
import type { Result } from '@/domain/types/Result';
import { failure, success } from '@/domain/types/Result';

export class GetRepositoryDetailsUseCase {
  constructor(private readonly repositoryRepository: IRepositoryRepository) {}

  async execute(owner: string, repo: string): Promise<Result<Repository, DomainError>> {
    if (!owner.trim() || !repo.trim()) {
      return failure(new DomainError('INVALID_REPOSITORY_ID', 'Owner and repo are required.'));
    }

    try {
      const repository = await this.repositoryRepository.getRepositoryDetails(owner, repo);
      return success(repository);
    } catch {
      return failure(new DomainError('DETAILS_FAILED', 'Failed to load repository details.'));
    }
  }
}
