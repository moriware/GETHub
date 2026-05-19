import React, { useState } from 'react';

import { Button } from '@/design-system/components/Button/Button';
import { AppFlatList, AppView } from '@/design-system/components/primitives';
import { Input } from '@/design-system/components/Input/Input';
import { useTheme } from '@/design-system/theme/useTheme';
import { EmptyState } from '@/presentation/components/common/EmptyState';
import { ErrorState } from '@/presentation/components/common/ErrorState';
import { LoadingState } from '@/presentation/components/common/LoadingState';
import { Screen } from '@/presentation/components/common/Screen';
import { RepositoryCard } from '@/presentation/components/repository/RepositoryCard';
import { useSearchRepositories } from '@/presentation/hooks/repositories/useSearchRepositories';
import {
  navigateToRepositoryDetails,
  runLoadMore,
  runRefresh,
  runRetrySearch,
  runSearch,
} from '@/presentation/screens/HomeScreen/functions';
import { createHomeScreenStyles } from '@/presentation/screens/HomeScreen/styles';
import { MESSAGES } from '@/shared/constants/messages';
import { UI_THRESHOLDS } from '@/shared/constants/ui';

export function HomeScreen(): React.JSX.Element {
  const theme = useTheme();
  const styles = createHomeScreenStyles(theme);
  const [input, setInput] = useState('');
  const { items, query, loading, refreshing, error, hasNextPage, search, loadMore, refresh } =
    useSearchRepositories();

  const showInitialLoading = loading && items.length === 0;

  return (
    <Screen style={styles.container}>
      <AppView style={styles.searchForm}>
        <Input
          label="Search"
          placeholder={MESSAGES.searchPlaceholder}
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={() => {
            void runSearch(search, input);
          }}
        />
        <Button
          label="Search repositories"
          onPress={() => {
            void runSearch(search, input);
          }}
          loading={loading && items.length === 0}
        />
      </AppView>

      {showInitialLoading ? <LoadingState /> : null}

      {!showInitialLoading && error && items.length === 0 ? (
        <ErrorState
          message={error}
          onRetry={() => {
            void runRetrySearch(search, query, input);
          }}
        />
      ) : null}

      {!showInitialLoading && !error && items.length === 0 ? (
        <EmptyState message={query ? MESSAGES.emptyResults : MESSAGES.emptySearch} />
      ) : null}

      {items.length > 0 ? (
        <AppFlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          onRefresh={() => {
            void runRefresh(refresh);
          }}
          refreshing={refreshing}
          onEndReachedThreshold={UI_THRESHOLDS.listEndReached}
          onEndReached={() => {
            void runLoadMore(loadMore, hasNextPage);
          }}
          renderItem={({ item }) => (
            <RepositoryCard repository={item} onPress={() => navigateToRepositoryDetails(item.fullName)} />
          )}
        />
      ) : null}
    </Screen>
  );
}
