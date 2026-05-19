import type { AppTheme } from '@/shared/types/theme';

export function createEmptyStateContainerStyle(theme: AppTheme) {
  return {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  };
}
