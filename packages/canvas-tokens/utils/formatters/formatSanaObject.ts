import {Dictionary, Formatter, TransformedToken, formatHelpers} from 'style-dictionary';
import {camelCase} from 'case-anything';
import {jsFileHeader} from './helpers/jsFileHeader';
import {getCSSVarName} from './helpers/cssVar';

type SanaTree = {[key: string]: string | SanaTree};

const REFERENCE_RE = /^\s*\{([^}]+)\}\s*$/;

const escapeFallback = (value: unknown): string => String(value).replace(/"/g, '\\"');

const buildVarExpression = (cssVarName: string, fallback: unknown) =>
  `var(--${cssVarName}, ${escapeFallback(fallback)})`;

/** Converts a token path reference (e.g. `{sys.type.x}` or `sys.type.x`) to its CSS var name. */
const refToCSSVarName = (ref: string): string =>
  getCSSVarName(ref.replace(/^\{|\}$/g, '').split('.'));

/**
 * Builds a `var(...)` expression honoring an optional authored `fallback`:
 *  - `fallback` is a non-empty string: nest an extra `var()` pointing at the
 *    referenced token, keeping `rawValue` as the deepest fallback
 *    (e.g. `var(--cnvs-self, var(--cnvs-fallback-ref, <raw>))`).
 *  - `fallback` is an empty string: omit the fallback entirely (`var(--cnvs-self)`).
 *  - no `fallback` (undefined): keep the previous strategy (`var(--cnvs-self, <raw>)`).
 */
const buildVarWithFallback = (
  cssVarName: string,
  fallback: unknown,
  rawValue: unknown
): string => {
  if (typeof fallback === 'string') {
    if (fallback.length === 0) {
      return `var(--${cssVarName})`;
    }

    return `var(--${cssVarName}, ${buildVarExpression(refToCSSVarName(fallback), rawValue)})`;
  }

  return buildVarExpression(cssVarName, rawValue);
};

/** Builds the `var(...)` expression for a regular (non-composite) token from its own `fallback`. */
const buildVarExpressionWithFallback = (token: TransformedToken): string =>
  buildVarWithFallback(getCSSVarName(token.path), token.original?.fallback, token.value);

/**
 * Typography tokens are composite (object) values. They cannot be expressed
 * as a single CSS variable, so we expand them into a nested object whose
 * leaves point at the inner referenced tokens (e.g. `fontFamily` →
 * `var(--cnvs-sys-font-family-default, "Sana Sans")`). Each leaf honors the
 * referenced token's authored `fallback` property the same way regular tokens
 * do, falling back to the resolved value so the declarations stay usable even
 * when no CSS theme is loaded.
 */
const buildTypographyValue = (
  token: TransformedToken,
  getRefs: Dictionary['getReferences']
): SanaTree => {
  const original = token.original?.value as Record<string, unknown> | undefined;
  const resolved = (token.value ?? {}) as Record<string, unknown>;
  const tree: SanaTree = {};

  if (!original || typeof original !== 'object') return tree;

  for (const key of Object.keys(original)) {
    const ref = original[key];
    const normalizedKey = camelCase(key);
    const resolvedLeaf = resolved[key] ?? resolved[normalizedKey];

    if (typeof ref === 'string') {
      const match = ref.match(REFERENCE_RE);
      if (match) {
        const refPath = match[1].split('.');
        const [referenced] = getRefs(ref);
        tree[normalizedKey] = buildVarWithFallback(
          getCSSVarName(refPath),
          referenced?.original?.fallback,
          resolvedLeaf
        );
        continue;
      }
    }

    tree[normalizedKey] = escapeFallback(resolvedLeaf ?? ref);
  }

  return tree;
};

/**
 * Builds the `var(--cnvs-..., <sana-value>)` expression for a single token.
 * Inner double quotes (e.g. in font-family values) are escaped so the result
 * is a valid JS/TS string. Typography tokens return a nested object (one
 * entry per sub-property) instead of a flat string.
 */
const buildSanaValue = (
  token: TransformedToken,
  getRefs: Dictionary['getReferences']
): string | SanaTree => {
  if (token.type === 'typography') {
    return buildTypographyValue(token, getRefs);
  }

  return buildVarExpressionWithFallback(token);
};

/**
 * Recursively places a token's sana value into the tree. Mirrors the structure
 * used by `formattedObjectInnerValues` / brand & sys index files:
 *  - sys: always nested objects (e.g. `breakpoints.xxl`)
 *  - brand: numeric / alpha-numeric leaves are flattened onto the parent
 *    (e.g. `primary.A300` → `primaryA300`); other leaves stay nested.
 */
const setSanaProperty = (
  output: SanaTree,
  path: string[],
  level: string,
  value: string | SanaTree
): void => {
  const [head, ...rest] = path;

  if (level !== 'sys' && rest.length === 1 && /^(\d|[Aa]\d)/.test(rest[0])) {
    output[camelCase(head) + rest[0]] = value;
    return;
  }

  if (rest.length === 0) {
    output[camelCase(head)] = value;
    return;
  }

  const key = camelCase(head);
  const existing = output[key];
  const next: SanaTree =
    existing && typeof existing === 'object' ? existing : ((output[key] = {}), output[key] as SanaTree);

  setSanaProperty(next, rest, level, value);
};

/** Builds the full sana tree for `brand` / `sys` levels. */
const buildSanaTree = (
  tokens: Dictionary['allTokens'],
  level: string,
  getRefs: Dictionary['getReferences']
): SanaTree => {
  const tree: SanaTree = {};

  for (const token of tokens) {
    setSanaProperty(tree, token.path.slice(1), level, buildSanaValue(token, getRefs));
  }

  return tree;
};

/** Builds flat `{name, value}` entries for the `base` level. */
const getFlatSanaEntries = (
  tokens: Dictionary['allTokens'],
  getRefs: Dictionary['getReferences']
) =>
  tokens.map(token => {
    const value = buildSanaValue(token, getRefs);
    return {
      name: token.name,
      // Typography tokens (composite objects) are not expected at the `base`
      // level, but if encountered fall back to a single var() to keep the
      // flat shape valid.
      value:
        typeof value === 'string'
          ? value
          : buildVarExpression(getCSSVarName(token.path), token.value),
    };
  });

const VALID_IDENTIFIER = /^[A-Za-z_$][\w$]*$/;
const formatKey = (key: string) => (VALID_IDENTIFIER.test(key) ? key : JSON.stringify(key));

/** Renders a sana tree as a JS/TS object literal with literal-string leaves. */
const renderSanaTree = (tree: SanaTree, depth = 1): string => {
  const indent = '  '.repeat(depth);
  const closeIndent = '  '.repeat(depth - 1);

  const lines = Object.entries(tree).map(([key, value]) => {
    const renderedValue =
      typeof value === 'string' ? `"${value}"` : renderSanaTree(value, depth + 1);

    return `${indent}${formatKey(key)}: ${renderedValue}`;
  });

  return `{\n${lines.join(',\n')}\n${closeIndent}}`;
};

const renderFlatBody = (
  tokens: Dictionary['allTokens'],
  getRefs: Dictionary['getReferences']
) => {
  const entries = getFlatSanaEntries(tokens, getRefs);

  return `{\n${entries.map(({name, value}) => `  ${name}: "${value}"`).join(',\n')}\n}`;
};

const renderSanaBody = (dictionary: Dictionary, level: string) => {
  if (!dictionary.allTokens.length) {
    return null;
  }

  const getRefs: Dictionary['getReferences'] = value => dictionary.getReferences(value);

  if (level === 'brand' || level === 'sys') {
    return renderSanaTree(buildSanaTree(dictionary.allTokens, level, getRefs));
  }

  return renderFlatBody(dictionary.allTokens, getRefs);
};

/**
 * Style Dictionary format function that creates a common-js file structure
 * with a single `sana` object containing all tokens defined in `theme/sana.json`.
 * The shape of the object matches the level: flat for `base`, mixed flat/nested
 * for `brand`, and fully nested for `sys`.
 * @returns file content as a string
 */
export const formatSanaObjectCommonJS: Formatter = ({dictionary, file, options}) => {
  const headerContent = !options.withoutModule
    ? jsFileHeader({file})
    : formatHelpers.fileHeader({file});

  const body = renderSanaBody(dictionary, options.level as string);

  return body == null ? headerContent : `${headerContent}exports.sana = ${body};\n`;
};

/**
 * Style Dictionary format function that creates an es6 file structure
 * with a single `sana` object containing all tokens defined in `theme/sana.json`.
 * The shape of the object matches the level: flat for `base`, mixed flat/nested
 * for `brand`, and fully nested for `sys`.
 * @returns file content as a string
 */
export const formatSanaObjectES6: Formatter = ({dictionary, file, options}) => {
  const headerContent = formatHelpers.fileHeader({file});

  const body = renderSanaBody(dictionary, options.level as string);

  return body == null ? headerContent : `${headerContent}export const sana = ${body};\n`;
};

/**
 * Style Dictionary format function that creates a TypeScript declaration file
 * with a single `sana` object containing all tokens defined in `theme/sana.json`.
 * Each leaf is typed as a literal CSS-variable string.
 * @returns file content as a string
 */
export const formatSanaObjectTypes: Formatter = ({dictionary, file, options}) => {
  const headerContent = formatHelpers.fileHeader({file});

  const body = renderSanaBody(dictionary, options.level as string);

  return body == null ? headerContent : `${headerContent}export declare const sana: ${body};\n`;
};
