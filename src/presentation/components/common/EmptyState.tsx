import React from 'react';

import { createEmptyStateContainerStyle } from '@/presentation/components/common/EmptyState.styles';
import type { EmptyStateProps } from '@/presentation/components/common/EmptyState.types';
import { AppView } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function EmptyState({ message }: EmptyStateProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AppView style={createEmptyStateContainerStyle(theme)}>
      <Text tone="muted">{message}</Text>
    </AppView>
  );
}
