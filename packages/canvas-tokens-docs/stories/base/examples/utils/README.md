# Token Utilities

This directory contains shared utilities and types for building token examples in the base tokens documentation.

## Overview

The utilities in this directory help reduce code duplication and provide a consistent pattern for:
- Building token arrays from base token objects
- Converting between CSS units (rem, px)
- Extracting values from calc expressions
- Type definitions for different token categories

## Files

### `tokenTypes.ts`

Contains TypeScript interfaces for different token types:

- **`BaseToken`** - Base interface with `cssVar`, `jsVar`, and `value`
- **`SizeToken`** - Extends `BaseToken` with `calculatedValue` and `pxValue`
- **`OpacityToken`** - Extends `BaseToken` with `opacityValue`
- **`DeprecatedSizeToken`** - Extends `BaseToken` with `pxValue`
- **`SimpleBaseToken`** - Alias for `BaseToken` for clarity

### `tokenUtils.ts`

Contains utility functions and the main token builder:

#### `buildTokensFromBase<T>(base, config)`

The main utility function for building token arrays from the base token object.

**Parameters:**
- `base` - The base tokens object from `@workday/canvas-tokens-web`
- `config` - Configuration object with:
  - `keys: string[]` - Array of keys to extract (e.g., `['0', '25', '50']`)
  - `propertyPrefix: string` - Prefix for property names (e.g., `'size'`, `'opacity'`)
  - `jsPathPrefix: string` - Prefix for JS variable path (e.g., `'base.size'`, `'base.opacity'`)
  - `valueTransformer?: (value: string) => string` - Optional value transformation
  - `computeProperties?: (value: string, key: string) => Record<string, any>` - Optional function to compute additional properties

**Returns:** Array of tokens of type `T`

**Example:**
```ts
const sizeTokens: SizeToken[] = buildTokensFromBase<SizeToken>(base, {
  keys: ['0', '25', '50'],
  propertyPrefix: 'size',
  jsPathPrefix: 'base.size',
  computeProperties: (value) => {
    const remValue = extractRemValue(value);
    return {
      calculatedValue: `${remValue}rem`,
      pxValue: `${remValue * 16}px`,
    };
  },
});
```

#### `remToPx(value: string): string`

Converts a rem value to pixels (assumes 1rem = 16px).

**Example:**
```ts
remToPx("1.5rem") // returns "24px"
```

#### `extractRemValue(value: string): number`

Extracts the numeric rem value from a CSS value string. Handles both direct rem values and calc expressions.

**Example:**
```ts
extractRemValue("1.5rem") // returns 1.5
extractRemValue("calc(var(--cnvs-base-baseline) * 2.00)") // returns 1.0
```

#### `calculatePxValue(value: string): string`

Calculates the pixel value from a rem-based CSS value. Handles both direct rem values and calc expressions.

**Example:**
```ts
calculatePxValue("1.5rem") // returns "24px"
calculatePxValue("calc(var(--cnvs-base-baseline) * 2.00)") // returns "16px"
```

#### `calculateRemValue(value: string): string`

Calculates the rem value from a calc expression or direct rem value.

**Example:**
```ts
calculateRemValue("calc(var(--cnvs-base-baseline) * 2.00)") // returns "1rem"
calculateRemValue("1.5rem") // returns "1.5rem"
```

## Usage Pattern

The typical pattern for creating a new token example is:

1. **Define the keys** you want to display:
   ```ts
   const allowedKeys = ['0', '25', '50', '100'];
   ```

2. **Use `buildTokensFromBase`** to create the token array:
   ```ts
   const tokens = buildTokensFromBase<YourTokenType>(base, {
     keys: allowedKeys,
     propertyPrefix: 'yourPrefix',
     jsPathPrefix: 'base.yourPrefix',
     computeProperties: (value) => ({
       // Add any computed properties
     }),
   });
   ```

3. **Use the tokens** in your component:
   ```tsx
   <TokenGrid rows={tokens}>
     {token => (
       // Render token rows
     )}
   </TokenGrid>
   ```

## Benefits

- **DRY (Don't Repeat Yourself)**: Common patterns are extracted into reusable utilities
- **Type Safety**: Strong TypeScript typing ensures consistency
- **Maintainability**: Changes to token building logic only need to be made in one place
- **Documentation**: Clear JSDoc comments explain usage and behavior
- **Consistency**: All token examples follow the same pattern

