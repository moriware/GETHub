import React from 'react';
import { Text as NativeText } from 'react-native';

import { createTextStyle } from '@/presentation/components/text/Text.styles';
import type { AppTextProps } from '@/presentation/components/text/Text.types';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Text({
  variant = 'body',
  tone = 'text',
  style,
  ...props
}: AppTextProps): React.JSX.Element {
  const { theme } = useTheme();

  return <NativeText {...props} style={createTextStyle(theme, variant, tone, style)} />;
}
