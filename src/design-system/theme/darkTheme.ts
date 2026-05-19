import { borders, darkColors, opacity, radius, shadows, sizes, spacing, typography } from '@/design-system/tokens';
import type { AppTheme } from '@/shared/types/theme';

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: darkColors,
  spacing,
  radius,
  typography,
  sizes,
  opacity,
  borders,
  shadows,
};
