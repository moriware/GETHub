import React from 'react';
import type { ViewProps } from 'react-native';

import { createCardStyle } from '@/design-system/components/Card/Card.styles';
import { AppView } from '@/design-system/components/primitives';
import { useTheme } from '@/design-system/theme/useTheme';

export function Card({ style, ...props }: ViewProps): React.JSX.Element {
  const theme = useTheme();

  return <AppView {...props} style={[createCardStyle(theme), style]} />;
}
