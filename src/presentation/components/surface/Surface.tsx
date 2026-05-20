import React from 'react';
import type { ViewProps } from 'react-native';

import { AppView } from '@/presentation/components/primitives';
import { createSurfaceStyle } from '@/presentation/components/surface/Surface.styles';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Surface({ style, ...props }: ViewProps): React.JSX.Element {
  const { theme } = useTheme();

  return <AppView {...props} style={[createSurfaceStyle(theme), style]} />;
}
