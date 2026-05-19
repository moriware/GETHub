import { router } from 'expo-router';

/**
 * Navega para a tela de issues abertas de um repositório.
 */
export function navigateToRepositoryIssues(owner: string, repo: string): void {
  router.push({
    pathname: '/repository/[owner]/[name]/issues',
    params: { owner, name: repo },
  });
}
