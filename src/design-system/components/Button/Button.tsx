import React from 'react';
import { ActivityIndicator } from 'react-native';

import {
  resolveButtonLoaderColor,
  resolveButtonTextTone,
} from '@/design-system/components/Button/Button.functions';
import {
  createButtonBaseStyle,
  createButtonVariantStyle,
  resolveButtonSizeStyle,
} from '@/design-system/components/Button/Button.styles';
import type { ButtonProps } from '@/design-system/components/Button/Button.types';
import { AppPressable } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}: ButtonProps): React.JSX.Element {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <AppPressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        createButtonBaseStyle(theme, isDisabled, pressed),
        resolveButtonSizeStyle(theme, size),
        createButtonVariantStyle(theme, variant),
      ]}>
      {loading ? <ActivityIndicator color={resolveButtonLoaderColor(variant, theme.colors)} /> : null}
      <Text tone={resolveButtonTextTone(variant)} variant="body">
        {label}
      </Text>
    </AppPressable>
  );
}
