export const ROUTES = {
  home: '/',
  designSystem: '/explore',
  repositoryDetails: (owner: string, repo: string) => `/repository/${owner}/${repo}`,
  repositoryIssues: (owner: string, repo: string) => `/repository/${owner}/${repo}/issues`,
} as const;
