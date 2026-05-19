import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { pickRouteParam } from '@/core/navigation/routeParams.functions';
import { RepositoryDetailsScreen } from '@/presentation/screens/RepositoryDetailsScreen/RepositoryDetailsScreen';

export default function RepositoryDetailsRoute(): React.JSX.Element {
  const params = useLocalSearchParams<{
    owner?: string | string[];
    name?: string | string[];
  }>();

  return (
    <RepositoryDetailsScreen
      owner={pickRouteParam(params.owner)}
      repo={pickRouteParam(params.name)}
    />
  );
}
