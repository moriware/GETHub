export const CACHE_KEY = 'query-cache';
export const CACHE_VERSION = 1;

export const QUERY_DEFAULTS = {
  staleTimeMs: 60_000,
  gcTimeMs: 86_400_000,
  retryAttempts: 1,
} as const;

export const queryKeys = {
  repositories: {
    search: (query: string) => ['repositories', 'search', query.trim().toLowerCase()] as const,
    details: (owner: string, repo: string) => ['repositories', 'details', owner, repo] as const,
    issues: (owner: string, repo: string) => ['repositories', 'issues', owner, repo] as const,
  },
} as const;
