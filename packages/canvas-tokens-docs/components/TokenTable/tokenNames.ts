import {token as tokenVar} from '@workday/canvas-tokens-web/token';
import {SDToken, TokenLevel} from './types';

/** Strips the braces of a reference and exposes a trailing `$root` as `default`, e.g. `{color.surface.$root}` becomes `color.surface.default`. */
const stripBraces = (ref: string) => ref.replace(/[{}]/g, '').replace(/\.\$root$/, '.default');

/**
 * The path of a token reference without braces, e.g. `{base.palette.blue.500}` becomes
 * `base.palette.blue.500`. Returns `''` when the value isn't a reference, such as a raw color value.
 */
export const cleanRef = (value: unknown) =>
  typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
    ? stripBraces(value)
    : '';

/** The public token name of a token key, e.g. `{color.surface.$root}` becomes `color.surface.default`. */
export const getTokenName = (key: string) => stripBraces(key);

const toKebab = (part: string) => part.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/** The `token()` name of a token, e.g. `base.size.100` or `base.font-size.100` (dashes are kept). */
export const getJsName = (sdToken: SDToken, level?: TokenLevel) =>
  level ? [level, ...sdToken.path.map(toKebab)].join('.') : getTokenName(sdToken.key);

/** Type level tokens are CSS classes, not variables, e.g. `cnvs-sys-type-body-sm`. */
export const getTypeClass = (sdToken: SDToken) => `cnvs-sys-${sdToken.path.map(toKebab).join('-')}`;

/** The `var()` reference of a token (or the class name, for typography). */
export const getCssVar = (sdToken: SDToken, level?: TokenLevel) =>
  level
    ? `var(--cnvs-${level}-${sdToken.path.map(toKebab).join('-')})`
    : sdToken.$type === 'typography'
    ? `.${getTypeClass(sdToken)}`
    : (tokenVar(getTokenName(sdToken.key) as any) as unknown as string);

export const getDimensionPx = (sdToken: SDToken) => {
  const original = sdToken.original.$value as unknown as {value: number; unit: string};
  return original && typeof original === 'object' && original.unit === 'px'
    ? `${original.value}px`
    : undefined;
};

export const cleanTitle = (name: string) =>
  name
    .replace('.default', '')
    .replace('.bg', '.background')
    .replace('.fg', '.foreground')
    .replace('.ai', '.AI')
    .replace('base.', '')
    .replace(/\.|-/g, ' ')
    // numbered steps read as separate words: medium2 becomes medium 2
    .replace(/([a-z])(\d)/g, '$1 $2')
    // t-shirt sizes read as abbreviations: XS, SM, XXL
    .replace(/\b(x{1,3}[sl]|sm|md|lg)\b/g, size => size.toUpperCase());

export const formatTypography = (value: unknown) =>
  Object.entries(value as Record<string, string | number>)
    .map(([prop, v]) => `${prop}: ${v}`)
    .join('\n');
