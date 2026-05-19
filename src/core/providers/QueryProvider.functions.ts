import { container } from '@/infrastructure/di/container';

import type { QueryContextValue } from '@/core/providers/QueryProvider.types';

export function createQueryContextValue(): QueryContextValue {
  return { queryClient: container.queryClient };
}
