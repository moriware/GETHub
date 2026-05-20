import type { IRepositoryRepository } from '@/domain/contracts/IRepositoryRepository';
import type { Repository } from '@/domain/entities/Repository';
import { DomainError } from '@/domain/errors/DomainError';
import type { Result } from '@/domain/value-objects/result/Result';
import { failure, success } from '@/domain/value-objects/result/Result';

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
