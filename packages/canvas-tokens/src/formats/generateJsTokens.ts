import {Dictionary, File, TransformedToken, TransformedTokens} from 'style-dictionary/types';
import {fileHeader, getReferences} from 'style-dictionary/utils';
import {camelCase} from 'case-anything';

import {getJsDoc, getJsPath, isComposite, SyntaxStyle, toCSSVarName} from '../../utils';

type Format = {
  dictionary: Dictionary;
  file: File;
  options: {
    compositeTokens?: string[];
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
  const {style = 'module', includeJsDocs = false, compositeTokens, prefix, syntaxStyle} = options;
  const header = await fileHeader({file});

  const treeOptions = {
    compositeTokens,
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
  compositeTokens?: string[];
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

        if (isComposite(token, options.compositeTokens)) {
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
