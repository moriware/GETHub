import React from 'react';

import { Button } from '@/presentation/components/button/Button';
import { createErrorStateContainerStyle } from '@/presentation/components/common/ErrorState.styles';
import type { ErrorStateProps } from '@/presentation/components/common/ErrorState.types';
import { AppView } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function ErrorState({ message, onRetry }: ErrorStateProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AppView style={createErrorStateContainerStyle(theme)}>
      <Text tone="danger">{message}</Text>
      {onRetry ? <Button label="Try again" onPress={onRetry} variant="outline" /> : null}
    </AppView>
  );
}
