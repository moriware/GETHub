import type { Issue } from '@/domain/entities/Issue';
import type { GithubIssueResponse } from '@/infrastructure/api/github/types';
import type { PaginatedResult } from '@/shared/types/api';

export class GithubIssueMapper {
  toDomain(item: GithubIssueResponse): Issue {
    return {
      id: item.id,
      number: item.number,
      title: item.title,
      createdAt: item.created_at,
      htmlUrl: item.html_url,
      author: {
        id: item.user.id,
        login: item.user.login,
        avatarUrl: item.user.avatar_url,
        htmlUrl: item.user.html_url,
      },
      labels: item.labels.map((label) => ({
        id: label.id,
        name: label.name,
        color: label.color,
      })),
    };
  }

  toPaginatedDomain(
    items: GithubIssueResponse[],
    page: number,
    perPage: number,
  ): PaginatedResult<Issue> {
    return {
      items: items.map((item) => this.toDomain(item)),
      page,
      perPage,
      hasNextPage: items.length === perPage,
    };
  }
}
