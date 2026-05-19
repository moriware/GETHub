import type { AppTheme } from '@/shared/types/theme';

export function createRepositoryDetailsScreenStyles(theme: AppTheme) {
  return {
    container: {
      flex: 1,
    },
    content: {
      gap: theme.spacing.lg,
    },
    ownerRow: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: theme.spacing.md,
    },
    statsRow: {
      flexDirection: 'row' as const,
      gap: theme.spacing.md,
    },
  };
}
