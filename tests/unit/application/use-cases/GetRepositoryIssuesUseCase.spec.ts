import { describe, expect, it, jest } from '@jest/globals';

import { GetRepositoryIssuesUseCase } from '@/application/use-cases/issues/GetRepositoryIssuesUseCase';
import type { IIssueRepository } from '@/domain/contracts/IIssueRepository';
import type { Issue } from '@/domain/entities/Issue';
import { DEFAULT_PAGE_SIZE, INITIAL_PAGE } from '@/shared/constants/pagination';
import type { PaginatedResult } from '@/shared/types/api';

function createIssueMock(): Issue {
  return {
    id: 1,
    number: 123,
    title: 'Issue title',
    createdAt: '2026-01-01T00:00:00Z',
    htmlUrl: 'https://github.com/expo/expo/issues/123',
    author: {
      id: 2,
      login: 'author',
      avatarUrl: 'https://example.com/avatar.png',
      htmlUrl: 'https://github.com/author',
    },
    labels: [
      {
        id: 1,
        name: 'bug',
        color: 'ff0000',
      },
    ],
  };
}

describe('GetRepositoryIssuesUseCase', () => {
  it('retorna falha quando owner/repo são inválidos', async () => {
    const getRepositoryIssues = jest.fn<IIssueRepository['getRepositoryIssues']>();
    const issueRepository: IIssueRepository = {
      getRepositoryIssues,
    };
    const useCase = new GetRepositoryIssuesUseCase(issueRepository);

    const result = await useCase.execute(' ', ' ');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('INVALID_REPOSITORY_ID');
    }
    expect(getRepositoryIssues).not.toHaveBeenCalled();
  });

  it('retorna sucesso e usa paginação padrão', async () => {
    const response: PaginatedResult<Issue> = {
      items: [createIssueMock()],
      page: INITIAL_PAGE,
      perPage: DEFAULT_PAGE_SIZE,
      hasNextPage: false,
    };
    const getRepositoryIssues = jest
      .fn<IIssueRepository['getRepositoryIssues']>()
      .mockResolvedValue(response);
    const issueRepository: IIssueRepository = {
      getRepositoryIssues,
    };
    const useCase = new GetRepositoryIssuesUseCase(issueRepository);

    const result = await useCase.execute('expo', 'expo');

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual(response);
    }
    expect(getRepositoryIssues).toHaveBeenCalledWith('expo', 'expo', {
      page: INITIAL_PAGE,
      perPage: DEFAULT_PAGE_SIZE,
    });
  });

  it('retorna ISSUES_FAILED quando o repositório lança erro', async () => {
    const getRepositoryIssues = jest
      .fn<IIssueRepository['getRepositoryIssues']>()
      .mockRejectedValue(new Error('request fail'));
    const issueRepository: IIssueRepository = {
      getRepositoryIssues,
    };
    const useCase = new GetRepositoryIssuesUseCase(issueRepository);

    const result = await useCase.execute('expo', 'expo');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('ISSUES_FAILED');
    }
  });
});
