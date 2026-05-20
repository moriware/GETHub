export interface SearchRepositoriesParams {
  q: string;
  page?: number;
  perPage?: number;
}

export interface GithubOwnerResponse {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GithubRepositoryResponse {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  owner: GithubOwnerResponse;
}

export interface GithubSearchRepositoriesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepositoryResponse[];
}

export interface GithubIssueLabelResponse {
  id: number;
  name: string;
  color: string;
}

export interface GithubIssueResponse {
  id: number;
  number: number;
  title: string;
  created_at: string;
  html_url: string;
  user: GithubOwnerResponse;
  labels: GithubIssueLabelResponse[];
}
