import { GithubEndpoints } from '@/infrastructure/api/github/endpoints';
import type { GithubIssueResponse } from '@/infrastructure/api/github/types';
import type { HttpClient } from '@/infrastructure/http/types';

export class GithubIssuesApi {
  constructor(private readonly httpClient: HttpClient) {}

  getRepositoryIssues(
    owner: string,
    repo: string,
    page: number,
    perPage: number,
  ): Promise<GithubIssueResponse[]> {
    return this.httpClient.request<GithubIssueResponse[]>({
      endpoint: GithubEndpoints.repositoryIssues(owner, repo),
      query: {
        state: 'open',
        page,
        per_page: perPage,
      },
    });
  }
}
