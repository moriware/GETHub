import React from 'react';
import { TextInput } from 'react-native';

import {
  createInputContainerStyle,
  createInputFieldStyle,
} from '@/design-system/components/Input/Input.styles';
import type { InputProps } from '@/design-system/components/Input/Input.types';
import { AppView } from '@/design-system/components/primitives';
import { Text } from '@/design-system/components/Text/Text';
import { useTheme } from '@/design-system/theme/useTheme';

export function Input({ label, error, helperText, style, ...props }: InputProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <AppView style={createInputContainerStyle(theme)}>
      {label ? <Text variant="label">{label}</Text> : null}
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.muted}
        style={[createInputFieldStyle(theme, Boolean(error)), style]}
      />
      {error ? <Text tone="danger">{error}</Text> : helperText ? <Text tone="muted">{helperText}</Text> : null}
    </AppView>
  );
}
