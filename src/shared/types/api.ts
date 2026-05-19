export interface PaginatedResult<T> {
  items: T[];
  page: number;
  perPage: number;
  totalCount?: number;
  hasNextPage: boolean;
}

export interface ApiErrorPayload {
  status: number;
  message: string;
  details?: unknown;
}
