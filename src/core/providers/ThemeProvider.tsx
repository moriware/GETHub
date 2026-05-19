import React from 'react';

import { AppThemeProvider } from '@/design-system/theme/ThemeContext';
import type { ThemeProviderProps } from '@/core/providers/ThemeProvider.types';

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
