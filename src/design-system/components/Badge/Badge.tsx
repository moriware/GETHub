import React from 'react';

import { createBadgeStyle } from '@/design-system/components/Badge/Badge.styles';
import type { BadgeProps } from '@/design-system/components/Badge/Badge.types';
import { AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';

export function Badge({ label }: BadgeProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <AppView style={createBadgeStyle(theme)}>
      <Text variant="label">{label}</Text>
    </AppView>
  );
}
