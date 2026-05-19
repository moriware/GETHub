import type { AppTheme } from '@/shared/types/theme';
import type { AppViewSurface } from '@/design-system/components/primitives/AppView/AppView.types';
import { resolveAppViewBackgroundColor } from '@/design-system/components/primitives/AppView/AppView.functions';

export function createAppViewStyle(theme: AppTheme, surface: AppViewSurface) {
  const backgroundColor = resolveAppViewBackgroundColor(theme, surface);

  if (!backgroundColor) {
    return {};
  }

  return { backgroundColor };
}
