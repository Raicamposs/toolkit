import { describe, expectTypeOf, it } from 'vitest';
import { Brand } from './brand';
import { DeepMutable } from './deep-mutable';
import { DeepRequired } from './deep-required';
import { ElementOf } from './element-of';
import { Arguments, AsyncFunction, FirstArgument, Promisify } from './function-types';
import { IsAny, IsNever, IsUnknown } from './intrinsic';
import { JsonObject, JsonPrimitive, JsonValue, Jsonify } from './json';
import { Merge } from './merge';
import { AtLeast, NonEmptyArray, Tuple } from './non-empty-array';
import { Getters, OptionalKeys, RequiredKeys } from './object-shape';
import { PartialBy, ReadonlyBy, RequiredBy } from './partial-by';
import { KeysOfType, OmitByType, PickByType } from './pick-by-type';
import { Join, PathOf, Split } from './template-literal';
import { UnionToIntersection } from './union';

describe('Brand', () => {
  it('deve criar tipos nominais que impedem atribuição cruzada', () => {
    type UserId = Brand<string, 'UserId'>;
    type OrderId = Brand<string, 'OrderId'>;

    const userId = '1' as UserId;
    const orderId = '2' as OrderId;

    expectTypeOf(userId).toEqualTypeOf<UserId>();
    expectTypeOf(orderId).toEqualTypeOf<OrderId>();
    // @ts-expect-error — UserId não é assignável para OrderId
    const wrong: OrderId = userId;
  });
});

describe('DeepRequired', () => {
  it('deve tornar todas as propriedades requeridas recursivamente', () => {
    type Config = { host?: string; db?: { port?: number } };
    type Required = DeepRequired<Config>;

    const config: Required = { host: 'localhost', db: { port: 5432 } };
    expectTypeOf(config.host).toEqualTypeOf<string>();
    expectTypeOf(config.db.port).toEqualTypeOf<number>();
  });
});

describe('DeepMutable', () => {
  it('deve remover readonly recursivamente', () => {
    type Frozen = { readonly id: number; readonly meta: { readonly tag: string } };
    type Mutable = DeepMutable<Frozen>;

    const obj: Mutable = { id: 1, meta: { tag: 'x' } };
    obj.id = 2;
    obj.meta.tag = 'y';
    expectTypeOf(obj.id).toEqualTypeOf<number>();
  });
});

describe('ElementOf', () => {
  it('deve extrair o tipo do elemento do array', () => {
    type Num = ElementOf<number[]>;
    expectTypeOf<Num>().toEqualTypeOf<number>();

    type User = { id: string };
    type U = ElementOf<User[]>;
    expectTypeOf<U>().toEqualTypeOf<User>();
  });

  it('deve retornar never para não-arrays', () => {
    type N = ElementOf<string>;
    expectTypeOf<N>().toEqualTypeOf<never>();
  });
});

describe('NonEmptyArray / Tuple / AtLeast', () => {
  it('NonEmptyArray deve exigir ao menos um elemento', () => {
    const arr: NonEmptyArray<number> = [1];
    const arr2: NonEmptyArray<string> = ['a', 'b'];
    expectTypeOf(arr[0]).toEqualTypeOf<number>();
    // @ts-expect-error — array vazio não é permitido
    const empty: NonEmptyArray<number> = [];
  });

  it('Tuple deve ter exatamente N elementos', () => {
    const pair: Tuple<string, 2> = ['a', 'b'];
    expectTypeOf(pair).toEqualTypeOf<[string, string]>();
  });

  it('AtLeast deve ter ao menos N elementos', () => {
    const atLeast2: AtLeast<number, 2> = [1, 2];
    const withMore: AtLeast<number, 2> = [1, 2, 3, 4];
    expectTypeOf(atLeast2[0]).toEqualTypeOf<number>();
  });
});

describe('KeysOfType / PickByType / OmitByType', () => {
  interface Mixed { id: number; name: string; active: boolean; age: number }

  it('KeysOfType deve extrair chaves pelo tipo do valor', () => {
    type NumKeys = KeysOfType<Mixed, number>;
    expectTypeOf<NumKeys>().toEqualTypeOf<'id' | 'age'>();
  });

  it('PickByType deve selecionar propriedades pelo tipo', () => {
    type OnlyNums = PickByType<Mixed, number>;
    expectTypeOf<OnlyNums>().toEqualTypeOf<{ id: number; age: number }>();
  });

  it('OmitByType deve excluir propriedades pelo tipo', () => {
    type NoNums = OmitByType<Mixed, number>;
    expectTypeOf<NoNums>().toEqualTypeOf<{ name: string; active: boolean }>();
  });
});

describe('PartialBy / RequiredBy / ReadonlyBy', () => {
  interface User { id: number; name: string; email?: string }

  it('PartialBy deve tornar chaves específicas opcionais', () => {
    type Draft = PartialBy<User, 'id'>;
    const d: Draft = { name: 'Ana' };
    expectTypeOf(d.id).toEqualTypeOf<number | undefined>();
  });

  it('RequiredBy deve tornar chaves específicas obrigatórias', () => {
    type Full = RequiredBy<User, 'email'>;
    const f: Full = { id: 1, name: 'Ana', email: 'a@b.com' };
    expectTypeOf(f.email).toEqualTypeOf<string>();
  });

  it('ReadonlyBy deve tornar chaves específicas readonly', () => {
    type Locked = ReadonlyBy<User, 'id'>;
    const obj: Locked = { id: 1, name: 'Ana' };
    // @ts-expect-error — id é readonly
    obj.id = 2;
  });
});

describe('Merge', () => {
  it('deve combinar dois tipos com U sobrescrevendo T', () => {
    type A = { id: number; name: string; createdAt: Date };
    type B = { createdAt: string };
    type Merged = Merge<A, B>;

    const m: Merged = { id: 1, name: 'Ana', createdAt: '2024-01-01' };
    expectTypeOf(m.createdAt).toEqualTypeOf<string>();
    expectTypeOf(m.id).toEqualTypeOf<number>();
  });
});

describe('RequiredKeys / OptionalKeys / Getters', () => {
  interface Profile { id: number; name: string; bio?: string; avatar?: string }

  it('RequiredKeys deve extrair chaves obrigatórias', () => {
    type RK = RequiredKeys<Profile>;
    expectTypeOf<RK>().toEqualTypeOf<'id' | 'name'>();
  });

  it('OptionalKeys deve extrair chaves opcionais', () => {
    type OK = OptionalKeys<Profile>;
    expectTypeOf<OK>().toEqualTypeOf<'bio' | 'avatar'>();
  });

  it('Getters deve gerar métodos getter para cada propriedade', () => {
    type G = Getters<{ name: string; age: number }>;
    const obj: G = { getName: () => 'Ana', getAge: () => 30 };
    expectTypeOf(obj.getName()).toEqualTypeOf<string>();
    expectTypeOf(obj.getAge()).toEqualTypeOf<number>();
  });
});

describe('Function types', () => {
  it('Arguments deve extrair os argumentos como tupla', () => {
    type Fn = (a: string, b: number) => void;
    type Args = Arguments<Fn>;
    expectTypeOf<Args>().toEqualTypeOf<[string, number]>();
  });

  it('FirstArgument deve extrair o primeiro argumento', () => {
    type Fn = (id: string, fallback: number) => void;
    type First = FirstArgument<Fn>;
    expectTypeOf<First>().toEqualTypeOf<string>();
  });

  it('AsyncFunction deve envolver o retorno em Promise', () => {
    type Sync = (id: string) => number;
    type Async = AsyncFunction<Sync>;
    expectTypeOf<Async>().toEqualTypeOf<(id: string) => Promise<number>>();
  });

  it('Promisify deve envolver o retorno em Promise', () => {
    type Fn = (x: number) => string;
    type Async = Promisify<Fn>;
    expectTypeOf<Async>().toEqualTypeOf<(x: number) => Promise<string>>();
  });
});

describe('Template literal types', () => {
  it('Split deve dividir string por delimitador', () => {
    type Parts = Split<'a.b.c', '.'>;
    expectTypeOf<Parts>().toEqualTypeOf<['a', 'b', 'c']>();
  });

  it('Join deve unir tupla em string', () => {
    type Joined = Join<['a', 'b', 'c'], '-'>;
    expectTypeOf<Joined>().toEqualTypeOf<'a-b-c'>();
  });

  it('PathOf deve gerar paths de objetos aninhados', () => {
    type Config = { host: string; db: { port: number; name: string } };
    type Paths = PathOf<Config>;
    const path1: Paths = 'host';
    const path2: Paths = 'db';
    const path3: Paths = 'db.port';
    const path4: Paths = 'db.name';
    // @ts-expect-error — caminho inválido
    const invalid: Paths = 'db.invalid';
  });
});

describe('Union types', () => {
  it('UnionToIntersection deve converter union em intersection', () => {
    type Result = UnionToIntersection<{ a: string } | { b: number }>;
    const obj: Result = { a: 'x', b: 1 };
    expectTypeOf(obj.a).toEqualTypeOf<string>();
    expectTypeOf(obj.b).toEqualTypeOf<number>();
  });
});

describe('Type intrinsics', () => {
  it('IsNever deve retornar true para never', () => {
    expectTypeOf<IsNever<never>>().toEqualTypeOf<true>();
    expectTypeOf<IsNever<string>>().toEqualTypeOf<false>();
  });

  it('IsAny deve retornar true para any', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<IsAny<any>>().toEqualTypeOf<true>();
    expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>();
  });

  it('IsUnknown deve retornar true apenas para unknown', () => {
    expectTypeOf<IsUnknown<unknown>>().toEqualTypeOf<true>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<IsUnknown<any>>().toEqualTypeOf<false>();
    expectTypeOf<IsUnknown<string>>().toEqualTypeOf<false>();
  });
});

describe('JSON types', () => {
  it('JsonPrimitive deve aceitar tipos primitivos JSON', () => {
    const a: JsonPrimitive = 'str';
    const b: JsonPrimitive = 42;
    const c: JsonPrimitive = true;
    const d: JsonPrimitive = null;
    expectTypeOf(a).toExtend<JsonPrimitive>();
  });

  it('JsonValue deve aceitar objetos e arrays aninhados', () => {
    const obj: JsonObject = { name: 'Ana', age: 30, tags: ['ts', 'node'] };
    expectTypeOf(obj).toExtend<JsonValue>();
  });

  it('Jsonify deve converter funções e undefined para never', () => {
    type Source = { id: number; fn: () => void; created: Date };
    type Serialized = Jsonify<Source>;
    expectTypeOf<Serialized['id']>().toEqualTypeOf<number>();
    expectTypeOf<Serialized['fn']>().toEqualTypeOf<never>();
  });
});
