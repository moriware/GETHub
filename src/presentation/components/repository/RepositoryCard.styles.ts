import type { AppTheme } from '@/shared/types/theme';

export function createRepositoryCardContentStyle(theme: AppTheme) {
  return {
    gap: theme.spacing.sm,
  };
}

export function createRepositoryCardStyle(theme: AppTheme, pressed: boolean) {
  if (!pressed) {
    return {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    };
  }

  return {
    backgroundColor: theme.colors.headerBackground,
    borderColor: theme.colors.primary,
    ...theme.shadows.md,
  };
}
