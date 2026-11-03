import {Dictionary, File, TransformedToken, TransformedTokens} from 'style-dictionary/types';
import {fileHeader, getReferences, resolveReferences} from 'style-dictionary/utils';
import {camelCase} from 'case-anything';

import {isInlineTokenFile, joinParts, SyntaxStyle} from '../../utils';

type Format = {
  dictionary: Dictionary;
  file: File;
  options: {
    includeJsDocs?: boolean;
    prefix?: string;
    style?: 'inline' | 'module';
    syntaxStyle?: SyntaxStyle;
  };
};

/**
 * SD Format for generating JS tokens based on the provided token dictionary and options
 */
export const generateJsTokens = async ({dictionary, file, options}: Format) => {
  const {style = 'module', includeJsDocs = false, prefix, syntaxStyle} = options;
  const header = await fileHeader({file});

  const treeOptions = {
    includeJsDocs,
    prefix,
    syntaxStyle,
    fileName: file?.destination,
    tokens: dictionary.unfilteredTokens,
  };

  return (
    header +
    (style === 'inline'
      ? generateInlineTokens(dictionary.allTokens, treeOptions)
      : generateTree(dictionary.tokens, treeOptions))
  );
};

type Options = {
  includeJsDocs: boolean;
  prefix?: string;
  syntaxStyle?: SyntaxStyle;
  fileName?: string;
  /** All tokens, used to resolve references in theme and mode values */
  tokens?: TransformedTokens;
};

/**
 * Generate inline JS tokens from the provided token list
 */
const generateInlineTokens = (tokens: TransformedToken[], options: Options): string => {
  const {includeJsDocs, prefix, syntaxStyle} = options;

  return tokens
    .map(token => {
      const jsDoc = includeJsDocs ? getJsDoc(token, options) : '';
      return jsDoc + wrapExport(token.name, `"${toCSSVarName(token, prefix)}";`, syntaxStyle);
    })
    .join('\n');
};

/** Composite tokens (typography) have an object of references to other tokens as value */
const isComposite = (token: TransformedToken) => token.$type === 'typography';

const SANA_EXTENSION = 'sana.canvas.tokens';

/** Get the resolved value of the Canvas theme, if the token defines one */
const getCanvasValue = (token: TransformedToken, tokens?: TransformedTokens) => {
  const canvas = token.original.$extensions?.[SANA_EXTENSION]?.themes?.canvas;
  const value = canvas?.light?.$value ?? canvas?.$value;

  // An empty theme value means the default value is used, same as in the CSS
  if (!value) return undefined;
  if (typeof value !== 'string' || !tokens) return value;

  // A value that is a single reference resolves to the referenced token
  const resolved: any = resolveReferences(value, tokens);
  return resolved?.$value ?? resolved;
};

/** Get the JS access path (`brand.primary100`) of a token, as exported from the package index */
const getJsPath = (token: TransformedToken): string => {
  const level = token.filePath.split('/')[3];
  if (isInlineTokenFile(token.filePath)) return `${level}.${token.name}`;

  // Brand files skip their `brand` root, color files keep their `color` root
  const path = /(^|\/)brand\//.test(token.filePath) ? token.path.slice(1) : token.path;
  return [level, ...path.map(key => camelCase(key))].join('.');
};

/**
 * Get the dark mode value of a token, as a JS access path when it is a reference.
 * References to the base dark palette are skipped as it is not exported
 */
const getDarkValue = (token: TransformedToken, tokens?: TransformedTokens) => {
  const value = token.original.$extensions?.[SANA_EXTENSION]?.modes?.dark?.$value;
  if (typeof value !== 'string') return undefined;

  const [reference] = tokens ? getReferences(value, tokens) : [];
  if (reference?.path[0] === 'dark') return undefined;

  return reference ? getJsPath(reference) : value;
};

/**
 * Build a JS Doc block for a token: its description, raw value, Sana and dark values
 * and deprecation flag. When the token has a Canvas theme value, that is the raw value
 * and the default value is the Sana one.
 * Uses the single-line form when there is only one line to show.
 */
const getJsDoc = (token: TransformedToken, options: Options, tabs = ''): string => {
  const canvasValue = getCanvasValue(token, options.tokens);
  const darkValue = getDarkValue(token, options.tokens);
  const rawValue = canvasValue ?? JSON.stringify(token.$value);
  const lines = [
    token.comment ?? token.$description,
    !isComposite(token) && `Root Raw Value: \`${rawValue}\``,
    canvasValue !== undefined && `Sana Value: \`${token.$value}\``,
    darkValue && `Dark Value: \`${darkValue}\``,
    token.$deprecated && '@deprecated',
  ].filter(Boolean);

  if (!lines.length) return '';

  return lines.length === 1
    ? `${tabs}/** ${lines[0]} */\n`
    : `${tabs}/**\n${lines.map(line => `${tabs} * ${line}\n`).join('')}${tabs} */\n`;
};

// Utility functions for generating CSS variable names from token keys and file paths

/**
 * Turn a token key into a kebab-case CSS name part.
 * Same as the CSS name transform: digits stay attached to the preceding word (`a25`, not `a-25`)
 */
const normalizeKey = (key: string) =>
  key
    .replace('$root', 'default')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

/**
 * Get the CSS variable level segment (`sys`, `base-palette`, ...) from a token's source file path.
 * Brand tokens have no level.
 */
const getTokenLevel = (filePath: string): string => {
  if (filePath.includes('palette')) return 'base-palette';
  const level = filePath.split('/')[3];
  if (level === 'brand') return '';
  return level === 'system' ? 'sys' : level;
};

/** Build the CSS variable name (`--cnvs-sys-...`) a token resolves to */
const toCSSVarName = (token: TransformedToken, prefix?: string) =>
  token.key ? `--${joinParts(prefix, getTokenLevel(token.filePath), normalizeKey(token.key))}` : '';

/** Whether a file nests its tokens in a single wrapper root (`color`, `brand`) */
const hasWrapperRoot = (file: string) => /(^|\/)(color|brand)\//.test(file);

/**
 * Generate an object tree of JS tokens from the provided token list
 * with appropriate JS Doc comments
 * */
const generateTree = (tokens: TransformedTokens, options: Options): string => {
  // Color and brand files wrap everything in a single root object (`color`, `brand`), which is
  // skipped so that files sharing a root don't export the same name from the level index
  const roots: TransformedTokens = hasWrapperRoot(options.fileName ?? '')
    ? tokens[Object.keys(tokens)[0]]
    : tokens;

  return Object.keys(roots)
    .map(name =>
      wrapExport(
        camelCase(name),
        `{\n${getTokensTextRecursively(roots[name], options)}\n};`,
        options.syntaxStyle
      )
    )
    .join('\n\n');
};

/**
 * Render the properties of a composite token, each as the CSS var of the token it references
 * and documented with its JS access path
 */
const getCompositeProps = (token: TransformedToken, options: Options, depth: number): string => {
  const {includeJsDocs, prefix, tokens} = options;
  const tabs = '  '.repeat(depth);
  const values = token.original.$value as Record<string, string>;

  return Object.entries(values)
    .map(([prop, value]) => {
      const [reference] = tokens ? getReferences(value, tokens) : [];
      const jsDoc = includeJsDocs && reference ? `${tabs}/** \`${getJsPath(reference)}\` */\n` : '';
      const cssVar = reference ? toCSSVarName(reference, prefix) : value;

      return `${jsDoc}${tabs}${prop}: "${cssVar}",`;
    })
    .join('\n');
};

/**
 * Recursively render a token group as object properties, one nesting level per depth.
 * Leaf tokens become `key: "--css-var",` preceded by their JS Doc when enabled.
 */
const getTokensTextRecursively = (
  tokens: TransformedTokens | TransformedToken,
  options: Options,
  depth = 1
): string => {
  const tabs = '  '.repeat(depth);

  return Object.keys(tokens)
    .map(key => {
      const value = (tokens as TransformedTokens)[key];
      const name = camelCase(key);

      if (typeof value === 'object' && value !== null && '$value' in value) {
        const token = value as TransformedToken;
        const jsDoc = options.includeJsDocs ? getJsDoc(token, options, tabs) : '';

        if (isComposite(token)) {
          const props = getCompositeProps(token, options, depth + 1);
          return `${jsDoc}${tabs}${name}: {\n${props}\n${tabs}},`;
        }

        return `${jsDoc}${tabs}${name}: "${toCSSVarName(token, options.prefix)}",`;
      }

      const children = getTokensTextRecursively(value, options, depth + 1);
      return `${tabs}${name}: {\n${children}\n${tabs}},`;
    })
    .join('\n');
};

/** Wrap a value in an export statement; `ts` produces a type declaration for `.d.ts` files */
const wrapExport = (name: string, value: string, syntaxStyle?: SyntaxStyle): string => {
  if (syntaxStyle === 'commonjs') return `exports.${name} = ${value}`;
  if (syntaxStyle === 'ts') return `export declare const ${name}: ${value}`;
  return `export const ${name} = ${value}`;
};
