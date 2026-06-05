import { describe, expect, it } from 'vitest';
import { chunk } from './chunk';
import { compact } from './compact';
import { difference, intersection } from './intersection';
import { first, last } from './first-last';
import { flatten, flattenDeep } from './flatten';
import { groupBy } from './group-by';

describe('chunk', () => {
  it('deve dividir o array em grupos do tamanho especificado', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
  it('deve retornar array vazio se size <= 0', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
  });
  it('deve funcionar com arrays vazios', () => {
    expect(chunk([], 3)).toEqual([]);
  });
});

describe('groupBy', () => {
  it('deve agrupar por chave', () => {
    const result = groupBy(
      [
        { type: 'a', v: 1 },
        { type: 'b', v: 2 },
        { type: 'a', v: 3 },
      ],
      (x) => x.type
    );
    expect(result).toEqual({
      a: [
        { type: 'a', v: 1 },
        { type: 'a', v: 3 },
      ],
      b: [{ type: 'b', v: 2 }],
    });
  });
  it('deve funcionar com arrays vazios', () => {
    expect(groupBy([], (x: string) => x)).toEqual({});
  });
});

describe('flatten', () => {
  it('deve achatar um nível', () => {
    expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
  });
  it('deve funcionar com arrays vazios', () => {
    expect(flatten([])).toEqual([]);
  });
});

describe('flattenDeep', () => {
  it('deve achatar recursivamente', () => {
    expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });
});

describe('compact', () => {
  it('deve remover valores falsy', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3]);
  });
  it('deve manter valores truthy', () => {
    expect(compact([1, 'a', true])).toEqual([1, 'a', true]);
  });
});

describe('intersection', () => {
  it('deve retornar elementos comuns', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });
  it('deve retornar vazio se não há interseção', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });
});

describe('difference', () => {
  it('deve retornar elementos em a que não estão em b', () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
  });
  it('deve retornar vazio se todos os elementos estão em b', () => {
    expect(difference([1, 2], [1, 2, 3])).toEqual([]);
  });
});

describe('first', () => {
  it('deve retornar o primeiro elemento', () => {
    expect(first([1, 2, 3])).toBe(1);
  });
  it('deve retornar undefined para array vazio', () => {
    expect(first([])).toBeUndefined();
  });
});

describe('last', () => {
  it('deve retornar o último elemento', () => {
    expect(last([1, 2, 3])).toBe(3);
  });
  it('deve retornar undefined para array vazio', () => {
    expect(last([])).toBeUndefined();
  });
});
