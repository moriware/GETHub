import React from 'react';

import { Avatar } from '@/presentation/components/avatar/Avatar';
import { Button } from '@/presentation/components/button/Button';
import { Card } from '@/presentation/components/card/Card';
import { EmptyState } from '@/presentation/components/common/EmptyState';
import { ErrorState } from '@/presentation/components/common/ErrorState';
import { LoadingState } from '@/presentation/components/common/LoadingState';
import { Screen } from '@/presentation/components/common/Screen';
import { AppView } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useRepositoryDetails } from '@/presentation/hooks/repositories/useRepositoryDetails';
import { useTheme } from '@/presentation/hooks/theme/useTheme';
import { navigateToRepositoryIssues } from '@/presentation/screens/RepositoryDetailsScreen/functions';
import { createRepositoryDetailsScreenStyles } from '@/presentation/screens/RepositoryDetailsScreen/styles';
import type { RepositoryDetailsScreenProps } from '@/presentation/screens/RepositoryDetailsScreen/types';

export function RepositoryDetailsScreen({
  owner,
  repo,
}: RepositoryDetailsScreenProps): React.JSX.Element {
  const { theme } = useTheme();
  const styles = createRepositoryDetailsScreenStyles(theme);
  const { repository, loading, error, refetch } = useRepositoryDetails(owner, repo);

  if (loading && !repository) {
    return <LoadingState />;
  }

  if (error && !repository) {
    return (
      <Screen style={styles.container}>
        <ErrorState
          message={error}
          onRetry={() => {
            void refetch();
          }}
        />
      </Screen>
    );
  }

  if (!repository) {
    return (
      <Screen style={styles.container}>
        <EmptyState message="Repository not found." />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <Card>
        <AppView style={styles.content}>
          <Text variant="headline">{repository.fullName}</Text>
          {repository.description ? <Text tone="muted">{repository.description}</Text> : null}

          <AppView style={styles.ownerRow}>
            <Avatar uri={repository.ownerAvatarUrl} />
            <Text>{repository.ownerName}</Text>
          </AppView>

          <AppView style={styles.statsRow}>
            <Text>⭐ {repository.starsLabel}</Text>
            <Text>🍴 {repository.forksLabel}</Text>
            <Text>👀 {repository.watchersLabel}</Text>
          </AppView>

          <Text tone="muted">Language: {repository.language ?? 'Unknown'}</Text>

          <Button
            label="View open issues"
            onPress={() => navigateToRepositoryIssues(owner, repo)}
          />
        </AppView>
      </Card>
    </Screen>
  );
}
