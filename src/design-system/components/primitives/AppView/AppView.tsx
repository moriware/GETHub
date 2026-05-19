import React from 'react';
import { View } from 'react-native';

import { createAppViewStyle } from '@/design-system/components/primitives/AppView/AppView.styles';
import type { AppViewProps } from '@/design-system/components/primitives/AppView/AppView.types';
import { useTheme } from '@/design-system/theme/useTheme';

export function AppView({ surface = 'transparent', style, ...props }: AppViewProps): React.JSX.Element {
  const theme = useTheme();

  return <View {...props} style={[createAppViewStyle(theme, surface), style]} />;
}
