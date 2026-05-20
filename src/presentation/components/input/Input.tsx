import React from 'react';
import { TextInput } from 'react-native';

import {
  createInputContainerStyle,
  createInputFieldStyle,
} from '@/presentation/components/input/Input.styles';
import type { InputProps } from '@/presentation/components/input/Input.types';
import { AppView } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Input({
  label,
  error,
  helperText,
  style,
  ...props
}: InputProps): React.JSX.Element {
  const { theme } = useTheme();
  return (
    <AppView style={createInputContainerStyle(theme)}>
      {label ? <Text variant="label">{label}</Text> : null}
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.muted}
        style={[createInputFieldStyle(theme, Boolean(error)), style]}
      />
      {error ? (
        <Text tone="danger">{error}</Text>
      ) : helperText ? (
        <Text tone="muted">{helperText}</Text>
      ) : null}
    </AppView>
  );
}
