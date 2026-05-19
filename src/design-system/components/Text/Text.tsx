import React from 'react';
import { Text as NativeText } from 'react-native';

import { createTextStyle } from '@/design-system/components/Text/Text.styles';
import type { AppTextProps } from '@/design-system/components/Text/Text.types';
import { useTheme } from '@/design-system/theme/useTheme';

export function Text({ variant = 'body', tone = 'text', style, ...props }: AppTextProps): React.JSX.Element {
  const theme = useTheme();

  return <NativeText {...props} style={createTextStyle(theme, variant, tone, style)} />;
}
