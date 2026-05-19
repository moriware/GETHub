import type { Repository } from '@/domain/entities/Repository';
import type { RepositoryDetailsViewModel } from '@/presentation/view-models/RepositoryDetailsViewModel';
import type { RepositoryItemViewModel } from '@/presentation/view-models/RepositoryItemViewModel';
import { formatCompactNumber } from '@/shared/utils/formatCompactNumber';

export class RepositoryToViewModelMapper {
  toItemViewModel(repository: Repository): RepositoryItemViewModel {
    return {
      id: repository.id,
      fullName: repository.fullName,
      description: repository.description,
      ownerLogin: repository.owner.login,
      language: repository.language,
      starsLabel: formatCompactNumber(repository.stars),
    };
  }

  toDetailsViewModel(repository: Repository): RepositoryDetailsViewModel {
    return {
      id: repository.id,
      fullName: repository.fullName,
      description: repository.description,
      ownerName: repository.owner.login,
      ownerAvatarUrl: repository.owner.avatarUrl,
      language: repository.language,
      starsLabel: formatCompactNumber(repository.stars),
      forksLabel: formatCompactNumber(repository.forks),
      watchersLabel: formatCompactNumber(repository.watchers),
    };
  }
}
