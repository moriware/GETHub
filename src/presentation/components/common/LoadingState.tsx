import React from 'react';
import { ActivityIndicator } from 'react-native';

import { createLoadingStateContainerStyle } from '@/presentation/components/common/LoadingState.styles';
import { AppView } from '@/presentation/components/primitives';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function LoadingState(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AppView style={createLoadingStateContainerStyle(theme)}>
      <ActivityIndicator color={theme.colors.primary} />
    </AppView>
  );
}
