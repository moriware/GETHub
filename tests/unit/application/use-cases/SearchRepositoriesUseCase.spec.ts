import { describe, expect, it, jest } from '@jest/globals';

import { SearchRepositoriesUseCase } from '@/application/use-cases/repositories/SearchRepositoriesUseCase';
import type { IRepositoryRepository } from '@/domain/contracts/IRepositoryRepository';
import type { Repository } from '@/domain/entities/Repository';
import { DEFAULT_PAGE_SIZE, INITIAL_PAGE } from '@/shared/constants/pagination';
import type { PaginatedResult } from '@/shared/types/api';

function createRepositoryMock(): Repository {
  return {
    id: 1,
    name: 'react',
    fullName: 'facebook/react',
    description: 'React library',
    stars: 100,
    forks: 10,
    watchers: 20,
    language: 'TypeScript',
    owner: {
      id: 1,
      login: 'facebook',
      avatarUrl: 'https://example.com/avatar.png',
      htmlUrl: 'https://github.com/facebook',
    },
  };
}

describe('SearchRepositoriesUseCase', () => {
  it('retorna falha quando a query está vazia', async () => {
    const searchRepositories = jest.fn<IRepositoryRepository['searchRepositories']>();
    const getRepositoryDetails = jest.fn<IRepositoryRepository['getRepositoryDetails']>();
    const repositoryRepository: IRepositoryRepository = {
      searchRepositories,
      getRepositoryDetails,
    };
    const useCase = new SearchRepositoriesUseCase(repositoryRepository);

    const result = await useCase.execute({ query: '   ' });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('EMPTY_QUERY');
    }
    expect(searchRepositories).not.toHaveBeenCalled();
  });

  it('retorna sucesso e chama o repositório com query trimada e paginação padrão', async () => {
    const response: PaginatedResult<Repository> = {
      items: [createRepositoryMock()],
      page: INITIAL_PAGE,
      perPage: DEFAULT_PAGE_SIZE,
      hasNextPage: false,
      totalCount: 1,
    };

    const searchRepositories = jest
      .fn<IRepositoryRepository['searchRepositories']>()
      .mockResolvedValue(response);
    const getRepositoryDetails = jest.fn<IRepositoryRepository['getRepositoryDetails']>();
    const repositoryRepository: IRepositoryRepository = {
      searchRepositories,
      getRepositoryDetails,
    };
    const useCase = new SearchRepositoriesUseCase(repositoryRepository);

    const result = await useCase.execute({ query: '  react native  ' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual(response);
    }
    expect(searchRepositories).toHaveBeenCalledWith('react native', {
      page: INITIAL_PAGE,
      perPage: DEFAULT_PAGE_SIZE,
    });
  });

  it('retorna falha SEARCH_FAILED quando o repositório lança erro', async () => {
    const searchRepositories = jest
      .fn<IRepositoryRepository['searchRepositories']>()
      .mockRejectedValue(new Error('network fail'));
    const getRepositoryDetails = jest.fn<IRepositoryRepository['getRepositoryDetails']>();
    const repositoryRepository: IRepositoryRepository = {
      searchRepositories,
      getRepositoryDetails,
    };
    const useCase = new SearchRepositoriesUseCase(repositoryRepository);

    const result = await useCase.execute({ query: 'react' });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('SEARCH_FAILED');
    }
  });
});
