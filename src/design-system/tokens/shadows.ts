import { opacity } from '@/design-system/tokens/opacity';

export const shadows = {
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
} as const;
