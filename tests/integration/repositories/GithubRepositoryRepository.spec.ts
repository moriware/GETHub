import { describe, expect, it, jest } from '@jest/globals';

import type { Repository } from '@/domain/entities/Repository';
import type { GithubRepositoryApi } from '@/infrastructure/api/github/GithubRepositoryApi';
import type {
  GithubRepositoryResponse,
  GithubSearchRepositoriesResponse,
} from '@/infrastructure/api/github/types';
import type { GithubRepositoryMapper } from '@/infrastructure/mappers/GithubRepositoryMapper';
import { GithubRepositoryRepository } from '@/infrastructure/repositories/GithubRepositoryRepository';
import type { PaginatedResult } from '@/shared/types/api';

describe('GithubRepositoryRepository', () => {
  it('deve buscar repositórios e mapear resultado paginado', async () => {
    const pagination = { page: 2, perPage: 20 };
    const apiResponse: GithubSearchRepositoriesResponse = {
      total_count: 99,
      incomplete_results: false,
      items: [],
    };
    const mappedResponse: PaginatedResult<Repository> = {
      items: [],
      page: 2,
      perPage: 20,
      hasNextPage: true,
      totalCount: 99,
    };

    const searchRepositories = jest
      .fn<GithubRepositoryApi['searchRepositories']>()
      .mockResolvedValue(apiResponse);
    const getRepositoryDetails = jest.fn<GithubRepositoryApi['getRepositoryDetails']>();
    const api = {
      searchRepositories,
      getRepositoryDetails,
    };
    const toPaginatedDomain = jest
      .fn<GithubRepositoryMapper['toPaginatedDomain']>()
      .mockReturnValue(mappedResponse);
    const toDomain = jest.fn<GithubRepositoryMapper['toDomain']>();
    const mapper = {
      toPaginatedDomain,
      toDomain,
    };

    const repository = new GithubRepositoryRepository(
      api as unknown as GithubRepositoryApi,
      mapper as unknown as GithubRepositoryMapper,
    );
    const result = await repository.searchRepositories('react', pagination);

    expect(searchRepositories).toHaveBeenCalledWith({
      q: 'react',
      page: 2,
      perPage: 20,
    });
    expect(toPaginatedDomain).toHaveBeenCalledWith(apiResponse, 2, 20);
    expect(result).toEqual(mappedResponse);
  });

  it('deve buscar detalhes e mapear para domínio', async () => {
    const apiResponse: GithubRepositoryResponse = {
      id: 1,
      name: 'react',
      full_name: 'facebook/react',
      description: 'React library',
      stargazers_count: 1,
      forks_count: 1,
      watchers_count: 1,
      language: 'TypeScript',
      owner: {
        id: 1,
        login: 'facebook',
        avatar_url: 'https://example.com/avatar.png',
        html_url: 'https://github.com/facebook',
      },
    };
    const mappedRepository: Repository = {
      id: 1,
      name: 'react',
      fullName: 'facebook/react',
      description: 'React library',
      stars: 1,
      forks: 1,
      watchers: 1,
      language: 'TypeScript',
      owner: {
        id: 1,
        login: 'facebook',
        avatarUrl: 'https://example.com/avatar.png',
        htmlUrl: 'https://github.com/facebook',
      },
    };

    const searchRepositories = jest.fn<GithubRepositoryApi['searchRepositories']>();
    const getRepositoryDetails = jest
      .fn<GithubRepositoryApi['getRepositoryDetails']>()
      .mockResolvedValue(apiResponse);
    const api = {
      searchRepositories,
      getRepositoryDetails,
    };
    const toPaginatedDomain = jest.fn<GithubRepositoryMapper['toPaginatedDomain']>();
    const toDomain = jest

      .fn<GithubRepositoryMapper['toDomain']>()
      .mockReturnValue(mappedRepository);
    const mapper = {
      toPaginatedDomain,
      toDomain,
    };

    const repository = new GithubRepositoryRepository(
      api as unknown as GithubRepositoryApi,
      mapper as unknown as GithubRepositoryMapper,
    );
    const result = await repository.getRepositoryDetails('facebook', 'react');

    expect(getRepositoryDetails).toHaveBeenCalledWith('facebook', 'react');
    expect(toDomain).toHaveBeenCalledWith(apiResponse);
    expect(result).toEqual(mappedRepository);
  });
});
