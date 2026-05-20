import { GetRepositoryIssuesUseCase } from '@/application/use-cases/issues/GetRepositoryIssuesUseCase';
import { GetRepositoryDetailsUseCase } from '@/application/use-cases/repositories/GetRepositoryDetailsUseCase';
import { SearchRepositoriesUseCase } from '@/application/use-cases/repositories/SearchRepositoriesUseCase';
import { GithubIssuesApi } from '@/infrastructure/api/github/GithubIssuesApi';
import { GithubRepositoryApi } from '@/infrastructure/api/github/GithubRepositoryApi';
import { GithubHttpClient } from '@/infrastructure/http/github/GithubHttpClient';
import { GithubIssueMapper } from '@/infrastructure/mappers/GithubIssueMapper';
import { GithubRepositoryMapper } from '@/infrastructure/mappers/GithubRepositoryMapper';
import { GithubIssueRepository } from '@/infrastructure/repositories/GithubIssueRepository';
import { GithubRepositoryRepository } from '@/infrastructure/repositories/GithubRepositoryRepository';
import { IssueToViewModelMapper } from '@/presentation/view-models/issues/mappers/IssueToViewModelMapper';
import { RepositoryToViewModelMapper } from '@/presentation/view-models/repositories/mappers/RepositoryToViewModelMapper';

const githubHttpClient = new GithubHttpClient();
const repositoryApi = new GithubRepositoryApi(githubHttpClient);
const issuesApi = new GithubIssuesApi(githubHttpClient);

const repositoryRepository = new GithubRepositoryRepository(
  repositoryApi,
  new GithubRepositoryMapper(),
);
const issueRepository = new GithubIssueRepository(issuesApi, new GithubIssueMapper());

export const container = {
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
