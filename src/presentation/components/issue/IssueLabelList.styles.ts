import type { AppTheme } from '@/shared/types/theme';

export function createIssueLabelListContainerStyle(theme: AppTheme) {
  return {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: theme.spacing.sm,
  };
}
