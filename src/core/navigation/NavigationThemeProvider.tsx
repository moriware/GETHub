import { ThemeProvider } from '@react-navigation/native';
import React from 'react';

import { createNavigationTheme } from '@/core/navigation/navigationTheme.functions';
import type { NavigationThemeProviderProps } from '@/core/navigation/NavigationThemeProvider.types';
import { useTheme } from '@/design-system/theme/useTheme';

export function NavigationThemeProvider({ children }: NavigationThemeProviderProps): React.JSX.Element {
  const theme = useTheme();

  return <ThemeProvider value={createNavigationTheme(theme)}>{children}</ThemeProvider>;
}
