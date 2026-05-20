import React from 'react';
import { FlatList } from 'react-native';

import type { AppFlatListProps } from '@/presentation/components/primitives/AppFlatList/AppFlatList.types';

export function AppFlatList<ItemT>(props: AppFlatListProps<ItemT>): React.JSX.Element {
  return <FlatList {...props} />;
}
