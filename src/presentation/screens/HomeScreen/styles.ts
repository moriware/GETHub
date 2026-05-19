import type { AppTheme } from '@/shared/types/theme';

export function createHomeScreenStyles(theme: AppTheme) {
  return {
    container: {
      flex: 1,
    },
    searchForm: {
      marginBottom: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    listContent: {
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
  };
}
