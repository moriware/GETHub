import { env } from '@/core/config/env';
import { AxiosHttpClient } from '@/infrastructure/http/client/HttpClient';
import { createAxiosInstance } from '@/infrastructure/http/client/HttpClient.functions';
import {
  GITHUB_ACCEPT_HEADER,
  GITHUB_REQUEST_TIMEOUT_MS,
} from '@/infrastructure/http/github/GithubHttpClient.constants';

export class GithubHttpClient extends AxiosHttpClient {
  constructor(baseUrl = env.githubBaseUrl, token = env.githubToken) {
    const client = createAxiosInstance(
      baseUrl,
      GITHUB_REQUEST_TIMEOUT_MS,
      GITHUB_ACCEPT_HEADER,
      token,
    );
    super(client);
  }
}
