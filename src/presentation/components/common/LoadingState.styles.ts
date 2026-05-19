import type { AppTheme } from '@/shared/types/theme';

export function createLoadingStateContainerStyle(theme: AppTheme) {
  return {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: theme.colors.background,
  };
}
