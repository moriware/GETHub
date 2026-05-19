import React from 'react';

import { AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';
import { createEmptyStateContainerStyle } from '@/presentation/components/common/EmptyState.styles';
import type { EmptyStateProps } from '@/presentation/components/common/EmptyState.types';

export function EmptyState({ message }: EmptyStateProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <AppView style={createEmptyStateContainerStyle(theme)}>
      <Text tone="muted">{message}</Text>
    </AppView>
  );
}
