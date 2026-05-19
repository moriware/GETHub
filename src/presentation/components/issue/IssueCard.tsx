import React from 'react';

import { Card } from '@/design-system/components/Card/Card';
import { AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';
import { IssueLabelList } from '@/presentation/components/issue/IssueLabelList';
import { createIssueCardContentStyle } from '@/presentation/components/issue/IssueCard.styles';
import type { IssueCardProps } from '@/presentation/components/issue/IssueCard.types';

export function IssueCard({ issue }: IssueCardProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <Card>
      <AppView style={createIssueCardContentStyle(theme)}>
        <Text variant="title">{issue.title}</Text>
        <Text tone="muted">
          {issue.author} • {issue.createdAtRelative}
        </Text>
        <IssueLabelList labels={issue.labels} />
      </AppView>
    </Card>
  );
}
