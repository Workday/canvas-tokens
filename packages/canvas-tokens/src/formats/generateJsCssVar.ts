import {FormatFnArguments, TransformedToken} from 'style-dictionary/types';
import {fileHeader, getReferences} from 'style-dictionary/utils';

import {isComposite, SyntaxStyle, toCSSVarName} from '../../utils';

export type CssVarOptions = {
  compositeTokens?: string[];
  prefix: string;
  syntaxStyle?: SyntaxStyle;
};

/** Token levels that keep their name in the CSS variable, any other token is a system token */
const LEVELS = ['base', 'brand', 'component'];

/** Prefix of the labs variables, which have no levels */
const LABS_PREFIX = 'wdt';

/** Generate the `cssVar` function that returns the typed `var()` of a token */
export const generateJsCssVar = async ({dictionary, file, options}: FormatFnArguments) => {
  const {compositeTokens, prefix, syntaxStyle} = options as CssVarOptions;
  const header = await fileHeader({file});

  /** `--cnvs-sys-opacity-disabled` -> `opacity.disabled`, `--cnvs-base-palette-blue-400` -> `blue.400` */
  const getId = (token: TransformedToken) =>
    toCSSVarName(token, prefix)
      .slice(`--${prefix}-`.length)
      .replace(/^(sys|base-palette)-/, '')
      .replace(/-/g, '.');

  const tokens = dictionary.allTokens.filter(token => token.path[0] !== 'dark');
  const isCompositeToken = (token: TransformedToken) => isComposite(token, compositeTokens);
  const valueTokens = tokens.filter(token => !isCompositeToken(token));
  const palettes = valueTokens
    .filter(token => token.filePath.includes('palette'))
    .map(token => getId(token).split('.')[0]);

  // Typography tokens are objects of the ids of the tokens they reference
  const typeTokens = Object.fromEntries(
    tokens.filter(isCompositeToken).map(token => {
      const values = token.original.$value as Record<string, string>;
      const props = Object.entries(values).map(([prop, value]) => {
        const [reference] = getReferences(value, dictionary.unfilteredTokens ?? {});
        return [prop, reference ? getId(reference) : value];
      });
      return [getId(token), Object.fromEntries(props)];
    })
  );

  const config = {
    prefix,
    palettes: [...new Set(palettes)],
    active: valueTokens.filter(token => !token.$deprecated).map(getId),
    deprecated: valueTokens.filter(token => token.$deprecated).map(getId),
    typeTokens,
  };

  return (
    header +
    (syntaxStyle === 'ts' ? generateDeclaration(config) : generateFunction(config, syntaxStyle))
  );
};

type Config = {
  prefix: string;
  palettes: string[];
  active: string[];
  deprecated: string[];
  typeTokens: Record<string, Record<string, string>>;
};

/** Get a union of string literals, `never` when empty */
const toUnion = (values: string[]) =>
  values.length ? values.map(value => `'${value}'`).join(' | ') : 'never';

/** Generate the `cssVar` implementation for ES modules or CommonJS */
const generateFunction = (config: Config, syntaxStyle?: SyntaxStyle) => {
  const {prefix, palettes, typeTokens} = config;
  const isCommonJs = syntaxStyle === 'commonjs';

  return `const levels = ${JSON.stringify(LEVELS)};
const palettes = ${JSON.stringify(palettes)};
const typeTokens = ${JSON.stringify(typeTokens, null, 2)};

// Tokens of the root files keep their level, except for system and palette tokens
const getLevel = token => {
  const [root] = token.split('.');
  if (levels.includes(root)) return '';
  return palettes.includes(root) ? 'base-palette-' : 'sys-';
};

const toVarName = (token, labsTokens) => {
  if (token.startsWith('--')) return token;

  const name = token.replace(/\\./g, '-');
  return labsTokens ? \`--${LABS_PREFIX}-\${name}\` : \`--${prefix}-\${getLevel(token)}\${name}\`;
};

${isCommonJs ? '' : 'export '}function cssVar(token, fallback, options) {
  // Type tokens have no fallback, so the options come second
  if (typeof fallback === 'object') [fallback, options] = [undefined, fallback];

  const labsTokens = options?.labsTokens;
  if (typeTokens[token]) {
    return Object.fromEntries(
      Object.entries(typeTokens[token]).map(([prop, id]) => [
        prop,
        \`var(\${toVarName(id, labsTokens)})\`,
      ])
    );
  }

  const name = toVarName(token, labsTokens);
  return fallback ? \`var(\${name}, var(\${fallback}))\` : \`var(\${name})\`;
}
${isCommonJs ? 'exports.cssVar = cssVar;\n' : ''}`;
};

/** Generate the types of `cssVar`, computing the returned value from the arguments */
const generateDeclaration = (config: Config) => {
  const {prefix, palettes, active, deprecated, typeTokens} = config;
  const types = Object.entries(typeTokens)
    .map(([id, props]) => {
      const lines = Object.entries(props).map(([prop, value]) => `    ${prop}: '${value}';`);
      return `  '${id}': {\n${lines.join('\n')}\n  };`;
    })
    .join('\n');

  return `export type ActiveToken = ${toUnion(active)};
export type DeprecatedToken = ${toUnion(deprecated)};
export type Token = ActiveToken | DeprecatedToken;

/** The tokens each type token references */
export interface TypeTokens {
${types}
}
export type TypeToken = keyof TypeTokens;

export type CssVarOptions<L extends boolean> = {
  /** Use the simple \`--${LABS_PREFIX}-\` names instead of the names of the root CSS files */
  labsTokens?: L;
};

// 'base.opacity.20' -> 'base-opacity-20'
type Dashed<T extends string> = T extends \`\${infer H}.\${infer R}\` ? \`\${H}-\${Dashed<R>}\` : T;

// Tokens of the root files keep their level, except for system and palette tokens
type Level<T extends string> = T extends \`\${${toUnion(LEVELS)}}.\${string}\`
  ? ''
  : T extends \`\${${toUnion(palettes)}}.\${string}\`
  ? 'base-palette-'
  : 'sys-';

// Maps a token to its custom property name
type VarName<T extends string, L extends boolean> = T extends \`--\${string}\`
  ? T
  : L extends true
  ? \`--${LABS_PREFIX}-\${Dashed<T>}\`
  : \`--${prefix}-\${Level<T>}\${Dashed<T>}\`;

// Type tokens return an object of variables, so they take no fallback
export declare function cssVar<T extends TypeToken, L extends boolean = false>(
  token: T,
  options?: CssVarOptions<L>
): {[K in keyof TypeTokens[T]]: \`var(\${VarName<TypeTokens[T][K], L>})\`};
export declare function cssVar<T extends ActiveToken, L extends boolean = false>(
  token: T,
  options?: CssVarOptions<L>
): \`var(\${VarName<T, L>})\`;
export declare function cssVar<
  T extends ActiveToken,
  F extends \`--\${string}\`,
  L extends boolean = false
>(token: T, fallback: F, options?: CssVarOptions<L>): \`var(\${VarName<T, L>}, var(\${F}))\`;
/** @deprecated */
export declare function cssVar<T extends DeprecatedToken, L extends boolean = false>(
  token: T,
  options?: CssVarOptions<L>
): \`var(\${VarName<T, L>})\`;
/** @deprecated */
export declare function cssVar<
  T extends DeprecatedToken,
  F extends \`--\${string}\`,
  L extends boolean = false
>(token: T, fallback: F, options?: CssVarOptions<L>): \`var(\${VarName<T, L>}, var(\${F}))\`;
`;
};
