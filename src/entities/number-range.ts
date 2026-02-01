export class NumberRange {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    if (start > end) {
      throw new Error('Start must be less than or equal to end');
    }

    this.start = start;
    this.end = end;
  }
}
