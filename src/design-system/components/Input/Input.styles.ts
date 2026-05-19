import type { AppTheme } from '@/shared/types/theme';

export function createInputContainerStyle(theme: AppTheme) {
  return { gap: theme.spacing.xs };
}

export function createInputFieldStyle(theme: AppTheme, hasError: boolean) {
  return {
    borderWidth: theme.borders.width.thin,
    borderColor: hasError ? theme.colors.danger : theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  };
}
