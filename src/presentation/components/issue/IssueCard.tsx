import React from 'react';

import { Card } from '@/presentation/components/card/Card';
import { createIssueCardContentStyle } from '@/presentation/components/issue/IssueCard.styles';
import type { IssueCardProps } from '@/presentation/components/issue/IssueCard.types';
import { IssueLabelList } from '@/presentation/components/issue/IssueLabelList';
import { AppView } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function IssueCard({ issue }: IssueCardProps): React.JSX.Element {
  const { theme } = useTheme();

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
