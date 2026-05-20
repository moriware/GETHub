import type { RepositoryDetailsViewModel } from '@/presentation/view-models/repositories/RepositoryDetailsViewModel';

export interface UseRepositoryDetailsResult {
  repository: RepositoryDetailsViewModel | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
