import { MESSAGES } from '@/shared/constants/messages';

/**
 * Normaliza mensagens de erro de queries/mutations para exibição na UI.
 */
export function resolveQueryErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return MESSAGES.genericError;
}
