import type { SearchRepositoriesParams } from '@/application/dto/SearchRepositoriesParams';
import { GithubEndpoints } from '@/infrastructure/api/github/endpoints';
import type {
  GithubRepositoryResponse,
  GithubSearchRepositoriesResponse,
} from '@/infrastructure/api/github/types';
import type { HttpClient } from '@/infrastructure/http/HttpClient.types';

export class GithubRepositoryApi {
  constructor(private readonly httpClient: HttpClient) {}

  searchRepositories(params: SearchRepositoriesParams): Promise<GithubSearchRepositoriesResponse> {
    return this.httpClient.request<GithubSearchRepositoriesResponse>({
      endpoint: GithubEndpoints.searchRepositories,
      query: {
        q: params.query,
        sort: 'stars',
        order: 'desc',
        page: params.page,
        per_page: params.perPage,
      },
    });
  }

  getRepositoryDetails(owner: string, repo: string): Promise<GithubRepositoryResponse> {
    return this.httpClient.request<GithubRepositoryResponse>({
      endpoint: GithubEndpoints.repositoryDetails(owner, repo),
    });
  }
}
