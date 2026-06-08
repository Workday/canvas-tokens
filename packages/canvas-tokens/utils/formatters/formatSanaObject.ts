import {Dictionary, Formatter, TransformedToken, formatHelpers} from 'style-dictionary';
import {camelCase} from 'case-anything';
import {jsFileHeader} from './helpers/jsFileHeader';
import {getCSSVarName} from './helpers/cssVar';

type SanaTree = {[key: string]: string | SanaTree};

/**
 * Builds the `var(--cnvs-..., <sana-value>)` expression for a single token.
 * Inner double quotes (e.g. in font-family values) are escaped so the result
 * is a valid JS/TS string.
 */
const buildSanaValue = (token: TransformedToken): string => {
  const cssVarName = getCSSVarName(token.path);
  const fallback = String(token.value).replace(/"/g, '\\"');

  return `var(${cssVarName}, ${fallback})`;
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
  value: string
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
const buildSanaTree = (tokens: Dictionary['allTokens'], level: string): SanaTree => {
  const tree: SanaTree = {};

  for (const token of tokens) {
    setSanaProperty(tree, token.path.slice(1), level, buildSanaValue(token));
  }

  return tree;
};

/** Builds flat `{name, value}` entries for the `base` level. */
const getFlatSanaEntries = (tokens: Dictionary['allTokens']) =>
  tokens.map(token => ({name: token.name, value: buildSanaValue(token)}));

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

const renderFlatBody = (tokens: Dictionary['allTokens']) => {
  const entries = getFlatSanaEntries(tokens);

  return `{\n${entries.map(({name, value}) => `  ${name}: "${value}"`).join(',\n')}\n}`;
};

const renderSanaBody = (dictionary: Dictionary, level: string) => {
  if (!dictionary.allTokens.length) {
    return null;
  }

  if (level === 'brand' || level === 'sys') {
    return renderSanaTree(buildSanaTree(dictionary.allTokens, level));
  }

  return renderFlatBody(dictionary.allTokens);
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
