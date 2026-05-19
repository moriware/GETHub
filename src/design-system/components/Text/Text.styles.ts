import type { StyleProp, TextStyle } from 'react-native';

import type { AppTheme } from '@/shared/types/theme';
import type { TextTone, TextVariant } from '@/design-system/components/Text/Text.types';

export function createTextStyle(
  theme: AppTheme,
  variant: TextVariant,
  tone: TextTone,
  style?: StyleProp<TextStyle>,
): StyleProp<TextStyle> {
  return [
    {
      color: theme.colors[tone],
      fontSize: theme.typography[variant],
    },
    style,
  ];
}
