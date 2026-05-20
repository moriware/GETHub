import { describe, expect, it, jest } from '@jest/globals';

import { GetRepositoryDetailsUseCase } from '@/application/use-cases/repositories/GetRepositoryDetailsUseCase';
import type { IRepositoryRepository } from '@/domain/contracts/IRepositoryRepository';
import type { Repository } from '@/domain/entities/Repository';

function createRepositoryMock(): Repository {
  return {
    id: 10,
    name: 'expo',
    fullName: 'expo/expo',
    description: 'Expo framework',
    stars: 999,
    forks: 100,
    watchers: 300,
    language: 'TypeScript',
    owner: {
      id: 2,
      login: 'expo',
      avatarUrl: 'https://example.com/expo.png',
      htmlUrl: 'https://github.com/expo',
    },
  };
}

describe('GetRepositoryDetailsUseCase', () => {
  it('retorna falha quando owner ou repo estão vazios', async () => {
    const searchRepositories = jest.fn<IRepositoryRepository['searchRepositories']>();
    const getRepositoryDetails = jest.fn<IRepositoryRepository['getRepositoryDetails']>();
    const repositoryRepository: IRepositoryRepository = {
      searchRepositories,
      getRepositoryDetails,
    };
    const useCase = new GetRepositoryDetailsUseCase(repositoryRepository);

    const result = await useCase.execute(' ', ' ');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('INVALID_REPOSITORY_ID');
    }
    expect(getRepositoryDetails).not.toHaveBeenCalled();
  });

  it('retorna sucesso quando o repositório responde corretamente', async () => {
    const repository = createRepositoryMock();
    const searchRepositories = jest.fn<IRepositoryRepository['searchRepositories']>();
    const getRepositoryDetails = jest
      .fn<IRepositoryRepository['getRepositoryDetails']>()
      .mockResolvedValue(repository);
    const repositoryRepository: IRepositoryRepository = {
      searchRepositories,
      getRepositoryDetails,
    };
    const useCase = new GetRepositoryDetailsUseCase(repositoryRepository);

    const result = await useCase.execute('expo', 'expo');

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual(repository);
    }
    expect(getRepositoryDetails).toHaveBeenCalledWith('expo', 'expo');
  });

  it('retorna DETAILS_FAILED quando o repositório lança erro', async () => {
    const searchRepositories = jest.fn<IRepositoryRepository['searchRepositories']>();
    const getRepositoryDetails = jest
      .fn<IRepositoryRepository['getRepositoryDetails']>()
      .mockRejectedValue(new Error('api error'));
    const repositoryRepository: IRepositoryRepository = {
      searchRepositories,
      getRepositoryDetails,
    };
    const useCase = new GetRepositoryDetailsUseCase(repositoryRepository);

    const result = await useCase.execute('expo', 'expo');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('DETAILS_FAILED');
    }
  });
});
