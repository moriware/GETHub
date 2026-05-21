import type { ThemeContextValue } from '@/core/providers/theme/ThemeProvider.types';
import { darkTheme } from '@/design/theme/darkTheme';
import { lightTheme } from '@/design/theme/lightTheme';
import type { ThemeMode } from '@/shared/types/theme';
import type { ColorSchemeName } from 'react-native';

export function resolveThemeMode(colorScheme: ColorSchemeName): ThemeMode {
  return colorScheme === 'dark' ? 'dark' : 'light';
}

export function parsePersistedThemeMode(value: string | null): ThemeMode | null {
  if (value === 'light' || value === 'dark') {
    return value;
  }

  return null;
}

export function createThemeContextValue(
  mode: ThemeMode,
  setMode: (mode: ThemeMode | ((previous: ThemeMode) => ThemeMode)) => void,
): ThemeContextValue {
  return {
    theme: mode === 'dark' ? darkTheme : lightTheme,
    mode,
    setMode,
    toggleMode: () => setMode((previousMode) => (previousMode === 'light' ? 'dark' : 'light')),
  };
}
