import React from 'react';
import type { ViewProps } from 'react-native';

import { createCardStyle } from '@/presentation/components/card/Card.styles';
import { AppView } from '@/presentation/components/primitives';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Card({ style, ...props }: ViewProps): React.JSX.Element {
  const { theme } = useTheme();

  return <AppView {...props} style={[createCardStyle(theme), style]} />;
}
