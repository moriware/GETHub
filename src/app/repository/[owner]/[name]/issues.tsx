import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { pickRouteParam } from '@/core/navigation/routeParams.functions';
import { RepositoryIssuesScreen } from '@/presentation/screens/RepositoryIssuesScreen/RepositoryIssuesScreen';

export default function RepositoryIssuesRoute(): React.JSX.Element {
  const params = useLocalSearchParams<{ owner?: string | string[]; name?: string | string[] }>();

  return (
    <RepositoryIssuesScreen
      owner={pickRouteParam(params.owner)}
      repo={pickRouteParam(params.name)}
    />
  );
}
