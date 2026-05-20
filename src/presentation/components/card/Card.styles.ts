import type { AppTheme } from '@/shared/types/theme';

export function createCardStyle(theme: AppTheme) {
  return {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: theme.borders.width.thin,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  };
}
