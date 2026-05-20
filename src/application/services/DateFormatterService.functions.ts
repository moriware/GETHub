import type { RelativeUnit } from '@/application/services/DateFormatterService.types';

export function formatRelativeFallback(value: number, unit: RelativeUnit): string {
  const absolute = Math.abs(value);
  const pluralizedUnit = resolveRelativeUnitPt(absolute, unit);

  if (value < 0) {
    return `há ${absolute} ${pluralizedUnit}`;
  }

  if (value > 0) {
    return `em ${absolute} ${pluralizedUnit}`;
  }

  return 'agora';
}

function resolveRelativeUnitPt(value: number, unit: RelativeUnit): string {
  if (unit === 'month') {
    return value === 1 ? 'mês' : 'meses';
  }

  if (unit === 'second') {
    return value === 1 ? 'segundo' : 'segundos';
  }

  if (unit === 'minute') {
    return value === 1 ? 'minuto' : 'minutos';
  }

  if (unit === 'hour') {
    return value === 1 ? 'hora' : 'horas';
  }

  if (unit === 'day') {
    return value === 1 ? 'dia' : 'dias';
  }

  return value === 1 ? 'ano' : 'anos';
}
