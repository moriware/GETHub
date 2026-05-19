import { UI_THRESHOLDS } from '@/shared/constants/ui';

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: UI_THRESHOLDS.compactNumberMaxFractionDigits,
  }).format(value);
}
