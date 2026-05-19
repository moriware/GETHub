import type { AppTheme } from '@/shared/types/theme';
import type { ButtonSize, ButtonVariant } from '@/design-system/components/Button/Button.types';

export function createButtonBaseStyle(theme: AppTheme, isDisabled: boolean, pressed: boolean) {
  return {
    borderRadius: theme.radius.md,
    opacity: isDisabled ? theme.opacity.disabled : pressed ? theme.opacity.pressed : theme.opacity.full,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
  };
}

export function createButtonVariantStyle(theme: AppTheme, variant: ButtonVariant) {
  if (variant === 'primary') {
    return {
      backgroundColor: theme.colors.primary,
      borderWidth: theme.borders.width.none,
    };
  }

  if (variant === 'outline') {
    return {
      backgroundColor: 'transparent',
      borderWidth: theme.borders.width.thin,
      borderColor: theme.colors.border,
    };
  }

  return {
    backgroundColor: 'transparent',
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
