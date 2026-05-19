import React from 'react';
import { ActivityIndicator } from 'react-native';

import { AppView } from '@/design-system/components/primitives';
import { useTheme } from '@/design-system/theme/useTheme';
import { createLoadingStateContainerStyle } from '@/presentation/components/common/LoadingState.styles';

export function LoadingState(): React.JSX.Element {
  const theme = useTheme();

  return (
    <AppView style={createLoadingStateContainerStyle(theme)}>
      <ActivityIndicator color={theme.colors.primary} />
    </AppView>
  );
}
