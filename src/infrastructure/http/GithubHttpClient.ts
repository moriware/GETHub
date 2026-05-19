import { env } from '@/core/config/env';
import { HttpClientError } from '@/infrastructure/http/HttpClient';
import type { HttpClient, HttpRequest } from '@/infrastructure/http/types';

export class GithubHttpClient implements HttpClient {
  constructor(
    private readonly baseUrl = env.githubBaseUrl,
    private readonly token = env.githubToken,
  ) {}

  async request<T>(request: HttpRequest): Promise<T> {
    const url = new URL(request.endpoint, this.baseUrl);

    if (request.query) {
      Object.entries(request.query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: request.method ?? 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...request.headers,
      },
      body: request.body ? JSON.stringify(request.body) : undefined,
      signal: request.signal,
    });

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');
    const responseBody = isJson
      ? ((await response.json()) as unknown)
      : undefined;

    if (!response.ok) {
      throw new HttpClientError({
        status: response.status,
        message: this.resolveErrorMessage(response.status),
        details: responseBody,
      });
    }

    return responseBody as T;
  }

  private resolveErrorMessage(status: number): string {
    if (status === 403) {
      return 'Rate limit exceeded on GitHub API.';
    }
    if (status === 404) {
      return 'Resource not found.';
    }

    return 'GitHub request failed.';
  }
}
