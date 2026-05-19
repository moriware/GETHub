import type { RouteParamValue } from '@/core/navigation/routeParams.types';

/**
 * Normaliza parâmetros de rota do Expo Router para uma string única.
 */
export function pickRouteParam(value: RouteParamValue): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}
