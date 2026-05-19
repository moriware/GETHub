import { IssueToViewModelMapper } from '@/application/mappers/IssueToViewModelMapper';
import { RepositoryToViewModelMapper } from '@/application/mappers/RepositoryToViewModelMapper';
import { GetRepositoryIssuesUseCase } from '@/application/use-cases/issues/GetRepositoryIssuesUseCase';
import { GetRepositoryDetailsUseCase } from '@/application/use-cases/repositories/GetRepositoryDetailsUseCase';
import { SearchRepositoriesUseCase } from '@/application/use-cases/repositories/SearchRepositoriesUseCase';
import { GithubIssuesApi } from '@/infrastructure/api/github/GithubIssuesApi';
import { GithubRepositoryApi } from '@/infrastructure/api/github/GithubRepositoryApi';
import { queryClient } from '@/infrastructure/cache/queryClient';
import { GithubIssueMapper } from '@/infrastructure/mappers/GithubIssueMapper';
import { GithubRepositoryMapper } from '@/infrastructure/mappers/GithubRepositoryMapper';
import { GithubIssueRepository } from '@/infrastructure/repositories/GithubIssueRepository';
import { GithubRepositoryRepository } from '@/infrastructure/repositories/GithubRepositoryRepository';
import { GithubHttpClient } from '@/infrastructure/http/GithubHttpClient';

const httpClient = new GithubHttpClient();
const repositoryApi = new GithubRepositoryApi(httpClient);
const issuesApi = new GithubIssuesApi(httpClient);

const repositoryRepository = new GithubRepositoryRepository(repositoryApi, new GithubRepositoryMapper());
const issueRepository = new GithubIssueRepository(issuesApi, new GithubIssueMapper());

export const container = {
  queryClient,
  mappers: {
    repository: new RepositoryToViewModelMapper(),
    issue: new IssueToViewModelMapper(),
  },
  useCases: {
    searchRepositories: new SearchRepositoriesUseCase(repositoryRepository),
    getRepositoryDetails: new GetRepositoryDetailsUseCase(repositoryRepository),
    getRepositoryIssues: new GetRepositoryIssuesUseCase(issueRepository),
  },
} as const;
