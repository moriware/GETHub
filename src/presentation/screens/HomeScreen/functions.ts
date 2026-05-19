import { router } from 'expo-router';

/**
 * Executa a busca de repositórios com o termo informado.
 */
export async function runSearch(search: (query: string) => Promise<void>, input: string): Promise<void> {
  await search(input);
}

/**
 * Reexecuta a busca usando o último termo válido disponível.
 */
export async function runRetrySearch(
  search: (query: string) => Promise<void>,
  query: string,
  input: string,
): Promise<void> {
  await search(query || input);
}

/**
 * Atualiza a listagem atual de repositórios.
 */
export async function runRefresh(refresh: () => Promise<void>): Promise<void> {
  await refresh();
}

/**
 * Carrega a próxima página quando houver paginação disponível.
 */
export async function runLoadMore(loadMore: () => Promise<void>, hasNextPage: boolean): Promise<void> {
  if (!hasNextPage) {
    return;
  }

  await loadMore();
}

/**
 * Navega para os detalhes de um repositório a partir do fullName owner/repo.
 */
export function navigateToRepositoryDetails(fullName: string): void {
  const [owner, repo] = fullName.split('/');

  if (!owner || !repo) {
    return;
  }

  router.push({
    pathname: '/repository/[owner]/[name]',
    params: { owner, name: repo },
  });
}
