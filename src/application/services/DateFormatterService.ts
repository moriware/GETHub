import {
  DAY,
  HOUR,
  MINUTE,
  MONTH,
  YEAR,
} from '@/application/services/DateFormatterService.constants';
import { formatRelativeFallback } from '@/application/services/DateFormatterService.functions';
import type {
  FormatRelativeValue,
  RelativeUnit,
} from '@/application/services/DateFormatterService.types';

export class DateFormatterService {
  private readonly formatter?: Intl.RelativeTimeFormat;

  constructor(locale: string) {
    const RelativeTimeFormatCtor = globalThis.Intl?.RelativeTimeFormat;
    if (typeof RelativeTimeFormatCtor === 'function') {
      this.formatter = new RelativeTimeFormatCtor(locale, { numeric: 'auto' });
    }
  }

  formatRelative(value: FormatRelativeValue): string {
    const date = value instanceof Date ? value : new Date(value);
    const deltaSeconds = Math.round((date.getTime() - Date.now()) / 1000);
    const absSeconds = Math.abs(deltaSeconds);

    if (absSeconds < MINUTE) {
      return this.formatUnit(deltaSeconds, 'second');
    }
    if (absSeconds < HOUR) {
      return this.formatUnit(Math.round(deltaSeconds / MINUTE), 'minute');
    }
    if (absSeconds < DAY) {
      return this.formatUnit(Math.round(deltaSeconds / HOUR), 'hour');
    }
    if (absSeconds < MONTH) {
      return this.formatUnit(Math.round(deltaSeconds / DAY), 'day');
    }
    if (absSeconds < YEAR) {
      return this.formatUnit(Math.round(deltaSeconds / MONTH), 'month');
    }

    return this.formatUnit(Math.round(deltaSeconds / YEAR), 'year');
  }

  private formatUnit(value: number, unit: RelativeUnit): string {
    if (this.formatter) {
      return this.formatter.format(value, unit);
    }

    return formatRelativeFallback(value, unit);
  }
}
