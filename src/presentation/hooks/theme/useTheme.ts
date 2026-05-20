import { useThemeContext } from '@/core/providers/theme/ThemeProvider';

export function useTheme() {
  return useThemeContext();
}
