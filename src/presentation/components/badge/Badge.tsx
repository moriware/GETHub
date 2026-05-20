import React from 'react';

import { createBadgeStyle } from '@/presentation/components/badge/Badge.styles';
import type { BadgeProps } from '@/presentation/components/badge/Badge.types';
import { AppView } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Badge({ label }: BadgeProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AppView style={createBadgeStyle(theme)}>
      <Text variant="label">{label}</Text>
    </AppView>
  );
}
