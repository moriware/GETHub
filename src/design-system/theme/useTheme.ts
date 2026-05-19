import { useThemeContext } from '@/design-system/theme/ThemeContext';

export function useTheme() {
  return useThemeContext().theme;
}
