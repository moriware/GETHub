import type { AppTheme } from '@/shared/types/theme';

export function createSurfaceStyle(theme: AppTheme) {
  return { backgroundColor: theme.colors.background };
}
