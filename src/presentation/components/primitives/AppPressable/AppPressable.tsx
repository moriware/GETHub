import React from 'react';
import { Pressable } from 'react-native';

import { resolveProvidedPressableStyle } from '@/presentation/components/primitives/AppPressable/AppPressable.functions';
import { createAppPressableStyle } from '@/presentation/components/primitives/AppPressable/AppPressable.styles';
import type { AppPressableProps } from '@/presentation/components/primitives/AppPressable/AppPressable.types';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function AppPressable({
  surface = 'transparent',
  style,
  disabled = false,
  ...props
}: AppPressableProps): React.JSX.Element {
  const { theme } = useTheme();
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
