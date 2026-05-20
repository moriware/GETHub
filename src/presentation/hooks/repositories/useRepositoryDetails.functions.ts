import { container } from '@/infrastructure/di/container';
import type { RepositoryDetailsViewModel } from '@/presentation/view-models/repositories/RepositoryDetailsViewModel';

/**
 * Carrega os detalhes de um repositório e converte o retorno para view-model.
 */
export async function fetchRepositoryDetails(
  owner: string,
  repo: string,
): Promise<RepositoryDetailsViewModel> {
  const result = await container.useCases.getRepositoryDetails.execute(owner, repo);

  if (!result.ok) {
    throw result.error;
  }

  return container.mappers.repository.toDetailsViewModel(result.value);
}

/**
 * Indica se os parâmetros mínimos da rota são válidos para consultar o repositório.
 */
export function canLoadRepositoryDetails(owner: string, repo: string): boolean {
  return owner.trim().length > 0 && repo.trim().length > 0;
}
