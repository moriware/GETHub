import { ThemeProvider } from '@react-navigation/native';
import React from 'react';

import { createNavigationTheme } from '@/core/providers/navigation-theme/navigationThemeProvider.functions';
import type { NavigationThemeProviderProps } from '@/core/providers/navigation-theme/NavigationThemeProvider.types';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function NavigationThemeProvider({
  children,
}: NavigationThemeProviderProps): React.JSX.Element {
  const { theme } = useTheme();

  return <ThemeProvider value={createNavigationTheme(theme)}>{children}</ThemeProvider>;
}
