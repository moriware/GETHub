import { container } from '@/infrastructure/di/container';

import type { QueryContextValue } from '@/core/providers/query/QueryProvider.types';

export function createQueryContextValue(): QueryContextValue {
  return { queryClient: container.queryClient };
}
