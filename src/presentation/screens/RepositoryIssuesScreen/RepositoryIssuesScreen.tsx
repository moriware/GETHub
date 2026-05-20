import React from 'react';

import { EmptyState } from '@/presentation/components/common/EmptyState';
import { ErrorState } from '@/presentation/components/common/ErrorState';
import { LoadingState } from '@/presentation/components/common/LoadingState';
import { Screen } from '@/presentation/components/common/Screen';
import { IssueCard } from '@/presentation/components/issue/IssueCard';
import { AppFlatList } from '@/presentation/components/primitives';
import { useRepositoryIssues } from '@/presentation/hooks/issues/useRepositoryIssues';
import { useTheme } from '@/presentation/hooks/theme/useTheme';
import { createRepositoryIssuesScreenStyles } from '@/presentation/screens/RepositoryIssuesScreen/styles';
import type { RepositoryIssuesScreenProps } from '@/presentation/screens/RepositoryIssuesScreen/types';
import { UI_THRESHOLDS } from '@/shared/constants/ui';

export function RepositoryIssuesScreen({
  owner,
  repo,
}: RepositoryIssuesScreenProps): React.JSX.Element {
  const { theme } = useTheme();
  const styles = createRepositoryIssuesScreenStyles(theme);
  const { items, loading, refreshing, error, hasNextPage, loadMore, refresh, refetch } =
    useRepositoryIssues(owner, repo);

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
        <EmptyState message="Nenhuma issue encontrada." />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <AppFlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        onRefresh={() => {
          void refresh();
        }}
        refreshing={refreshing}
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
