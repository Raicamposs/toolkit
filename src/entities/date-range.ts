export class DateRange {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    if (start.getTime() > end.getTime()) {
      throw new RangeError('Start must be less than or equal to end');
    }

    this.start = start;
    this.end = end;
  }

  static fromString(start: string, end: string): DateRange {
    return new DateRange(new Date(start), new Date(end));
  }
}
