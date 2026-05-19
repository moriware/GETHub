import React from 'react';

import { AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';
import { createRepositoryStatsContainerStyle } from '@/presentation/components/repository/RepositoryStats.styles';
import type { RepositoryStatsProps } from '@/presentation/components/repository/RepositoryStats.types';

export function RepositoryStats({ starsLabel, language }: RepositoryStatsProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <AppView style={createRepositoryStatsContainerStyle(theme)}>
      <Text variant="label">⭐ {starsLabel}</Text>
      <Text variant="label" tone="muted">
        {language ?? 'Unknown'}
      </Text>
    </AppView>
  );
}
