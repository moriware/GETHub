import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createScreenStyle } from '@/presentation/components/common/Screen.styles';
import type { ScreenProps } from '@/presentation/components/common/Screen.types';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Screen({ style, ...props }: ScreenProps): React.JSX.Element {
  const { theme } = useTheme();

  return <SafeAreaView {...props} style={[createScreenStyle(theme), style]} />;
}
