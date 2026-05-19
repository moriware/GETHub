import type { AppTheme } from '@/shared/types/theme';
import type { AvatarSize } from '@/design-system/components/Avatar/Avatar.types';

export function resolveAvatarDimension(theme: AppTheme, size: AvatarSize): number {
  if (size === 'sm') {
    return theme.sizes.avatarSm;
  }

  if (size === 'lg') {
    return theme.sizes.avatarLg;
  }

  return theme.sizes.avatarMd;
}
