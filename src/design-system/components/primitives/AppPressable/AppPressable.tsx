import React from 'react';
import { Pressable } from 'react-native';

import { resolveProvidedPressableStyle } from '@/design-system/components/primitives/AppPressable/AppPressable.functions';
import { createAppPressableStyle } from '@/design-system/components/primitives/AppPressable/AppPressable.styles';
import type { AppPressableProps } from '@/design-system/components/primitives/AppPressable/AppPressable.types';
import { useTheme } from '@/design-system/theme/useTheme';

export function AppPressable({
  surface = 'transparent',
  style,
  disabled = false,
  ...props
}: AppPressableProps): React.JSX.Element {
  const theme = useTheme();
  const isDisabled = Boolean(disabled);

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={(state) => [
        createAppPressableStyle(theme, surface, isDisabled),
        resolveProvidedPressableStyle(style, state),
      ]}
    />
  );
}
