import type { StyleProp, TextStyle } from 'react-native';

import type { TextTone, TextVariant } from '@/presentation/components/text/Text.types';
import type { AppTheme } from '@/shared/types/theme';

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
