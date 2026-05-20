import { container } from '@/infrastructure/di/container';
import type { SearchRepositoriesPage } from '@/presentation/hooks/repositories/useSearchRepositories.types';
import type { RepositoryItemViewModel } from '@/presentation/view-models/repositories/RepositoryItemViewModel';

/**
 * Normaliza o texto informado pelo usuário antes de montar a query key.
 */
export function normalizeSearchQuery(query: string): string {
  return query.trim();
}

/**
 * Carrega uma página de repositórios a partir do caso de uso e converte para view-model.
 */
export async function fetchSearchRepositoriesPage(
  query: string,
  page: number,
): Promise<SearchRepositoriesPage> {
  const result = await container.useCases.searchRepositories.execute({ query, page });

  if (!result.ok) {
    throw result.error;
  }

  return {
    items: result.value.items.map((repository) =>
      container.mappers.repository.toItemViewModel(repository),
    ),
    page,
    hasNextPage: result.value.hasNextPage,
  };
}

/**
 * Resolve o próximo índice de página para o infinite query.
 */
export function resolveNextSearchPage(lastPage: SearchRepositoriesPage): number | undefined {
  if (!lastPage.hasNextPage) {
    return undefined;
  }

  return lastPage.page + 1;
}

/**
 * Consolida todas as páginas retornadas em uma lista única para renderização.
 */
export function flattenSearchPages(
  pages: SearchRepositoriesPage[] | undefined,
): RepositoryItemViewModel[] {
  if (!pages) {
    return [];
  }

  return pages.flatMap((page) => page.items);
}
