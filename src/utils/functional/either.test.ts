import { describe, expect, it } from 'vitest';
import { Either, Left, Right } from './either';

describe('Either', () => {
  it('deve criar um Left', () => {
    const left = new Left('error');
    expect(left.isLeft()).toBe(true);
    expect(left.isRight()).toBe(false);
    expect(left.value).toBe('error');
  });

  it('deve criar um Right', () => {
    const right = new Right('success');
    expect(right.isLeft()).toBe(false);
    expect(right.isRight()).toBe(true);
    expect(right.value).toBe('success');
  });

  it('deve retornar Left quando Left é criado', () => {
    const either: Either<string, number> = new Left('error');
    expect(either.isLeft()).toBe(true);
    expect(either.isRight()).toBe(false);
  });

  it('deve retornar Right quando Right é criado', () => {
    const either: Either<string, number> = new Right(123);
    expect(either.isLeft()).toBe(false);
    expect(either.isRight()).toBe(true);
  });
});
