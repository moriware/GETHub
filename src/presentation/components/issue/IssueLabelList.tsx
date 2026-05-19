import React from 'react';

import { Badge } from '@/design-system/components/Badge/Badge';
import { AppView } from '@/design-system/components/primitives';
import { useTheme } from '@/design-system/theme/useTheme';
import { createIssueLabelListContainerStyle } from '@/presentation/components/issue/IssueLabelList.styles';
import type { IssueLabelListProps } from '@/presentation/components/issue/IssueLabelList.types';

export function IssueLabelList({ labels }: IssueLabelListProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <AppView style={createIssueLabelListContainerStyle(theme)}>
      {labels.map((label) => (
        <Badge key={label.id} label={label.name} />
      ))}
    </AppView>
  );
}
