import type { AppTheme } from '@/shared/types/theme';

export function createErrorStateContainerStyle(theme: AppTheme) {
  return {
    gap: theme.spacing.md,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flex: 1,
    backgroundColor: theme.colors.background,
  };
}
