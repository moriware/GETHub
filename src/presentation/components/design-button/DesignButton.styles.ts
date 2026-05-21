import { AppTheme } from '@/shared/types/theme';

/**
 * Cria estilo do botão de atalho do header com feedback de toque.
 */
export function createHeaderShortcutStyle(theme: AppTheme, pressed: boolean) {
  return {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: pressed ? theme.colors.surface : 'transparent',
  };
}
