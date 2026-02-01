# @raicamposs/toolkit

> 🛠️ A comprehensive TypeScript utility library with type-safe helpers for modern development

[![npm version](https://img.shields.io/npm/v/@raicamposs/toolkit.svg)](https://www.npmjs.com/package/@raicamposs/toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)

## 📦 Installation

```bash
npm install @raicamposs/toolkit
```

## 🎯 Features

- ✅ **100% TypeScript** - Full type safety and IntelliSense support
- 🎨 **Clean Architecture** - Organized by responsibility and purpose
- 🧪 **Fully Tested** - Comprehensive test coverage with Vitest
- 📦 **Tree-shakeable** - Import only what you need
- 🚀 **Zero Dependencies** - Lightweight and fast
- 📚 **Well Documented** - Clear examples and API documentation

## 📖 Table of Contents

- [Async Utilities](#-async-utilities)
- [Functional Utilities](#-functional-utilities)
- [Validation Utilities](#-validation-utilities)
- [Object Utilities](#-object-utilities)
- [String Utilities](#-string-utilities)
- [Number Utilities](#-number-utilities)
- [JSON Utilities](#-json-utilities)
- [Conditional Utilities](#-conditional-utilities)
- [Type Utilities](#-type-utilities)
- [Builders](#-builders)
- [Entities](#-entities)

---

## ⏱️ Async Utilities

Utilities for asynchronous operations and timing control.

### `sleep(ms: number): Promise<void>`

Pauses execution for a specified duration.

```typescript
import { sleep } from '@raicamposs/toolkit';

await sleep(1000); // Wait 1 second
console.log('1 second later');
```

### `retryWithBackoff<T>(options): Promise<T>`

Retries a function with exponential backoff on failure.

```typescript
import { retryWithBackoff } from '@raicamposs/toolkit';

const result = await retryWithBackoff({
  fn: async () => fetchData(),
  maxRetries: 3,
  delay: 1000, // Initial delay in ms
});
```

**Parameters:**

- `fn: () => Promise<T>` - Async function to retry
- `maxRetries: number` - Maximum number of retry attempts
- `delay: number` - Initial delay between retries (doubles each retry)

---

## 🔧 Functional Utilities

Functional programming patterns and helpers.

### `Either<L, R>`

Type-safe error handling without exceptions.

```typescript
import { Either, Left, Right } from '@raicamposs/toolkit';

function divide(a: number, b: number): Either<string, number> {
  if (b === 0) {
    return new Left('Division by zero');
  }
  return new Right(a / b);
}

const result = divide(10, 2);
if (result.isRight()) {
  console.log(result.value); // 5
} else {
  console.error(result.value); // Error message
}
```

### `mapOr<I, O>(value, mapper, defaultValue): O | null`

Maps a value through a function, returning a default if null/undefined.

```typescript
import { mapOr } from '@raicamposs/toolkit';

const user = { name: 'John' };
const upperName = mapOr(user.name, (n) => n.toUpperCase(), 'UNKNOWN');
// Result: 'JOHN'

const noName = mapOr(null, (n) => n.toUpperCase(), 'UNKNOWN');
// Result: 'UNKNOWN'
```

### `mapAllOr<I, O>(array, mapper, defaultValue): O[]`

Maps all items in an array, returning default if array is null/undefined.

```typescript
import { mapAllOr } from '@raicamposs/toolkit';

const numbers = [1, 2, 3];
const doubled = mapAllOr(numbers, (n) => n * 2, []);
// Result: [2, 4, 6]
```

### `SpecOf<T>`

Predicate function type for composable specifications.

```typescript
import { SpecOf } from '@raicamposs/toolkit';

interface User {
  age: number;
  isPremium: boolean;
}

const isAdult: SpecOf<User> = (user) => user.age >= 18;
const isPremium: SpecOf<User> = (user) => user.isPremium;
```

### `and<T>(...specs): SpecOf<T>`

Combines multiple specs with AND logic - returns true only if all specs are satisfied.

```typescript
import { and, SpecOf } from '@raicamposs/toolkit';

const isAdult: SpecOf<User> = (user) => user.age >= 18;
const isPremium: SpecOf<User> = (user) => user.isPremium;

const isAdultPremium = and(isAdult, isPremium);

isAdultPremium({ age: 25, isPremium: true }); // true
isAdultPremium({ age: 25, isPremium: false }); // false
isAdultPremium({ age: 16, isPremium: true }); // false
```

### `or<T>(...specs): SpecOf<T>`

Combines multiple specs with OR logic - returns true if at least one spec is satisfied.

```typescript
import { or, SpecOf } from '@raicamposs/toolkit';

const isAdult: SpecOf<User> = (user) => user.age >= 18;
const isPremium: SpecOf<User> = (user) => user.isPremium;

const canAccess = or(isAdult, isPremium);

canAccess({ age: 16, isPremium: true }); // true
canAccess({ age: 25, isPremium: false }); // true
canAccess({ age: 16, isPremium: false }); // false
```

### `not<T>(spec): SpecOf<T>`

Negates a specification.

```typescript
import { not, SpecOf } from '@raicamposs/toolkit';

const isAdult: SpecOf<User> = (user) => user.age >= 18;
const isMinor = not(isAdult);

isMinor({ age: 16 }); // true
isMinor({ age: 25 }); // false
```

**Complex Composition Example:**

```typescript
import { and, or, not, SpecOf } from '@raicamposs/toolkit';

interface User {
  age: number;
  isPremium: boolean;
  isActive: boolean;
}

const isAdult: SpecOf<User> = (user) => user.age >= 18;
const isPremium: SpecOf<User> = (user) => user.isPremium;
const isActive: SpecOf<User> = (user) => user.isActive;

// Complex rule: (isAdult AND isPremium) OR (NOT isActive)
const complexRule = or(and(isAdult, isPremium), not(isActive));

const users = [
  { age: 25, isPremium: true, isActive: true }, // true (adult + premium)
  { age: 16, isPremium: false, isActive: false }, // true (not active)
  { age: 25, isPremium: false, isActive: true }, // false
];

const filtered = users.filter(complexRule);
```

### `isFlagged<T>(key): SpecOf<T>`

Creates a predicate that checks if a boolean property is true.

```typescript
import { isFlagged } from '@raicamposs/toolkit';

interface User {
  isActive: boolean;
  isPremium: boolean;
}

const isActiveUser = isFlagged<User>('isActive');
const isPremiumUser = isFlagged<User>('isPremium');

const users = [
  { isActive: true, isPremium: false },
  { isActive: false, isPremium: true },
  { isActive: true, isPremium: true },
];

const activeUsers = users.filter(isActiveUser);
// Result: [{ isActive: true, isPremium: false }, { isActive: true, isPremium: true }]
```

### `recent<T, K>(config): SpecOf<T>`

Creates a specification that checks if a date property is within a specified time window.

```typescript
import { recent } from '@raicamposs/toolkit';

interface User {
  id: number;
  name: string;
  createdAt: Date;
  lastLoginAt: Date;
}

// Check if user was created within last 5 minutes
const isRecentlyCreated = recent<User, 'createdAt'>({
  key: 'createdAt',
  minutes: 5,
});

// Check if user logged in within last 30 minutes
const isRecentlyActive = recent<User, 'lastLoginAt'>({
  key: 'lastLoginAt',
  minutes: 30,
});

const user = {
  id: 1,
  name: 'John',
  createdAt: new Date(),
  lastLoginAt: new Date(),
};

isRecentlyCreated(user); // true
isRecentlyActive(user); // true

// Use with filter
const users = [
  /* ... */
];
const recentUsers = users.filter(isRecentlyCreated);
```

**Constants:**

- `MS_PER_MINUTE` - Milliseconds per minute (60,000)

---

## ✅ Validation Utilities

Type checking and validation helpers.

### `isAssigned<T>(value: T): boolean`

Checks if a value is not null or undefined.

```typescript
import { isAssigned } from '@raicamposs/toolkit';

isAssigned(0); // true
isAssigned(''); // true
isAssigned(false); // true
isAssigned(null); // false
isAssigned(undefined); // false
```

### `isNull(value: unknown): boolean`

Checks if a value is strictly null.

```typescript
import { isNull } from '@raicamposs/toolkit';

isNull(null); // true
isNull(undefined); // false
isNull(0); // false
```

### `isUndefined(value: unknown): boolean`

Checks if a value is strictly undefined.

```typescript
import { isUndefined } from '@raicamposs/toolkit';

isUndefined(undefined); // true
isUndefined(null); // false
```

### `isNullOrUndefined(value: unknown): boolean`

Checks if a value is null or undefined.

```typescript
import { isNullOrUndefined } from '@raicamposs/toolkit';

isNullOrUndefined(null); // true
isNullOrUndefined(undefined); // true
isNullOrUndefined(0); // false
```

### `isEmpty(value: unknown): boolean`

Checks if a value is empty (null, undefined, empty string, or empty array).

```typescript
import { isEmpty } from '@raicamposs/toolkit';

isEmpty(''); // true
isEmpty([]); // true
isEmpty(null); // true
isEmpty('hello'); // false
isEmpty([1, 2, 3]); // false
```

---

## 📦 Object Utilities

Object manipulation and transformation helpers.

### `clone<T>(obj: T): T`

Deep clones an object.

```typescript
import { clone } from '@raicamposs/toolkit';

const original = { name: 'John', address: { city: 'NYC' } };
const copy = clone(original);

copy.address.city = 'LA';
console.log(original.address.city); // 'NYC' (unchanged)
```

### `pickKeys<T, K>(obj: T, ...keys: K[]): Partial<T>`

Creates a new object with only specified keys.

```typescript
import { pickKeys } from '@raicamposs/toolkit';

const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
const publicData = pickKeys(user, 'id', 'name');
// Result: { id: 1, name: 'John' }
```

### `withoutKey<T, K>(obj: T, ...keys: K[]): Omit<T, K>`

Creates a new object excluding specified keys.

```typescript
import { withoutKey } from '@raicamposs/toolkit';

const user = { id: 1, name: 'John', password: 'secret' };
const safeUser = withoutKey(user, 'password');
// Result: { id: 1, name: 'John' }
```

### `purgeNullishValues(obj: any): any`

Recursively removes null and undefined values from objects and arrays.

```typescript
import { purgeNullishValues } from '@raicamposs/toolkit';

const data = {
  name: 'John',
  age: null,
  address: {
    city: 'NYC',
    zip: undefined,
  },
};

const cleaned = purgeNullishValues(data);
// Result: { name: 'John', address: { city: 'NYC' } }
```

### `hasOnlyUnassignedProperties(obj: unknown): boolean`

Checks if an object has only unassigned (null or undefined) properties.

```typescript
import { hasOnlyUnassignedProperties } from '@raicamposs/toolkit';

hasOnlyUnassignedProperties({ name: 'John', age: 30 }); // false
hasOnlyUnassignedProperties({ name: 'John', age: null }); // false
hasOnlyUnassignedProperties({ name: null, age: null }); // true
hasOnlyUnassignedProperties({}); // true
```

### `hasSomePropertyAssigned(obj: unknown): boolean`

Checks if an object has some assigned properties.

```typescript
import { hasSomePropertyAssigned } from '@raicamposs/toolkit';

hasSomePropertyAssigned({ name: 'John', age: null }); // true
hasSomePropertyAssigned({ name: null, age: null }); // false
```

---

## 🔤 String Utilities

String transformation and manipulation utilities.

### `StringUtils.toSnakeCase(str: string): string`

Converts a string to snake_case.

```typescript
import { StringUtils } from '@raicamposs/toolkit';

StringUtils.toSnakeCase('helloWorld'); // 'hello_world'
StringUtils.toSnakeCase('HelloWorld'); // 'hello_world'
StringUtils.toSnakeCase('hello-world'); // 'hello_world'
```

### `StringUtils.toKebabCase(str: string): string`

Converts a string to kebab-case.

```typescript
import { StringUtils } from '@raicamposs/toolkit';

StringUtils.toKebabCase('helloWorld'); // 'hello-world'
StringUtils.toKebabCase('HelloWorld'); // 'hello-world'
```

### `StringUtils.toCamelCase(str: string): string`

Converts a string to camelCase.

```typescript
import { StringUtils } from '@raicamposs/toolkit';

StringUtils.toCamelCase('hello_world'); // 'helloWorld'
StringUtils.toCamelCase('hello-world'); // 'helloWorld'
```

### `StringUtils.toTitleCase(str: string): string`

Converts a string to Title Case.

```typescript
import { StringUtils } from '@raicamposs/toolkit';

StringUtils.toTitleCase('hello world'); // 'Hello World'
StringUtils.toTitleCase('HELLO WORLD'); // 'Hello World'
```

### `StringUtils.slugify(text: string, separator?: string): string`

Creates a URL-friendly slug from text.

```typescript
import { StringUtils } from '@raicamposs/toolkit';

StringUtils.slugify('Hello World!'); // 'hello-world'
StringUtils.slugify('Café au Lait'); // 'cafe-au-lait'
StringUtils.slugify('Hello World', '_'); // 'hello_world'
```

### `StringUtils.removeAccents(text: string): string`

Removes accents from characters.

```typescript
import { StringUtils } from '@raicamposs/toolkit';

StringUtils.removeAccents('Olá, José!'); // 'Ola, Jose!'
StringUtils.removeAccents('Café'); // 'Cafe'
```

---

## 🔢 Number Utilities

Number formatting and rounding utilities.

### `roundABNT(value: number | string, fractionDigits?: number): number`

Rounds numbers following ABNT (Brazilian) standards.

```typescript
import { roundABNT } from '@raicamposs/toolkit';

roundABNT(1.335, 2); // 1.34 (rounds up when last digit is 5 followed by non-zero)
roundABNT(1.345, 2); // 1.34 (rounds to nearest even when 5 followed by zeros)
roundABNT(1.666, 2); // 1.67
```

**ABNT Rounding Rules:**

- If digit after last kept digit is < 5: keep unchanged
- If digit is > 5 or = 5 followed by non-zero: round up
- If digit is = 5 followed by zeros: round to nearest even

---

## 📄 JSON Utilities

Safe JSON parsing and stringification.

### `JSONConverter.stringify(obj: any): string | null`

Safely converts an object to JSON string.

```typescript
import { JSONConverter } from '@raicamposs/toolkit';

JSONConverter.stringify({ name: 'John' }); // '{"name":"John"}'
JSONConverter.stringify(null); // null
JSONConverter.stringify(undefined); // null
```

### `JSONConverter.parse(json: string | null): object | undefined`

Safely parses JSON string.

```typescript
import { JSONConverter } from '@raicamposs/toolkit';

JSONConverter.parse('{"name":"John"}'); // { name: 'John' }
JSONConverter.parse('invalid json'); // undefined
JSONConverter.parse(null); // undefined
JSONConverter.parse(''); // undefined
```

### `JSONConverter.parseWithDefault(json: string | null, defaultValue?: any): any`

Parses JSON with a fallback default value.

```typescript
import { JSONConverter } from '@raicamposs/toolkit';

JSONConverter.parseWithDefault('{"name":"John"}', {}); // { name: 'John' }
JSONConverter.parseWithDefault('invalid', { name: 'Default' }); // { name: 'Default' }
JSONConverter.parseWithDefault(null, []); // []
```

---

## 🔀 Conditional Utilities

Conditional value helpers and null coalescing.

### `coalesce<T>(...values: T[]): T | undefined`

Returns the first non-null, non-undefined value.

```typescript
import { coalesce } from '@raicamposs/toolkit';

coalesce(null, undefined, 'hello', 'world'); // 'hello'
coalesce(null, undefined); // undefined
coalesce(0, null, 5); // 0 (0 is valid)
```

### `nullIf<T>(value: T, condition: boolean): T | null`

Returns null if condition is true, otherwise returns the value.

```typescript
import { nullIf } from '@raicamposs/toolkit';

nullIf('hello', true); // null
nullIf('hello', false); // 'hello'
nullIf(42, 42 === 0); // 42
```

### `undefinedIf<T>(value: T, condition: boolean): T | undefined`

Returns undefined if condition is true, otherwise returns the value.

```typescript
import { undefinedIf } from '@raicamposs/toolkit';

undefinedIf('hello', true); // undefined
undefinedIf('hello', false); // 'hello'
```

---

## 🎨 Type Utilities

TypeScript type helpers for better type safety.

### `Nullable<T>`

Represents a value that can be null or undefined.

```typescript
import { Nullable } from '@raicamposs/toolkit';

const name: Nullable<string> = null; // OK
const age: Nullable<number> = undefined; // OK
const active: Nullable<boolean> = true; // OK
```

### `Optional<T, K>`

Makes specific properties of a type optional.

```typescript
import { Optional } from '@raicamposs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
}

type UserWithOptionalEmail = Optional<User, 'email'>;
// { id: number; name: string; email?: string; }
```

### `RequireAtLeastOne<T>`

Requires at least one property from a type to be defined.

```typescript
import { RequireAtLeastOne } from '@raicamposs/toolkit';

interface Contact {
  email: string;
  phone: string;
}

type ContactMethod = RequireAtLeastOne<Contact>;
// Must have at least email OR phone (or both)

const valid: ContactMethod = { email: 'test@example.com' }; // OK
const invalid: ContactMethod = {}; // Error
```

### Other Type Utilities

- `ValueOf<T>` - Extracts value types from an object
- `Replace<T, R>` - Replaces properties in a type with new ones
- `OmitNullableProperties<T>` - Removes nullable properties from a type
- `Prettify<T>` - Simplifies complex types for better readability
- `ObjectKeys<T>` - Type-safe Object.keys() with proper typing
- `ObjectEntries<T>` - Type-safe Object.entries() with proper typing
- `literal<T>(value)` - Creates literal types from string values

---

## 🏗️ Builders

Builder patterns for constructing complex objects.

### `CompositeBuilder<T>`

Fluent builder for applying transformations to objects.

```typescript
import { CompositeBuilder } from '@raicamposs/toolkit';

interface User {
  name: string;
  email: string;
  isActive: boolean;
}

const builder = CompositeBuilder.new<User>()
  .add((user) => ({ ...user, email: user.email.toLowerCase() }))
  .add((user) => ({ ...user, isActive: true }));

const user = builder.build({
  name: 'John',
  email: 'JOHN@EXAMPLE.COM',
  isActive: false,
});
// Result: { name: 'John', email: 'john@example.com', isActive: true }
```

### `CompositeCriteria<T>` & `OrCriteria<T>`

Composite pattern for building complex filtering logic.

```typescript
import { CompositeCriteria, OrCriteria, Criteria } from '@raicamposs/toolkit';

class AgeCriteria implements Criteria<User> {
  matching(users: User[]): User[] {
    return users.filter((u) => u.age >= 18);
  }
}

class ActiveCriteria implements Criteria<User> {
  matching(users: User[]): User[] {
    return users.filter((u) => u.isActive);
  }
}

// AND logic
const composite = new CompositeCriteria<User>().add(new AgeCriteria()).add(new ActiveCriteria());

const filtered = composite.matching(users);

// OR logic
const orCriteria = new OrCriteria(new AgeCriteria(), new ActiveCriteria());
```

---

## 🎯 Entities

Domain entities with built-in validation.

### `CPF`

Brazilian CPF (Cadastro de Pessoas Físicas) validation and formatting.

```typescript
import { CPF } from '@raicamposs/toolkit';

const cpf = CPF.create('12345678909');
if (cpf.isRight()) {
  console.log(cpf.value.format()); // '123.456.789-09'
  console.log(cpf.value.toString()); // '12345678909'
}
```

### `CNPJ`

Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica) validation and formatting.

```typescript
import { CNPJ } from '@raicamposs/toolkit';

const cnpj = CNPJ.create('12345678000195');
if (cnpj.isRight()) {
  console.log(cnpj.value.format()); // '12.345.678/0001-95'
  console.log(cnpj.value.toString()); // '12345678000195'
}
```

### `Email`

Email validation entity.

```typescript
import { Email } from '@raicamposs/toolkit';

const email = Email.create('user@example.com');
if (email.isRight()) {
  console.log(email.value.toString()); // 'user@example.com'
}
```

### `Phone`

Brazilian phone number validation and formatting.

```typescript
import { Phone } from '@raicamposs/toolkit';

const phone = Phone.create('11987654321');
if (phone.isRight()) {
  console.log(phone.value.format()); // '(11) 98765-4321'
  console.log(phone.value.toString()); // '11987654321'
}
```

---

## 📁 Project Structure

The toolkit is organized following Clean Architecture principles:

```
src/
├── utils/
│   ├── async/           # Async operations (sleep, retry)
│   ├── conditional/     # Conditional helpers (coalesce, nullIf)
│   ├── functional/      # Functional patterns (Either, mapOr)
│   ├── json/            # JSON utilities (JSONConverter)
│   ├── number/          # Number utilities (roundABNT)
│   ├── object/          # Object manipulation (clone, pick, purge)
│   ├── string/          # String transformations (StringUtils)
│   └── validation/      # Type checking (isNull, isEmpty)
├── types/               # TypeScript type utilities
├── entities/            # Domain entities
└── builders/            # Builder patterns
```

---

## 🧪 Testing

Run tests with coverage:

```bash
npm test              # Run tests in watch mode
npm run coverage      # Generate coverage report
npm run lint          # Check code quality
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

---

## 📝 License

MIT © [raicamposs]

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📮 Support

For issues and questions, please open an issue on [GitHub](https://github.com/raicamposs/toolkit).
