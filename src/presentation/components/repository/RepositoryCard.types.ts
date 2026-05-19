import type { RepositoryItemViewModel } from '@/presentation/view-models/RepositoryItemViewModel';

export interface RepositoryCardProps {
  repository: RepositoryItemViewModel;
  onPress: () => void;
}
