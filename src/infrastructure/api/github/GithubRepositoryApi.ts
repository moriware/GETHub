import { GithubEndpoints } from '@/infrastructure/api/github/endpoints';
import type {
  GithubRepositoryResponse,
  GithubSearchRepositoriesResponse,
  SearchRepositoriesParams,
} from '@/infrastructure/api/github/types';
import { AxiosHttpClient } from '@/infrastructure/http/client/HttpClient';

export class GithubRepositoryApi {
  constructor(private readonly axiosHttpClient: AxiosHttpClient) {}

  searchRepositories(params: SearchRepositoriesParams): Promise<GithubSearchRepositoriesResponse> {
    return this.axiosHttpClient.request<GithubSearchRepositoriesResponse>({
      endpoint: GithubEndpoints.searchRepositories,
      query: {
        q: params.q,
        sort: 'stars',
        order: 'desc',
        page: params.page,
        per_page: params.perPage,
      },
    });
  }

  getRepositoryDetails(owner: string, repo: string): Promise<GithubRepositoryResponse> {
    return this.axiosHttpClient.request<GithubRepositoryResponse>({
      endpoint: GithubEndpoints.repositoryDetails(owner, repo),
    });
  }
}
