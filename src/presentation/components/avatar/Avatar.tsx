import React from 'react';
import { Image } from 'react-native';

import { resolveAvatarDimension } from '@/presentation/components/avatar/Avatar.functions';
import { createAvatarStyle } from '@/presentation/components/avatar/Avatar.styles';
import type { AvatarProps } from '@/presentation/components/avatar/Avatar.types';
import { useTheme } from '@/presentation/hooks/theme/useTheme';

export function Avatar({ uri, size = 'md' }: AvatarProps): React.JSX.Element {
  const { theme } = useTheme();
  const dimension = resolveAvatarDimension(theme, size);

  return <Image source={{ uri }} style={createAvatarStyle(dimension)} />;
}
