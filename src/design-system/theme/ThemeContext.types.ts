import type { AppTheme, ThemeMode } from '@/shared/types/theme';

export interface ThemeContextValue {
  theme: AppTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export interface AppThemeProviderProps {
  children: React.ReactNode;
}
