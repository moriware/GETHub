import type { AppTheme } from '@/shared/types/theme';

export function createDesignSystemScreenStyles(theme: AppTheme) {
  return {
    container: {
      flex: 1,
    },
    content: {
      gap: theme.spacing.lg,
      paddingBottom: theme.spacing.xl + theme.spacing.sm,
    },
    row: {
      flexDirection: 'row' as const,
      gap: theme.spacing.sm,
      flexWrap: 'wrap' as const,
    },
  };
}
