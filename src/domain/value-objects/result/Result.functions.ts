import type { Result } from '@/domain/value-objects/result/Result.types';

/**
 * Retorna um resultado de sucesso da camada de domínio.
 */
export function success<T, E = Error>(value: T): Result<T, E> {
  return { ok: true, value };
}

/**
 * Retorna um resultado de erro da camada de domínio.
 */
export function failure<E extends Error>(error: E): Result<never, E> {
  return { ok: false, error };
}
