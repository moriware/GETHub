import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

import type { AppTheme } from '@/shared/types/theme';

/**
 * Converte o tema da aplicação para o formato de tema do React Navigation.
 */
export function createNavigationTheme(theme: AppTheme): Theme {
  const baseTheme = theme.mode === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.headerBackground,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.danger,
    },
  };
}
