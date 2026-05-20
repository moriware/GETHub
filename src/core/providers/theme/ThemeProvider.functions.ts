import type { ThemeContextValue } from '@/core/providers/theme/ThemeProvider.types';
import { darkTheme } from '@/design/theme/darkTheme';
import { lightTheme } from '@/design/theme/lightTheme';
import type { ThemeMode } from '@/shared/types/theme';

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
