import React from 'react';
import { Image } from 'react-native';

import { resolveAvatarDimension } from '@/design-system/components/Avatar/Avatar.functions';
import { createAvatarStyle } from '@/design-system/components/Avatar/Avatar.styles';
import type { AvatarProps } from '@/design-system/components/Avatar/Avatar.types';
import { useTheme } from '@/design-system/theme/useTheme';

export function Avatar({ uri, size = 'md' }: AvatarProps): React.JSX.Element {
  const theme = useTheme();
  const dimension = resolveAvatarDimension(theme, size);

  return <Image source={{ uri }} style={createAvatarStyle(dimension)} />;
}
