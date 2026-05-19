import { DEFAULT_PAGE_SIZE, INITIAL_PAGE } from '@/shared/constants/pagination';

import type { Pagination } from '@/domain/value-objects/Pagination.types';

/**
 * Cria o objeto de paginação com valores padrão da aplicação.
 */
export function createPagination(partial?: Partial<Pagination>): Pagination {
  return {
    page: partial?.page ?? INITIAL_PAGE,
    perPage: partial?.perPage ?? DEFAULT_PAGE_SIZE,
  };
}
