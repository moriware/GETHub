import React from 'react';
import type { ViewProps } from 'react-native';

import { createSurfaceStyle } from '@/design-system/components/Surface/Surface.styles';
import { AppView } from '@/design-system/components/primitives';
import { useTheme } from '@/design-system/theme/useTheme';

export function Surface({ style, ...props }: ViewProps): React.JSX.Element {
  const theme = useTheme();

  return <AppView {...props} style={[createSurfaceStyle(theme), style]} />;
}
