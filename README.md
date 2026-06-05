# @raicampos/toolkit

> A comprehensive TypeScript utility library with type-safe helpers for modern development

[![npm version](https://img.shields.io/npm/v/@raicampos/toolkit.svg)](https://www.npmjs.com/package/@raicampos/toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)

## Installation

```bash
npm install @raicampos/toolkit
```

## Features

- **100% TypeScript** — Full type safety and IntelliSense support
- **Tree-shakeable** — Import only what you need
- **Zero Dependencies** — Lightweight and fast
- **Fully Tested** — Comprehensive test coverage with Vitest

## Table of Contents

- [Array Utilities](#array-utilities)
- [Async Utilities](#async-utilities)
- [Conditional Utilities](#conditional-utilities)
- [Control Flow](#control-flow)
- [Functional Utilities](#functional-utilities)
- [JSON Utilities](#json-utilities)
- [Number Utilities](#number-utilities)
- [Object Utilities](#object-utilities)
- [String Utilities](#string-utilities)
- [Validation Utilities](#validation-utilities)
- [Transforms](#transforms)
- [Type Utilities](#type-utilities)
- [Entities](#entities)
- [Builders](#builders)

---

## Array Utilities

```typescript
import { chunk, compact, difference, first, flatten, flattenDeep, groupBy, intersection, last, unique } from '@raicampos/toolkit';
```

### `chunk(array, size)`

Splits an array into chunks of the given size.

```typescript
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```

### `compact(array)`

Removes all falsy values (`false`, `null`, `0`, `''`, `undefined`, `NaN`).

```typescript
compact([0, 1, false, 2, '', 3, null, undefined]) // [1, 2, 3]
```

### `difference(a, b)`

Returns elements in `a` that are not in `b`.

```typescript
difference([1, 2, 3], [2, 3, 4]) // [1]
```

### `first(array)` / `last(array)`

Safe access to the first or last element.

```typescript
first([1, 2, 3]) // 1
last([1, 2, 3])  // 3
first([])        // undefined
```

### `flatten(array)` / `flattenDeep(array)`

```typescript
flatten([[1, 2], [3, 4]])     // [1, 2, 3, 4]
flattenDeep([1, [2, [3, [4]]]])  // [1, 2, 3, 4]
```

### `groupBy(array, keyFn)`

Groups elements by the key returned by `keyFn`.

```typescript
groupBy(
  [{ type: 'a', v: 1 }, { type: 'b', v: 2 }, { type: 'a', v: 3 }],
  (x) => x.type,
)
// { a: [{ type: 'a', v: 1 }, { type: 'a', v: 3 }], b: [{ type: 'b', v: 2 }] }
```

### `intersection(a, b)`

Returns elements present in both arrays.

```typescript
intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
```

### `unique(array)`

Removes duplicate values.

```typescript
unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
```

---

## Async Utilities

```typescript
import { debounce, retryWithBackoff, sleep, throttle, timeout } from '@raicampos/toolkit';
```

### `sleep(ms)`

Pauses execution for the given duration.

```typescript
await sleep(1000); // waits 1 second
```

### `debounce(fn, wait)`

Delays invoking `fn` until `wait` ms after the last call.

```typescript
const search = debounce((query: string) => fetchResults(query), 300);
```

### `throttle(fn, wait)`

Limits `fn` to at most one invocation per `wait` ms.

```typescript
const onScroll = throttle(() => updateHeader(), 100);
```

### `timeout(ms)`

Returns a promise that rejects after `ms` milliseconds.

```typescript
await Promise.race([fetchData(), timeout(5000)]); // fails if takes > 5s
```

### `retryWithBackoff(options)`

Retries a function with exponential backoff.

```typescript
const result = await retryWithBackoff({
  fn: () => fetchData(),
  maxRetries: 3,
  delay: 1000,
});
```

---

## Conditional Utilities

```typescript
import { coalesce, nullIf, undefinedIf } from '@raicampos/toolkit';
```

### `coalesce(...values)`

Returns the first non-null, non-undefined value.

```typescript
coalesce(null, undefined, 'hello', 'world') // 'hello'
coalesce(0, null, 5)                        // 0  — zero is a valid value
```

### `nullIf(value, nullValue)`

Returns `null` if `value === nullValue`, otherwise returns `value`.

```typescript
nullIf('', '')         // null
nullIf('hello', '')    // 'hello'
```

### `undefinedIf(value, checkValue)`

Returns `undefined` if `value === checkValue`, otherwise returns `value`.

```typescript
undefinedIf(0, 0)      // undefined
undefinedIf(1, 0)      // 1
```

---

## Control Flow

```typescript
import { assertNever, exhaustiveCheck } from '@raicampos/toolkit';
```

### `assertNever(value, message?)`

Throws at runtime and enforces exhaustiveness at compile time. Use in the `default` branch of a `switch` over a discriminated union.

```typescript
type Direction = 'left' | 'right';

function move(d: Direction): string {
  switch (d) {
    case 'left':  return 'moving left';
    case 'right': return 'moving right';
    default:      return assertNever(d); // compile error if Direction grows
  }
}
```

### `exhaustiveCheck(value)`

Compile-time exhaustiveness guard without a runtime throw.

```typescript
type Status = 'active' | 'inactive';

function handle(s: Status) {
  if (s === 'active') { /* ... */ }
  else if (s === 'inactive') { /* ... */ }
  else exhaustiveCheck(s); // type error if Status gains a new member
}
```

---

## Functional Utilities

```typescript
import { and, Either, isFlagged, Left, mapAllOr, mapOr, not, or, recent, Right, SpecOf } from '@raicampos/toolkit';
```

### `Either<L, R>`

Represents a value that is either a failure (`Left`) or a success (`Right`).

```typescript
function divide(a: number, b: number): Either<string, number> {
  if (b === 0) return new Left('Division by zero');
  return new Right(a / b);
}

const result = divide(10, 2);
if (result.isRight()) {
  console.log(result.value); // 5
}
```

### `mapOr(value, mapper, defaultValue?)`

Maps a value through a function, returning a default if null/undefined.

```typescript
mapOr('john', (n) => n.toUpperCase(), 'UNKNOWN') // 'JOHN'
mapOr(null,   (n) => n.toUpperCase(), 'UNKNOWN') // 'UNKNOWN'
```

### `mapAllOr(array, mapper, defaultValue?)`

Maps all items in an array, returning a default if the array is null/undefined.

```typescript
mapAllOr([1, 2, 3], (n) => n * 2) // [2, 4, 6]
mapAllOr(null, (n) => n * 2, [])  // []
```

### `SpecOf<T>` — Specification pattern

Composable predicate functions.

```typescript
interface User { age: number; isPremium: boolean }

const isAdult:   SpecOf<User> = (u) => u.age >= 18;
const isPremium: SpecOf<User> = (u) => u.isPremium;

const canAccess = or(isAdult, isPremium);
const fullAccess = and(isAdult, isPremium);
const isMinor = not(isAdult);

users.filter(canAccess);
```

### `isFlagged<T>(key)`

Creates a predicate that checks if a boolean property is `true`.

```typescript
const isActive = isFlagged<User>('isActive');
users.filter(isActive);
```

### `recent<T, K>(config)`

Creates a predicate that checks if a date property is within a time window.

```typescript
const isRecentlyCreated = recent<User, 'createdAt'>({ key: 'createdAt', minutes: 5 });
users.filter(isRecentlyCreated);
```

---

## JSON Utilities

```typescript
import { JSONConverter } from '@raicampos/toolkit';
```

### `JSONConverter.stringify<T>(object)`

Safely converts any value to a JSON string. Returns `null` for `null`/`undefined`.

```typescript
JSONConverter.stringify({ name: 'Ana' }) // '{"name":"Ana"}'
JSONConverter.stringify(null)            // null
```

### `JSONConverter.parse<T>(json)`

Safely parses a JSON string. Returns `undefined` on failure.

```typescript
JSONConverter.parse<{ name: string }>('{"name":"Ana"}') // { name: 'Ana' }
JSONConverter.parse('invalid json')                      // undefined
```

### `JSONConverter.parseWithDefault<T>(json, defaultValue?)`

Parses JSON with a typed fallback value (default: `{}`).

```typescript
JSONConverter.parseWithDefault('{"x":1}', { x: 0 }) // { x: 1 }
JSONConverter.parseWithDefault('bad',     { x: 0 }) // { x: 0 }
```

### `JsonCompress.compress(jsonObject)` / `JsonCompress.decompress(compressedData)`

Safely compresses any JSON-serializable value using gzip + base64 encoding, and decompresses it back.

```typescript
import { JsonCompress } from '@raicampos/toolkit';

const data = { name: 'Raian', tags: ['ts', 'zlib'] };
const compressed = await JsonCompress.compress(data);
// 'eJyrVkrLzC/NK8ksUapWUrJSUtJRys1PzkxRsjLUUTLWMdBRMgKKmxoamVrqKBkYWwIZJkq1AHPEDjo='

const decompressed = await JsonCompress.decompress<typeof data>(compressed);
// { name: 'Raian', tags: ['ts', 'zlib'] }
```

---

## Number Utilities

```typescript
import { MathUtils, numberParse, numberParseDef, roundABNT } from '@raicampos/toolkit';
```

### `MathUtils`

```typescript
MathUtils.calculatePercentage(200, 15)  // 30  (15% of 200)
MathUtils.calculatePercentageOf(30, 200) // 15  (30 is X% of 200)
MathUtils.isPrime(17)         // true
MathUtils.isPerfectSquare(25) // true
MathUtils.isPerfectCube(27)   // true
MathUtils.isEven(4)           // true
MathUtils.isOdd(3)            // true
MathUtils.isFractional(3.5)   // true
MathUtils.sum(1, 2, 3)        // 6
MathUtils.average(1, 2, 3)    // 2
MathUtils.min(1, 2, 3)        // 1
MathUtils.max(1, 2, 3)        // 3
MathUtils.range(1, 5)         // [1, 2, 3, 4, 5]
MathUtils.random(1, 10)       // random number between 1 and 10
```

### `numberParse(value)`

Parses a number from a string, number, or any object with a `toNumber()` method. Returns `undefined` for `NaN`.

```typescript
numberParse('42')    // 42
numberParse('abc')   // undefined
numberParse(null)    // null
```

### `numberParseDef(value, defaultValue?)`

Same as `numberParse` but returns `defaultValue` (default: `0`) instead of `undefined`.

```typescript
numberParseDef('abc', -1) // -1
numberParseDef(null)      // 0
```

### `roundABNT(value, fractionDigits?)`

Rounds following ABNT NBR 5891 rules (round-half-to-even).

```typescript
roundABNT(1.345, 2) // 1.34  — rounds to nearest even
roundABNT(1.335, 2) // 1.34
roundABNT(1.666, 2) // 1.67
```

---

## Object Utilities

```typescript
import { clone, createFactory, deepMerge, hasOnlyUnassignedProperties, hasSomePropertyAssigned, mapValues, omitKeys, pickKeys, purgeNullishValues, withoutKey } from '@raicampos/toolkit';
```

### `clone(obj)`

Deep clones any value using the native `structuredClone` API.

```typescript
const copy = clone({ nested: { value: 1 } });
copy.nested.value = 2; // original unchanged
```

### `createFactory(defaults)`

Creates a factory function with sensible defaults. Ideal for test data factories.

```typescript
const makeUser = createFactory({ id: '1', name: 'Ana', role: 'user' as const });

makeUser()                   // { id: '1', name: 'Ana', role: 'user' }
makeUser({ name: 'Carlos' }) // { id: '1', name: 'Carlos', role: 'user' }
makeUser({ role: 'admin' })  // { id: '1', name: 'Ana', role: 'admin' }
```

### `deepMerge(target, source)`

Deeply merges two objects. Source values override target values.

```typescript
deepMerge({ a: 1, b: { x: 1, y: 2 } }, { b: { y: 99, z: 3 } })
// { a: 1, b: { x: 1, y: 99, z: 3 } }
```

### `mapValues(obj, fn)`

Transforms each value of an object, preserving the keys.

```typescript
mapValues({ a: 1, b: 2, c: 3 }, (v) => v * 2) // { a: 2, b: 4, c: 6 }
mapValues({ a: 1, b: 2 }, String)              // { a: '1', b: '2' }
```

### `omitKeys(obj, keys)`

Returns a new object without the specified keys.

```typescript
omitKeys({ id: 1, name: 'Ana', password: 'x' }, ['password'])
// { id: 1, name: 'Ana' }
```

### `pickKeys(obj, ...keys)`

Returns a new object with only the specified keys.

```typescript
pickKeys({ id: 1, name: 'Ana', password: 'x' }, 'id', 'name')
// { id: 1, name: 'Ana' }
```

### `purgeNullishValues(obj)`

Recursively removes `null` and `undefined` from objects and arrays.

```typescript
purgeNullishValues({ name: 'Ana', age: null, address: { city: 'SP', zip: undefined } })
// { name: 'Ana', address: { city: 'SP' } }
```

### `withoutKey(obj, ...keys)`

Alias for `omitKeys` with a variadic key signature.

### `hasSomePropertyAssigned(obj)` / `hasOnlyUnassignedProperties(obj)`

```typescript
hasSomePropertyAssigned({ name: 'Ana', age: null })     // true
hasOnlyUnassignedProperties({ name: null, age: null })  // true
```

---

## String Utilities

```typescript
import { StringUtils } from '@raicampos/toolkit';
```

| Method | Input | Output |
|--------|-------|--------|
| `toSnakeCase(str)` | `'helloWorld'` | `'hello_world'` |
| `toKebabCase(str)` | `'helloWorld'` | `'hello-world'` |
| `toCamelCase(str)` | `'hello_world'` | `'helloWorld'` |
| `toTitleCase(str)` | `'hello world'` | `'Hello World'` |
| `capitalize(str)` | `'hello'` | `'Hello'` |
| `removeAccents(str)` | `'Café'` | `'Cafe'` |
| `slugify(text, sep?)` | `'Olá Mundo!'` | `'ola-mundo'` |

```typescript
StringUtils.slugify('Hello World!', '_') // 'hello_world'
StringUtils.slugify('Café au Lait')      // 'cafe-au-lait'
```

---

## Validation Utilities

```typescript
import { isArray, isArrayOf, isAssigned, isBoolean, isDate, isEmpty, isFunction, isNull, isNullOrUndefined, isNumber, isObject, isString, isUndefined } from '@raicampos/toolkit';
```

All functions are proper TypeScript type guards (narrow the type on `true`).

| Function | Returns `true` when |
|----------|---------------------|
| `isString(v)` | `typeof v === 'string'` |
| `isNumber(v)` | `typeof v === 'number' && !isNaN(v)` |
| `isBoolean(v)` | `typeof v === 'boolean'` |
| `isArray(v)` | `Array.isArray(v)` |
| `isArrayOf(v, guard)` | array where every item passes `guard` |
| `isFunction(v)` | `typeof v === 'function'` |
| `isDate(v)` | `v instanceof Date` and not invalid |
| `isObject(v)` | plain object (not array, not null) |
| `isNull(v)` | `v === null` |
| `isUndefined(v)` | `v === undefined` |
| `isNullOrUndefined(v)` | `v === null \|\| v === undefined` |
| `isAssigned(v)` | `v !== null && v !== undefined` |
| `isEmpty(v)` | null, undefined, empty string, or empty array |

```typescript
if (isString(value)) {
  value.toUpperCase(); // type-safe — value is string here
}

if (isArrayOf(items, isNumber)) {
  items.reduce((a, b) => a + b, 0); // items is number[] here
}
```

---

## Transforms

```typescript
import { EmptyMaskToNull, EmptyValueToNull, EmptyValueToUndefined, FlagToBooleanTransform, ReplaceSpecialCharacters, ZeroIdToNull, ZeroIdToUndefined } from '@raicampos/toolkit';
```

### `EmptyMaskToNull.execute(value)`

Converts masked strings that evaluate to empty (like `"   -  "`) to `null`.

```typescript
EmptyMaskToNull.execute('  -  ')  // null
EmptyMaskToNull.execute('123-45') // '123-45'
```

### `EmptyValueToNull.execute(value)` / `EmptyValueToUndefined.execute(value)`

Converts empty strings or spaces to `null` or `undefined`.

```typescript
EmptyValueToNull.execute('')       // null
EmptyValueToUndefined.execute(' ') // undefined
```

### `FlagToBooleanTransform.execute(value, defaultValue?)` / `reverse(value, defaultValue?)`

Converts truthy database flags (`'S'`, `'SIM'`, `'TRUE'`, etc.) to `boolean`, and vice-versa.

```typescript
FlagToBooleanTransform.execute('S') // true
FlagToBooleanTransform.execute('N') // false
FlagToBooleanTransform.execute('invalid', true) // true

FlagToBooleanTransform.reverse(true) // 'S'
FlagToBooleanTransform.reverse(false) // 'N'
```

### `ReplaceSpecialCharacters(value)`

Pure function that normalizes a string by stripping accents and special diacritics.

```typescript
ReplaceSpecialCharacters('Café com Ações') // 'Cafe com Acoes'
```

### `ZeroIdToNull.execute(value)` / `ZeroIdToUndefined.execute(value)`

Converts an ID that is `0` or negative to `null` or `undefined`.

```typescript
ZeroIdToNull.execute(0)     // null
ZeroIdToNull.execute('0')   // null
ZeroIdToNull.execute(123)   // 123
```

---

## Type Utilities

### Core types

```typescript
import { Brand, Merge, Nullable, Optional, PartialBy, RequiredBy, ReadonlyBy } from '@raicampos/toolkit';
```

#### `Nullable<T>`
```typescript
const name: Nullable<string> = null; // string | null | undefined
```

#### `Brand<K, T>`
Nominal typing to prevent mixing semantically different primitives.
```typescript
type UserId  = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>

declare function getUser(id: UserId): User
const orderId = '123' as OrderId
getUser(orderId) // compile error — OrderId is not UserId
```

#### `Optional<T, K>` / `PartialBy<T, K>`
Make specific keys optional.
```typescript
type Draft = PartialBy<{ id: number; name: string }, 'id'>
// { id?: number; name: string }
```

#### `RequiredBy<T, K>` / `ReadonlyBy<T, K>`
```typescript
type WithEmail = RequiredBy<{ name: string; email?: string }, 'email'>
// { name: string; email: string }
```

#### `Merge<T, U>`
Combines two types, with `U` overriding `T` on conflicts.
```typescript
type A = { id: number; createdAt: Date }
type B = { createdAt: string }
type Merged = Merge<A, B> // { id: number; createdAt: string }
```

---

### Deep types

```typescript
import { DeepMutable, DeepPartial, DeepReadonly, DeepRequired, Writable } from '@raicampos/toolkit';
```

| Type | Effect |
|------|--------|
| `DeepPartial<T>` | All properties optional, recursively |
| `DeepReadonly<T>` | All properties readonly, recursively |
| `DeepRequired<T>` | All properties required, recursively |
| `DeepMutable<T>` | Removes `readonly` recursively |
| `Writable<T>` | Removes `readonly` (shallow) |

---

### Object shape types

```typescript
import { Getters, KeysOfType, OmitByType, OmitNullableProperties, OptionalKeys, PickByType, RequiredKeys } from '@raicampos/toolkit';
```

```typescript
interface User { id: number; name: string; active: boolean; email?: string }

type NumKeys     = KeysOfType<User, number>   // 'id'
type OnlyNums    = PickByType<User, number>   // { id: number }
type NoNums      = OmitByType<User, number>   // { name: string; active: boolean; email?: string }
type Required    = RequiredKeys<User>         // 'id' | 'name' | 'active'
type Optional    = OptionalKeys<User>         // 'email'

type PersonAPI   = Getters<{ name: string; age: number }>
// { getName: () => string; getAge: () => number }
```

---

### Array types

```typescript
import { AtLeast, ElementOf, NonEmptyArray, Tuple } from '@raicampos/toolkit';
```

```typescript
type UserEl   = ElementOf<User[]>         // User
type Pair     = Tuple<string, 2>          // [string, string]
type OneOrMore = NonEmptyArray<number>    // [number, ...number[]]
type Min2     = AtLeast<number, 2>        // [number, number, ...number[]]
```

---

### Function types

```typescript
import { Arguments, AsyncFunction, FirstArgument, Promisify } from '@raicampos/toolkit';
```

```typescript
type Fn   = (id: string, n: number) => boolean
type Args = Arguments<Fn>        // [string, number]
type F1   = FirstArgument<Fn>    // string
type Async = AsyncFunction<Fn>   // (id: string, n: number) => Promise<boolean>
type P     = Promisify<Fn>       // (id: string, n: number) => Promise<boolean>
```

---

### Template literal types

```typescript
import { Join, PathOf, Split } from '@raicampos/toolkit';
```

```typescript
type Parts  = Split<'a.b.c', '.'>          // ['a', 'b', 'c']
type Joined = Join<['a', 'b', 'c'], '-'>   // 'a-b-c'

type Config = { server: { host: string; port: number }; db: { url: string } }
type Paths  = PathOf<Config>
// 'server' | 'db' | 'server.host' | 'server.port' | 'db.url'
```

---

### Union types

```typescript
import { UnionLast, UnionToIntersection, UnionToTuple } from '@raicampos/toolkit';
```

```typescript
type AB = UnionToIntersection<{ a: string } | { b: number }>
// { a: string } & { b: number }

type Tuple = UnionToTuple<'a' | 'b' | 'c'>
// ['a', 'b', 'c']
```

---

### Type intrinsics

```typescript
import { AssertEqual, IsAny, IsNever, IsUnknown } from '@raicampos/toolkit';
```

```typescript
type T1 = IsNever<never>    // true
type T2 = IsNever<string>   // false
type T3 = IsAny<any>        // true
type T4 = IsUnknown<unknown> // true

type T5 = AssertEqual<string, string> // true
type T6 = AssertEqual<string, number> // false
```

---

### JSON types

```typescript
import { JsonArray, JsonObject, JsonPrimitive, JsonValue, Jsonify } from '@raicampos/toolkit';
```

```typescript
const config: JsonObject = { host: 'localhost', port: 3000, tags: ['prod'] };

type Source     = { id: number; created: Date; fn: () => void }
type Serialized = Jsonify<Source>
// { id: number; created: string; fn: never }
```

---

### State types

#### `Result<T, E>`

Type-safe error handling without exceptions.

```typescript
import { err, ok, Result } from '@raicampos/toolkit';

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return err('Division by zero');
  return ok(a / b);
}

const result = divide(10, 2);
if (result.success) {
  console.log(result.data); // 5
} else {
  console.error(result.error);
}
```

#### `Option<T>`

Explicit optional value — clearer than `T | null | undefined`.

```typescript
import { none, Option, some } from '@raicampos/toolkit';

function findUser(id: string): Option<User> {
  const user = db.find(id);
  return user ? some(user) : none;
}

const result = findUser('1');
if (result.type === 'some') {
  console.log(result.value);
}
```

#### `AsyncState<T, E>`

Discriminated union for async operation state (loading / success / error).

```typescript
import { asyncError, asyncLoading, asyncSuccess, AsyncState } from '@raicampos/toolkit';

type UserState = AsyncState<User>;

function handleState(state: UserState) {
  switch (state.status) {
    case 'loading': return <Spinner />;
    case 'success': return <Profile user={state.data} />;
    case 'error':   return <Alert error={state.error} />;
  }
}

// Create states
const loading = asyncLoading();
const success = asyncSuccess(user);
const failure = asyncError(new Error('Not found'));
```

---

### Other type utilities

```typescript
import { literal, ObjectEntries, ObjectKeys, OmitNullableProperties, Prettify, Replace, RequireAtLeastOne, ValueOf } from '@raicampos/toolkit';
```

| Utility | Description |
|---------|-------------|
| `ValueOf<T>` | Union of all value types in `T` |
| `Replace<T, R>` | Replaces specific property types |
| `OmitNullableProperties<T>` | Removes properties that can be `null` |
| `Prettify<T>` | Flattens complex intersection types for readability |
| `RequireAtLeastOne<T>` | Requires at least one property to be present |
| `ObjectKeys(obj)` | Type-safe `Object.keys()` |
| `ObjectEntries(obj)` | Type-safe `Object.entries()` |
| `literal(value)` | Infers a string literal type instead of `string` |

---

## Entities

Domain entities with built-in validation.

### `CPF`

```typescript
import { CPF } from '@raicampos/toolkit';

const cpf = new CPF('123.456.789-09');

cpf.isValid  // true
cpf.value    // '123.456.789-09'  (formatted)
cpf.stripped // '12345678909'     (digits only)
cpf.masked   // '123.***.***-09'

CPF.check('12345678909')  // true
const random = CPF.random() // generates a valid CPF
```

### `CNPJ`

```typescript
import { CNPJ } from '@raicampos/toolkit';

const cnpj = new CNPJ('11.222.333/0001-81');

cnpj.isValid  // true
cnpj.value    // '11.222.333/0001-81'
cnpj.stripped // '11222333000181'
cnpj.masked   // '11.***.***//0001-81'

CNPJ.check('11222333000181') // true
const random = CNPJ.random()
```

### `Email`

Constructor throws for invalid values. Use `Email.check()` to validate without throwing.

```typescript
import { Email } from '@raicampos/toolkit';

const email = new Email('user@example.com'); // throws if invalid

email.value    // 'user@example.com'
email.username // 'user'
email.domain   // 'example.com'
email.isValid  // true

Email.check('user@example.com')           // true
Email.check('invalid')                    // false
Email.fromString('a@b.com;c@d.com')       // [Email, Email]
const random = Email.random()
```

### `Phone`

```typescript
import { Phone } from '@raicampos/toolkit';

const phone = new Phone('(11) 99876-5432');

phone.isValid  // true
phone.value    // '(11)99876-5432'
phone.stripped // '11998765432'

Phone.check('11998765432') // true
const random = Phone.random()
```

### `DateRange`

```typescript
import { DateRange } from '@raicampos/toolkit';

const range = new DateRange(new Date('2024-01-01'), new Date('2024-12-31'));
// throws RangeError if start > end

DateRange.fromString('2024-01-01', '2024-12-31') // DateRange
```

### `NumberRange`

```typescript
import { NumberRange } from '@raicampos/toolkit';

const range = new NumberRange(1, 100);
// throws Error if start > end

range.start // 1
range.end   // 100
```

---

## Builders

### `CompositeBuilder<T>`

Fluent builder for applying transformations to objects.

```typescript
import { CompositeBuilder } from '@raicampos/toolkit';

const builder = CompositeBuilder.new<User>()
  .add((u) => ({ ...u, email: u.email.toLowerCase() }))
  .add((u) => ({ ...u, isActive: true }));

const user = builder.build({ name: 'Ana', email: 'ANA@EXAMPLE.COM', isActive: false });
// { name: 'Ana', email: 'ana@example.com', isActive: true }
```

### `CompositeCriteria<T>` / `OrCriteria<T>`

Composite pattern for building complex filtering rules.

```typescript
import { CompositeCriteria, Criteria, OrCriteria } from '@raicampos/toolkit';

class AgeRule implements Criteria<User> {
  matching(users: User[]) { return users.filter((u) => u.age >= 18); }
}

class ActiveRule implements Criteria<User> {
  matching(users: User[]) { return users.filter((u) => u.isActive); }
}

// AND: must satisfy all criteria
const all = new CompositeCriteria<User>().add(new AgeRule()).add(new ActiveRule());

// OR: must satisfy at least one
const any = new OrCriteria(new AgeRule(), new ActiveRule());

const result = all.matching(users);
```

---

## Project Structure

```
src/
├── transforms/         # EmptyMaskToNull, EmptyValueToNull, FlagToBooleanTransform, ZeroIdToNull...
├── utils/
│   ├── array/          # chunk, compact, difference, first, flatten, groupBy, intersection, last, unique
│   ├── async/          # debounce, retryWithBackoff, sleep, throttle, timeout
│   ├── conditional/    # coalesce, nullIf, undefinedIf
│   ├── control-flow/   # assertNever, exhaustiveCheck
│   ├── functional/     # Either, isFlagged, mapOr, recent, SpecOf
│   ├── json/           # JSONConverter, JsonCompress
│   ├── number/         # MathUtils, numberParse, roundABNT
│   ├── object/         # clone, createFactory, deepMerge, mapValues, omitKeys, pickKeys, purgeNullishValues
│   ├── string/         # StringUtils
│   └── validation/     # isArray, isBoolean, isDate, isEmpty, isFunction, isNull, isNumber, isObject, isString…
├── types/
│   ├── async-state.ts      # AsyncState, asyncLoading, asyncSuccess, asyncError
│   ├── brand.ts            # Brand
│   ├── deep-mutable.ts     # DeepMutable
│   ├── deep-partial.ts     # DeepPartial
│   ├── deep-readonly.ts    # DeepReadonly
│   ├── deep-required.ts    # DeepRequired
│   ├── element-of.ts       # ElementOf
│   ├── function-types.ts   # Arguments, AsyncFunction, FirstArgument, Promisify
│   ├── intrinsic.ts        # AssertEqual, IsAny, IsNever, IsUnknown
│   ├── json.ts             # JsonPrimitive, JsonArray, JsonObject, JsonValue, Jsonify
│   ├── merge.ts            # Merge
│   ├── non-empty-array.ts  # NonEmptyArray, Tuple, AtLeast
│   ├── nullable.ts         # Nullable
│   ├── object-shape.ts     # Getters, RequiredKeys, OptionalKeys
│   ├── option.ts           # Option, Some, None, some, none
│   ├── partial-by.ts       # PartialBy, RequiredBy, ReadonlyBy
│   ├── pick-by-type.ts     # KeysOfType, PickByType, OmitByType
│   ├── result.ts           # Result, ok, err
│   ├── template-literal.ts # Split, Join, PathOf
│   ├── union.ts            # UnionToIntersection, UnionLast, UnionToTuple
│   └── writable.ts         # Writable
├── entities/           # CPF, CNPJ, Email, Phone, DateRange, NumberRange
└── builders/           # CompositeBuilder, CompositeCriteria, OrCriteria
```

---

## Testing

```bash
npm test             # run tests in watch mode
npm run coverage     # generate coverage report
npm run lint         # check code quality
npm run lint:fix     # auto-fix linting issues
npm run format       # format with Prettier
```

---

## License

MIT © raicampos
