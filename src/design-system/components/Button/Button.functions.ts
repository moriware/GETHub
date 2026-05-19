import type { ThemeColorTokens } from '@/shared/types/theme';
import type { ButtonVariant } from '@/design-system/components/Button/Button.types';
import type { TextTone } from '@/design-system/components/Text/Text.types';

/**
 * Resolve o tom de texto do botão conforme a variante.
 */
export function resolveButtonTextTone(variant: ButtonVariant): TextTone {
  return variant === 'primary' ? 'surface' : 'text';
}

/**
 * Resolve a cor do indicador de loading do botão conforme a variante.
 */
export function resolveButtonLoaderColor(variant: ButtonVariant, colors: ThemeColorTokens): string {
  return variant === 'primary' ? colors.surface : colors.text;
}
