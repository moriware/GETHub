import type { AppTheme } from '@/shared/types/theme';

export function createScreenStyle(theme: AppTheme) {
  return {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  };
}
