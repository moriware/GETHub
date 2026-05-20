import type { TextProps as NativeTextProps } from 'react-native';

import type { ThemeColorTokens } from '@/shared/types/theme';

export type TextVariant = 'body' | 'label' | 'title' | 'headline';
export type TextTone = keyof ThemeColorTokens;

export interface AppTextProps extends NativeTextProps {
  variant?: TextVariant;
  tone?: TextTone;
}
