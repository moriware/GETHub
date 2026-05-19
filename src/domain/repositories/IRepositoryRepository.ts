import type { Repository } from '@/domain/entities/Repository';
import type { Pagination } from '@/domain/value-objects/Pagination';
import type { PaginatedResult } from '@/shared/types/api';

export interface IRepositoryRepository {
  searchRepositories(query: string, pagination: Pagination): Promise<PaginatedResult<Repository>>;
  getRepositoryDetails(owner: string, repo: string): Promise<Repository>;
}
