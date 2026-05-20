export const HTTP_REQUEST_TIMEOUT_MS = 15000;

export const HTTP_ACCEPT_HEADER = 'application/json';

export const HTTP_ERROR_MESSAGES = {
  RATE_LIMIT: 'Rate limit exceeded.',
  NOT_FOUND: 'Resource not found.',
  TIMEOUT: 'Request timed out.',
  NETWORK: 'Network error while calling API.',
  DEFAULT: 'Request failed.',
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export const HTTP_ERROR_CODES = {
  TIMEOUT: 'ECONNABORTED',
  NOT_FOUND: 'ENOTFOUND',
  NETWORK: 'ENETUNREACH',
} as const;
