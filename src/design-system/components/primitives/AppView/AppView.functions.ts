import type { AppTheme } from '@/shared/types/theme';
import type { AppViewSurface } from '@/design-system/components/primitives/AppView/AppView.types';

/**
 * Resolve a cor de fundo do componente genérico de View com base no tema atual.
 */
export function resolveAppViewBackgroundColor(theme: AppTheme, surface: AppViewSurface): string | undefined {
  if (surface === 'background') {
    return theme.colors.background;
  }

  if (surface === 'surface') {
    return theme.colors.surface;
  }

  if (surface === 'header') {
    return theme.colors.headerBackground;
  }

  return undefined;
}
