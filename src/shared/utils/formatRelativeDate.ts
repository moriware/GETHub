import { DateFormatterService } from '@/application/services/DateFormatterService';

const formatter = new DateFormatterService('pt-BR');

export function formatRelativeDate(value: string | Date): string {
  return formatter.formatRelative(value);
}
