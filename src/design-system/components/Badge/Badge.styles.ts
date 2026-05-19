import type { AppTheme } from '@/shared/types/theme';

export function createBadgeStyle(theme: AppTheme) {
  return {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    borderWidth: theme.borders.width.thin,
    borderColor: theme.colors.border,
    alignSelf: 'flex-start' as const,
  };
}
