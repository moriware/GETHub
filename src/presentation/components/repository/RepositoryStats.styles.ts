import type { AppTheme } from '@/shared/types/theme';

export function createRepositoryStatsContainerStyle(theme: AppTheme) {
  return {
    flexDirection: 'row' as const,
    gap: theme.spacing.md,
  };
}
