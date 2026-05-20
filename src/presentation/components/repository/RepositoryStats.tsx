import React from 'react';

import { AppView } from '@/presentation/components/primitives';
import { createRepositoryStatsContainerStyle } from '@/presentation/components/repository/RepositoryStats.styles';
import type { RepositoryStatsProps } from '@/presentation/components/repository/RepositoryStats.types';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function RepositoryStats({ starsLabel, language }: RepositoryStatsProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AppView style={createRepositoryStatsContainerStyle(theme)}>
      <Text variant="label">⭐ {starsLabel}</Text>
      <Text variant="label" tone="muted">
        {language ?? 'Unknown'}
      </Text>
    </AppView>
  );
}
