import React from 'react';

import { Card } from '@/design-system/components/Card/Card';
import { AppPressable, AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';
import { RepositoryStats } from '@/presentation/components/repository/RepositoryStats';
import {
  createRepositoryCardContentStyle,
  createRepositoryCardStyle,
} from '@/presentation/components/repository/RepositoryCard.styles';
import type { RepositoryCardProps } from '@/presentation/components/repository/RepositoryCard.types';

export function RepositoryCard({ repository, onPress }: RepositoryCardProps): React.JSX.Element {
  const theme = useTheme();

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
