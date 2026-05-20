import { UI_THRESHOLDS } from '@/shared/constants/ui';

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: UI_THRESHOLDS.compactNumberMaxFractionDigits,
  }).format(value);
}
