import type { RelativeUnit } from '@/application/services/DateFormatterService.types';

export function formatRelativeFallback(value: number, unit: RelativeUnit): string {
  const absolute = Math.abs(value);
  const pluralizedUnit = absolute === 1 ? unit : `${unit}s`;

  if (value < 0) {
    return `${absolute} ${pluralizedUnit} ago`;
  }

  if (value > 0) {
    return `in ${absolute} ${pluralizedUnit}`;
  }

  return `0 ${pluralizedUnit}`;
}
