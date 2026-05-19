import { darkTheme } from '@/design-system/theme/darkTheme';
import { lightTheme } from '@/design-system/theme/lightTheme';
import type { ThemeContextValue } from '@/design-system/theme/ThemeContext.types';
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
