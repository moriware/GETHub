import type { AxiosInstance } from 'axios';

import { env } from '@/core/config/env';
import {
  createGithubAxiosInstance,
  resolveAxiosRequestConfig,
  resolveHttpClientError,
} from '@/infrastructure/http/GithubHttpClient.functions';
import type { HttpClient, HttpRequest } from '@/infrastructure/http/HttpClient.types';

export class GithubHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl = env.githubBaseUrl, token = env.githubToken) {
    this.client = createGithubAxiosInstance(baseUrl, token);
  }

  async request<T>(request: HttpRequest): Promise<T> {
    try {
      const response = await this.client.request<T>(resolveAxiosRequestConfig(request));
      return response.data;
    } catch (error) {
      throw resolveHttpClientError(error);
    }
  }
}
