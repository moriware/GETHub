import { resolveAppViewBackgroundColor } from '@/presentation/components/primitives/AppView/AppView.functions';
import type { AppViewSurface } from '@/presentation/components/primitives/AppView/AppView.types';
import type { AppTheme } from '@/shared/types/theme';

export function createAppViewStyle(theme: AppTheme, surface: AppViewSurface) {
  const backgroundColor = resolveAppViewBackgroundColor(theme, surface);

  if (!backgroundColor) {
    return {};
  }

  return { backgroundColor };
}
