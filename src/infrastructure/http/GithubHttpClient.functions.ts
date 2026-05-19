import { create, isAxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import {
  GITHUB_ACCEPT_HEADER,
  GITHUB_REQUEST_TIMEOUT_MS,
} from '@/infrastructure/http/GithubHttpClient.constants';
import { HttpClientError } from '@/infrastructure/http/HttpClient';
import type { HttpRequest } from '@/infrastructure/http/HttpClient.types';

/**
 * Cria uma instância Axios configurada para a API do GitHub.
 */
export function createGithubAxiosInstance(baseUrl: string, token: string): AxiosInstance {
  return create({
    baseURL: baseUrl,
    timeout: GITHUB_REQUEST_TIMEOUT_MS,
    headers: {
      Accept: GITHUB_ACCEPT_HEADER,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

/**
 * Converte o contrato interno HttpRequest para configuração do Axios.
 */
export function resolveAxiosRequestConfig(request: HttpRequest): AxiosRequestConfig {
  return {
    url: request.endpoint,
    method: request.method ?? 'GET',
    params: request.query,
    headers: request.headers,
    data: request.body,
    signal: request.signal,
  };
}

/**
 * Traduz erros do Axios para o erro padronizado da aplicação.
 */
export function resolveHttpClientError(error: unknown): HttpClientError {
  if (!isAxiosError(error)) {
    return new HttpClientError({
      status: 0,
      message: 'GitHub request failed.',
      details: error,
    });
  }

  const status = error.response?.status ?? 0;

  return new HttpClientError({
    status,
    message: resolveErrorMessage(status, error.code),
    details: error.response?.data,
  });
}

function resolveErrorMessage(status: number, errorCode?: string): string {
  if (status === 403) {
    return 'Rate limit exceeded on GitHub API.';
  }

  if (status === 404) {
    return 'Resource not found.';
  }

  if (errorCode === 'ECONNABORTED') {
    return 'GitHub request timed out.';
  }

  if (status === 0) {
    return 'Network error while calling GitHub API.';
  }

  return 'GitHub request failed.';
}
