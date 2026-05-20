import React from 'react';
import { ActivityIndicator } from 'react-native';

import {
  resolveButtonLoaderColor,
  resolveButtonTextTone,
} from '@/presentation/components/button/Button.functions';
import {
  createButtonBaseStyle,
  createButtonVariantStyle,
  resolveButtonSizeStyle,
} from '@/presentation/components/button/Button.styles';
import type { ButtonProps } from '@/presentation/components/button/Button.types';
import { AppPressable } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}: ButtonProps): React.JSX.Element {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <AppPressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        createButtonBaseStyle(theme, isDisabled, pressed),
        resolveButtonSizeStyle(theme, size),
        createButtonVariantStyle(theme, variant, pressed),
      ]}>
      {loading ? (
        <ActivityIndicator color={resolveButtonLoaderColor(variant, theme.colors)} />
      ) : null}
      <Text tone={resolveButtonTextTone(variant)} variant="body">
        {label}
      </Text>
    </AppPressable>
  );
}
