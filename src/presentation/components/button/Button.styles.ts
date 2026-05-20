import type { ButtonSize, ButtonVariant } from '@/presentation/components/button/Button.types';
import type { AppTheme } from '@/shared/types/theme';

export function createButtonBaseStyle(theme: AppTheme, isDisabled: boolean, pressed: boolean) {
  return {
    borderRadius: theme.radius.md,
    opacity: isDisabled
      ? theme.opacity.disabled
      : pressed
        ? theme.opacity.pressed
        : theme.opacity.full,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
  };
}

export function createButtonVariantStyle(
  theme: AppTheme,
  variant: ButtonVariant,
  pressed: boolean,
) {
  if (variant === 'primary') {
    return {
      backgroundColor: theme.colors.primary,
      borderWidth: theme.borders.width.none,
    };
  }

  if (variant === 'outline') {
    return {
      backgroundColor: pressed ? theme.colors.headerBackground : 'transparent',
      borderWidth: theme.borders.width.thin,
      borderColor: pressed ? theme.colors.primary : theme.colors.border,
    };
  }

  return {
    backgroundColor: pressed ? theme.colors.headerBackground : 'transparent',
    borderWidth: theme.borders.width.none,
  };
}

export function resolveButtonSizeStyle(theme: AppTheme, size: ButtonSize) {
  if (size === 'sm') {
    return {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    };
  }

  if (size === 'lg') {
    return {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
    };
  }

  return {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  };
}
