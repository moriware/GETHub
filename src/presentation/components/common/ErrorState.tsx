import React from 'react';

import { Button } from '@/design-system/components/Button/Button';
import { AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';
import { createErrorStateContainerStyle } from '@/presentation/components/common/ErrorState.styles';
import type { ErrorStateProps } from '@/presentation/components/common/ErrorState.types';

export function ErrorState({ message, onRetry }: ErrorStateProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <AppView style={createErrorStateContainerStyle(theme)}>
      <Text tone="danger">{message}</Text>
      {onRetry ? <Button label="Try again" onPress={onRetry} variant="outline" /> : null}
    </AppView>
  );
}
