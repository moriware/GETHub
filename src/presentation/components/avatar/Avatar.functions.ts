import type { AvatarSize } from '@/presentation/components/avatar/Avatar.types';
import type { AppTheme } from '@/shared/types/theme';

export function resolveAvatarDimension(theme: AppTheme, size: AvatarSize): number {
  if (size === 'sm') {
    return theme.sizes.avatar.sm;
  }

  if (size === 'lg') {
    return theme.sizes.avatar.lg;
  }

  return theme.sizes.avatar.md;
}
