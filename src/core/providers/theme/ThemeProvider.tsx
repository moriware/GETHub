import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { createThemeContextValue } from '@/core/providers/theme/ThemeProvider.functions';
import type {
  AppThemeProviderProps,
  ThemeContextValue,
} from '@/core/providers/theme/ThemeProvider.types';
import type { ThemeMode } from '@/shared/types/theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: AppThemeProviderProps): React.JSX.Element {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(colorScheme === 'dark' ? 'dark' : 'light');

  const value = useMemo<ThemeContextValue>(() => createThemeContextValue(mode, setMode), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used inside AppThemeProvider.');
  }

  return context;
}
