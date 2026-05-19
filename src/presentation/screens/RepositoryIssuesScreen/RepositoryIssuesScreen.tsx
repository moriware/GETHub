import React from 'react';

import { AppFlatList } from '@/design-system/components/primitives';
import { useTheme } from '@/design-system/theme/useTheme';
import { EmptyState } from '@/presentation/components/common/EmptyState';
import { ErrorState } from '@/presentation/components/common/ErrorState';
import { LoadingState } from '@/presentation/components/common/LoadingState';
import { Screen } from '@/presentation/components/common/Screen';
import { IssueCard } from '@/presentation/components/issue/IssueCard';
import { useRepositoryIssues } from '@/presentation/hooks/issues/useRepositoryIssues';
import { createRepositoryIssuesScreenStyles } from '@/presentation/screens/RepositoryIssuesScreen/styles';
import type { RepositoryIssuesScreenProps } from '@/presentation/screens/RepositoryIssuesScreen/types';
import { UI_THRESHOLDS } from '@/shared/constants/ui';

export function RepositoryIssuesScreen({ owner, repo }: RepositoryIssuesScreenProps): React.JSX.Element {
  const theme = useTheme();
  const styles = createRepositoryIssuesScreenStyles(theme);
  const { items, loading, error, hasNextPage, loadMore, refetch } = useRepositoryIssues(owner, repo);

  if (loading && items.length === 0) {
    return <LoadingState />;
  }

  if (error && items.length === 0) {
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

  if (!loading && items.length === 0) {
    return (
      <Screen style={styles.container}>
        <EmptyState message="No open issues found." />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <AppFlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        onEndReachedThreshold={UI_THRESHOLDS.listEndReached}
        onEndReached={() => {
          if (hasNextPage) {
            void loadMore();
          }
        }}
        renderItem={({ item }) => <IssueCard issue={item} />}
      />
    </Screen>
  );
}
