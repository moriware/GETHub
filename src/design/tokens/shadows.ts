import { opacity } from '@/design/tokens/opacity';
import { ThemeShadowTokens } from '@/shared/types/theme';

export const shadows: ThemeShadowTokens = {
  sm: {
    shadowColor: '#000000',
    shadowOpacity: opacity.subtle,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOpacity: opacity.medium,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
};
