import React from 'react';

import { Badge } from '@/presentation/components/badge/Badge';
import { createIssueLabelListContainerStyle } from '@/presentation/components/issue/IssueLabelList.styles';
import type { IssueLabelListProps } from '@/presentation/components/issue/IssueLabelList.types';
import { AppView } from '@/presentation/components/primitives';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function IssueLabelList({ labels }: IssueLabelListProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AppView style={createIssueLabelListContainerStyle(theme)}>
      {labels.map((label) => (
        <Badge key={label.id} label={label.name} />
      ))}
    </AppView>
  );
}
