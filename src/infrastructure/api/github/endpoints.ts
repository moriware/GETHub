export const GithubEndpoints = {
  searchRepositories: '/search/repositories',
  repositoryDetails: (owner: string, repo: string) => `/repos/${owner}/${repo}`,
  repositoryIssues: (owner: string, repo: string) => `/repos/${owner}/${repo}/issues`,
} as const;
