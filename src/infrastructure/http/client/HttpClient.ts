import { AxiosInstance } from 'axios';
import { resolveAxiosRequestConfig, resolveHttpClientError } from './HttpClient.functions';
import { HttpClient, HttpRequest } from './HttpClient.types';

export class AxiosHttpClient implements HttpClient {
  protected readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
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
