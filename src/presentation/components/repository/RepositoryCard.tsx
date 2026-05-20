import React from 'react';

import { Card } from '@/presentation/components/card/Card';
import { AppPressable, AppView } from '@/presentation/components/primitives';
import {
  createRepositoryCardContentStyle,
  createRepositoryCardStyle,
} from '@/presentation/components/repository/RepositoryCard.styles';
import type { RepositoryCardProps } from '@/presentation/components/repository/RepositoryCard.types';
import { RepositoryStats } from '@/presentation/components/repository/RepositoryStats';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function RepositoryCard({ repository, onPress }: RepositoryCardProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AppPressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={createRepositoryCardStyle(theme, pressed)}>
          <AppView style={createRepositoryCardContentStyle(theme)}>
            <Text variant="title">{repository.fullName}</Text>
            {repository.description ? <Text tone="muted">{repository.description}</Text> : null}
            <RepositoryStats starsLabel={repository.starsLabel} language={repository.language} />
          </AppView>
        </Card>
      )}
    </AppPressable>
  );
}
