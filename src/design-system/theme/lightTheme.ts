import { borders, lightColors, opacity, radius, shadows, sizes, spacing, typography } from '@/design-system/tokens';
import type { AppTheme } from '@/shared/types/theme';

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  radius,
  typography,
  sizes,
  opacity,
  borders,
  shadows,
};
