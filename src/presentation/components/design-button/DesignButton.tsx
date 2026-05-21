import { createHeaderShortcutStyle } from '@/presentation/components/design-button/DesignButton.styles';
import { DesignShortcutButtonProps } from '@/presentation/components/design-button/DesignButton.types';
import { AppPressable } from '@/presentation/components/primitives';
import { Text } from '@/presentation/components/text/Text';
import React from 'react';

export function DesignButton({ theme, onPress }: DesignShortcutButtonProps) {
  return (
    <AppPressable
      onPress={onPress}
      style={({ pressed }) => createHeaderShortcutStyle(theme, pressed)}>
      <Text tone="primary" variant="label">
        Design
      </Text>
    </AppPressable>
  );
}
