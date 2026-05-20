import type { AppTheme } from '@/shared/types/theme';

/**
 * Define se o atalho de Design System deve ser exibido no header.
 */
export function shouldShowDesignSystemShortcut(routeName: string): boolean {
  return routeName !== 'explore';
}

/**
 * Cria estilo do botão de atalho do header com feedback de toque.
 */
export function createHeaderShortcutStyle(theme: AppTheme, pressed: boolean) {
  return {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderWidth: theme.borders.width.thin,
    borderColor: pressed ? theme.colors.primary : theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: pressed ? theme.colors.surface : 'transparent',
  };
}
