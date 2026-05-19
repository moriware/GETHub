import type { AppTheme } from '@/shared/types/theme';

export function createRepositoryIssuesScreenStyles(theme: AppTheme) {
  return {
    container: {
      flex: 1,
    },
    listContent: {
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
  };
}
