export const CACHE_KEY = 'query-cache';

export const queryKeys = {
  repositories: {
    search: (query: string) => ['repositories', 'search', query] as const,
    details: (owner: string, repo: string) => ['repositories', 'details', owner, repo] as const,
    issues: (owner: string, repo: string) => ['repositories', 'issues', owner, repo] as const,
  },
} as const;
