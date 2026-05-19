import React from 'react';
import { SafeAreaProvider as NativeSafeAreaProvider } from 'react-native-safe-area-context';

import type { SafeAreaProviderProps } from '@/core/providers/SafeAreaProvider.types';
import { useTheme } from '@/design-system/theme/useTheme';
import { createSafeAreaProviderStyle } from './SafeAreaProvider.styles';

export function SafeAreaProvider({
  children,
}: SafeAreaProviderProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <NativeSafeAreaProvider
      style={createSafeAreaProviderStyle(theme.colors.background)}
    >
      {children}
    </NativeSafeAreaProvider>
  );
}
