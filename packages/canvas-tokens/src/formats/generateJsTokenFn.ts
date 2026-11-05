import {FormatFnArguments, TransformedToken} from 'style-dictionary/types';
import {fileHeader, getReferences} from 'style-dictionary/utils';

import {getJsDoc, isComposite, SyntaxStyle, toCSSVarName} from '../../utils';

export type TokenFnOptions = {
  compositeTokens?: string[];
  /** Add the description, raw value and deprecation flag of each token to the declarations */
  includeJsDocs?: boolean;
  prefix: string;
  /** Name the variables `--<prefix>-<id>` without the token level, as the labs CSS files do */
  simpleNames?: boolean;
  syntaxStyle?: SyntaxStyle;
};

/** Token levels that keep their name in the CSS variable, any other token is a system token */
const LEVELS = ['base', 'brand', 'component'];

/** Component tokens keep no level in the simple names, `component.system.icon` is `system-icon` */
const COMPONENT_ID = /^component\./;

type TokenEntry = {id: string; name: string; doc: string; deprecated: boolean};

type Config = {
  prefix: string;
  simpleNames: boolean;
  palettes: string[];
  tokens: TokenEntry[];
  typeTokens: Record<string, {doc: string; props: Record<string, string>}>;
};

/** Generate the `token` function that returns the typed `var()` of a token */
export const generateJsTokenFn = async ({dictionary, file, options}: FormatFnArguments) => {
  const {
    compositeTokens,
    includeJsDocs = false,
    prefix,
    simpleNames = false,
    syntaxStyle,
  } = options as TokenFnOptions;
  const header = await fileHeader({file});

  /** `--cnvs-sys-opacity-disabled` -> `opacity.disabled`, `--cnvs-base-palette-blue-400` -> `blue.400` */
  const getId = (token: TransformedToken) =>
    toCSSVarName(token, prefix)
      .slice(`--${prefix}-`.length)
      .replace(/^(sys|base-palette)-/, '')
      .replace(/-/g, '.');

  const docOptions = {compositeTokens, tokens: dictionary.unfilteredTokens};
  const getDoc = (token: TransformedToken) => (includeJsDocs ? getJsDoc(token, docOptions) : '');

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
      return [getId(token), {doc: getDoc(token), props: Object.fromEntries(props)}];
    })
  );

  const config: Config = {
    prefix,
    simpleNames,
    palettes: [...new Set(palettes)],
    tokens: valueTokens.map(token => {
      const id = getId(token);
      return {
        id,
        name: simpleNames
          ? `--${prefix}-${id.replace(COMPONENT_ID, '').replace(/\./g, '-')}`
          : toCSSVarName(token, prefix),
        doc: getDoc(token),
        deprecated: !!token.$deprecated,
      };
    }),
    typeTokens,
  };

  return (
    header +
    (syntaxStyle === 'ts' ? generateDeclaration(config) : generateFunction(config, syntaxStyle))
  );
};

/** Get a union of string literals, `never` when empty */
const toUnion = (values: string[]) =>
  values.length ? values.map(value => `'${value}'`).join(' | ') : 'never';

/** Text of the lookup of the level an id keeps in its variable name, none without levels */
const getLevelText = ({simpleNames, palettes}: Config) =>
  simpleNames
    ? ''
    : `const levels = ${JSON.stringify(LEVELS)};
const palettes = ${JSON.stringify(palettes)};

// Tokens of the root files keep their level, except for system and palette tokens
const getLevel = id => {
  const [root] = id.split('.');
  if (levels.includes(root)) return '';
  return palettes.includes(root) ? 'base-palette-' : 'sys-';
};

`;

/** Text of the object of the ids each type token references */
const getTypeTokensText = ({typeTokens}: Config) => {
  const typeProps = Object.fromEntries(Object.entries(typeTokens).map(([id, t]) => [id, t.props]));
  return `const typeTokens = ${JSON.stringify(typeProps, null, 2)};\n\n`;
};

/** Text of the function that maps an id to its CSS variable name */
const getVarNameText = ({prefix, simpleNames}: Config) => {
  const level = simpleNames ? '' : '${getLevel(id)}';
  const path = simpleNames ? `id.replace(${COMPONENT_ID}, '')` : 'id';
  return `const toVarName = id =>
  id.startsWith('--') ? id : \`--${prefix}-${level}\${${path}.replace(/\\./g, '-')}\`;\n\n`;
};

/** Text of the exported `token` function */
const getTokenFnText = (syntaxStyle?: SyntaxStyle) => {
  const isCommonJs = syntaxStyle === 'commonjs';

  return `${isCommonJs ? '' : 'export '}function token(id, fallback) {
  if (typeTokens[id]) {
    return Object.fromEntries(
      Object.entries(typeTokens[id]).map(([prop, ref]) => [prop, \`var(\${toVarName(ref)})\`])
    );
  }

  const name = toVarName(id);
  if (!fallback) return \`var(\${name})\`;

  // A fallback that is already a var() stays unchanged
  return \`var(\${name}, \${fallback.startsWith('var(') ? fallback : \`var(\${fallback})\`})\`;
}
${isCommonJs ? 'exports.token = token;\n' : ''}`;
};

/** Generate the `token` implementation for ES modules or CommonJS */
const generateFunction = (config: Config, syntaxStyle?: SyntaxStyle) =>
  getLevelText(config) +
  getTypeTokensText(config) +
  getVarNameText(config) +
  getTokenFnText(syntaxStyle);

/** Indent a JS Doc block, or nothing when the token has none */
const indentDoc = (doc: string) =>
  doc
    .split('\n')
    .filter(Boolean)
    .map(line => `  ${line}\n`)
    .join('');

/** Text of the interface of the CSS variable of each token */
const getTokensInterfaceText = ({tokens}: Config) => {
  const lines = tokens.map(({id, name, doc}) => `${indentDoc(doc)}  '${id}': '${name}';`);
  return `/** The CSS variable of each token */\nexport interface Tokens {\n${lines.join(
    '\n'
  )}\n}\n`;
};

/** Text of the interface of the tokens each type token references */
const getTypeTokensInterfaceText = ({typeTokens}: Config) => {
  const types = Object.entries(typeTokens).map(([id, {doc, props}]) => {
    const lines = Object.entries(props).map(([prop, value]) => `    ${prop}: '${value}';`);
    return `${indentDoc(doc)}  '${id}': {\n${lines.join('\n')}\n  };`;
  });
  return `/** The tokens each type token references */\nexport interface TypeTokens {\n${types.join(
    '\n'
  )}\n}\n`;
};

/** Text of the helper types that derive the token unions and variable names */
const getHelperTypesText = ({tokens}: Config) => {
  const deprecated = tokens.filter(token => token.deprecated).map(({id}) => id);

  return `export type TypeToken = keyof TypeTokens;
export type Token = keyof Tokens;
export type DeprecatedToken = ${toUnion(deprecated)};
export type ActiveToken = Exclude<Token, DeprecatedToken>;

// A referenced token missing from \`Tokens\` has no variable
type VarName<T> = T extends Token ? Tokens[T] : never;

// A fallback is a variable name or a var(), which stays unchanged
type Fallback = \`--\${string}\` | \`var(\${string})\`;
type FallbackVar<F extends Fallback> = F extends \`var(\${string})\` ? F : \`var(\${F})\`;
`;
};

/**
 * Text of the `token` overloads. Each token gets its own so the JS Doc of the token
 * (raw value, deprecation) shows up for the call, followed by the overloads for any token
 */
const getOverloadsText = ({tokens, typeTokens}: Config) => {
  const names = new Map(tokens.map(({id, name}) => [id, name]));

  const typeOverloads = Object.entries(typeTokens).map(([id, {doc, props}]) => {
    const lines = Object.entries(props).map(
      ([prop, ref]) => `  ${prop}: \`var(${names.get(ref) ?? '--unknown'})\`;`
    );
    return `${doc}export declare function token(token: '${id}'): {\n${lines.join('\n')}\n};\n`;
  });

  const tokenOverloads = tokens.flatMap(({id, name, doc}) => [
    `${doc}export declare function token(token: '${id}'): \`var(${name})\`;\n`,
    `${doc}export declare function token<F extends Fallback>(
  token: '${id}',
  fallback: F
): \`var(${name}, \${FallbackVar<F>})\`;\n`,
  ]);

  return `${[...typeOverloads, ...tokenOverloads].join('')}
// Overloads of a union of tokens, which have no single JS Doc
export declare function token<T extends TypeToken>(
  token: T
): {[K in keyof TypeTokens[T]]: \`var(\${VarName<TypeTokens[T][K]>})\`};
export declare function token<T extends Token>(token: T): \`var(\${Tokens[T]})\`;
export declare function token<T extends Token, F extends Fallback>(
  token: T,
  fallback: F
): \`var(\${Tokens[T]}, \${FallbackVar<F>})\`;
`;
};

/** Generate the types of `token` */
const generateDeclaration = (config: Config) =>
  [
    getTokensInterfaceText(config),
    getTypeTokensInterfaceText(config),
    getHelperTypesText(config),
    getOverloadsText(config),
  ].join('\n');
