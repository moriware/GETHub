import { create, isAxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import {
  HTTP_ACCEPT_HEADER,
  HTTP_ERROR_CODES,
  HTTP_ERROR_MESSAGES,
  HTTP_METHODS,
  HTTP_REQUEST_TIMEOUT_MS,
} from '@/infrastructure/http/client/HttpClient.constants';
import type { HttpRequest } from '@/infrastructure/http/client/HttpClient.types';
import { HttpClientError } from '@/infrastructure/http/client/HttpClientError';

/**
 * Cria uma instância Axios configurada para a API do GitHub.
 * @param baseUrl URL base da API
 * @param timeout Tempo limite para requisições (padrão: 15000ms)
 * @param acceptHeader Valor do header Accept (padrão: 'application/json')
 * @param token Token de autenticação (opcional)
 * @returns Instância configurada do Axios
 */
export function createAxiosInstance(
  baseUrl: string,
  timeout: number = HTTP_REQUEST_TIMEOUT_MS,
  acceptHeader: string = HTTP_ACCEPT_HEADER,
  token?: string,
): AxiosInstance {
  return create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: {
      Accept: acceptHeader,
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
    method: request.method ?? HTTP_METHODS.GET,
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
      message: HTTP_ERROR_MESSAGES.DEFAULT,
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

/** Resolve uma mensagem de erro amigável com base no status HTTP e código de erro.
 * @param status HTTP do erro
 * @param errorCode Código de erro do Axios (ex: 'ECONNABORTED' para timeout)
 * @returns Mensagem de erro amigável para exibir ao usuário
 */
function resolveErrorMessage(status: number, errorCode?: string): string {
  if (status === 403) {
    return HTTP_ERROR_MESSAGES.RATE_LIMIT;
  }

  if (status === 404 || errorCode === HTTP_ERROR_CODES.NOT_FOUND) {
    return HTTP_ERROR_MESSAGES.NOT_FOUND;
  }

  if (errorCode === HTTP_ERROR_CODES.TIMEOUT) {
    return HTTP_ERROR_MESSAGES.TIMEOUT;
  }

  if (status === 0 || errorCode === HTTP_ERROR_CODES.NETWORK) {
    return HTTP_ERROR_MESSAGES.NETWORK;
  }

  return HTTP_ERROR_MESSAGES.DEFAULT;
}
