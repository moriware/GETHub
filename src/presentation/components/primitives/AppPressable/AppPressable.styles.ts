import type { AppPressableSurface } from '@/presentation/components/primitives/AppPressable/AppPressable.types';
import type { AppTheme } from '@/shared/types/theme';

export function createAppPressableStyle(
  theme: AppTheme,
  surface: AppPressableSurface,
  disabled: boolean,
) {
  const backgroundColor =
    surface === 'background'
      ? theme.colors.background
      : surface === 'surface'
        ? theme.colors.surface
        : 'transparent';

  return {
    backgroundColor,
    opacity: disabled ? theme.opacity.disabled : theme.opacity.full,
  };
}
