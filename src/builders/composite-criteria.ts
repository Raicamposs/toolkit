export interface Criteria<T> {
  matching(data: T[]): T[];
}

export class CompositeCriteria<T> implements Criteria<T> {
  private readonly criteriaList: Criteria<T>[];

  constructor(criteriaList: Criteria<T>[] = []) {
    this.criteriaList = criteriaList;
  }

  add(criteria: Criteria<T>): CompositeCriteria<T> {
    return new CompositeCriteria<T>([...this.criteriaList, criteria]);
  }

  matching(data: T[]): T[] {
    return this.criteriaList.reduce((result, criteria) => {
      return criteria.matching(result);
    }, data);
  }
}

export class OrCriteria<T> implements Criteria<T> {
  constructor(
    private firstCriteria: Criteria<T>,
    private secondCriteria: Criteria<T>
  ) {}

  matching(items: T[]): T[] {
    const firstResult = this.firstCriteria.matching(items);
    const secondResult = this.secondCriteria.matching(items);

    return Array.from(new Set([...firstResult, ...secondResult]));
  }
}
