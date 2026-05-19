import type { ApiErrorPayload } from '@/shared/types/api';

export class HttpClientError extends Error {
  public readonly payload: ApiErrorPayload;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = 'HttpClientError';
    this.payload = payload;
  }
}
