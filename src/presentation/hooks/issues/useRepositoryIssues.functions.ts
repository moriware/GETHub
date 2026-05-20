import { container } from '@/infrastructure/di/container';
import type { RepositoryIssuesPage } from '@/presentation/hooks/issues/useRepositoryIssues.types';
import type { IssueItemViewModel } from '@/presentation/view-models/issues/IssueItemViewModel';

/**
 * Carrega uma página de issues do repositório e converte os dados para view-model.
 */
export async function fetchRepositoryIssuesPage(
  owner: string,
  repo: string,
  page: number,
): Promise<RepositoryIssuesPage> {
  const result = await container.useCases.getRepositoryIssues.execute(owner, repo, page);

  if (!result.ok) {
    throw result.error;
  }

  return {
    items: result.value.items.map((issue) => container.mappers.issue.toItemViewModel(issue)),
    page,
    hasNextPage: result.value.hasNextPage,
  };
}

/**
 * Resolve o próximo índice de página para paginação infinita.
 */
export function resolveNextRepositoryIssuesPage(
  lastPage: RepositoryIssuesPage,
): number | undefined {
  if (!lastPage.hasNextPage) {
    return undefined;
  }

  return lastPage.page + 1;
}

/**
 * Consolida páginas de issues em uma única lista pronta para renderização.
 */
export function flattenRepositoryIssuesPages(
  pages: RepositoryIssuesPage[] | undefined,
): IssueItemViewModel[] {
  if (!pages) {
    return [];
  }

  return pages.flatMap((page) => page.items);
}

/**
 * Indica se já existe contexto suficiente para consultar issues.
 */
export function canLoadRepositoryIssues(owner: string, repo: string): boolean {
  return owner.trim().length > 0 && repo.trim().length > 0;
}
