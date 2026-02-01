import { isNullOrUndefined } from '../utils';

export class DateRange {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    if (isNullOrUndefined(start)) {
      throw new Error('Start must be defined');
    }

    if (isNullOrUndefined(end)) {
      throw new Error('End must be defined');
    }

    if (!(start instanceof Date)) {
      throw new Error('Start must be a Date');
    }

    if (!(end instanceof Date)) {
      throw new Error('End must be a Date');
    }

    if (start.getTime() > end.getTime()) {
      throw new Error('Start must be less than or equal to end');
    }

    this.start = start;
    this.end = end;
  }

  static fromString(start: string, end: string): DateRange {
    return new DateRange(new Date(start), new Date(end));
  }
}
