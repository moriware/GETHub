import React from 'react';
import { View } from 'react-native';

import { createAppViewStyle } from '@/presentation/components/primitives/AppView/AppView.styles';
import type { AppViewProps } from '@/presentation/components/primitives/AppView/AppView.types';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function AppView({
  surface = 'transparent',
  style,
  ...props
}: AppViewProps): React.JSX.Element {
  const { theme } = useTheme();

  return <View {...props} style={[createAppViewStyle(theme, surface), style]} />;
}
