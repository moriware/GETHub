import type { RepositoryItemViewModel } from '@/presentation/view-models/repositories/RepositoryItemViewModel';

export interface RepositoryCardProps {
  repository: RepositoryItemViewModel;
  onPress: () => void;
}
