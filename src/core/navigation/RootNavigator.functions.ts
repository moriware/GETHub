/**
 * Define se o atalho de Design System deve ser exibido no header.
 */
export function shouldShowDesignSystemShortcut(routeName: string): boolean {
  return routeName !== 'explore';
}
