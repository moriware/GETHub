import type { Repository } from '@/domain/entities/Repository';
import type {
  GithubRepositoryResponse,
  GithubSearchRepositoriesResponse,
} from '@/infrastructure/api/github/types';
import type { PaginatedResult } from '@/shared/types/api';

export class GithubRepositoryMapper {
  toDomain(item: GithubRepositoryResponse): Repository {
    return {
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      description: item.description,
      stars: item.stargazers_count,
      forks: item.forks_count,
      watchers: item.watchers_count,
      language: item.language,
      owner: {
        id: item.owner.id,
        login: item.owner.login,
        avatarUrl: item.owner.avatar_url,
        htmlUrl: item.owner.html_url,
      },
    };
  }

  toPaginatedDomain(
    response: GithubSearchRepositoriesResponse,
    page: number,
    perPage: number,
  ): PaginatedResult<Repository> {
    const items = response.items.map((item) => this.toDomain(item));
    const totalFetched = page * perPage;

    return {
      items,
      page,
      perPage,
      totalCount: response.total_count,
      hasNextPage: totalFetched < response.total_count,
    };
  }
}
