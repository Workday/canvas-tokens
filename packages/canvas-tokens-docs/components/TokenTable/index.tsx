import React from 'react';
import {Heading, Subtext} from '@workday/canvas-kit-react/text';
import {TertiaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {Table} from '@workday/canvas-kit-react/table';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {checkIcon, exclamationTriangleIcon} from '@workday/canvas-system-icons-web';
import {token as tokenVar} from '@workday/canvas-tokens-web/token';

import {CodeBlock} from '../CodeBlock';
import {getTokens, oklchToHex, oklchToRgba} from '../../util';

import './index.css';

type TokenType =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'gradient'
  | 'dimension'
  | 'number'
  | 'duration'
  | 'cubicBezier'
  | 'fontWeight'
  | 'fontFamily';

type TokenTableProps = {
  group: string;
  type?: TokenType;
  isDark?: boolean;
  /** Set to `base` for base tokens, whose keys don't carry their level, e.g. `{size.100}`. */
  level?: 'base';
  /** Narrows the group to a subset of its tokens, e.g. one sub-category of `system.color.surface`. */
  filter?: (token: SDToken) => boolean;
};

export type SDToken = {
  key: string;
  $value: string;
  $type: TokenType;
  $description: string;
  $deprecated?: boolean;
  path: string[];
  original: {
    $value: string;
    $extensions: {
      'sana.canvas.tokens': {
        modes?: {
          dark: {
            $value: string;
          };
        };
      };
    };
  };
};

/** A token reference like `{base.palette.blue.500}`, or the hex of a raw (unreferenced) color value. */
const cleanRef = (value: unknown) =>
  typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
    ? value.replace(/{|}/g, '').replace(/\.\$root$/, '.default')
    : '';

/** The public token name: a trailing `$root` segment is exposed as `default`, e.g. `color.surface.default`. */
const getTokenName = (key: string) => cleanRef(key).replace(/\.\$root$/, '.default');

const toKebab = (part: string) => part.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/** The `token()` name of a token, e.g. `base.size.100` or `base.font-size.100` (dashes are kept). */
const getJsName = (sdToken: SDToken, level?: 'base') =>
  level ? [level, ...sdToken.path.map(toKebab)].join('.') : getTokenName(sdToken.key);

/** The `var()` reference of a token. */
const getCssVar = (sdToken: SDToken, level?: 'base') =>
  level
    ? `var(--cnvs-${level}-${sdToken.path.map(toKebab).join('-')})`
    : tokenVar(getTokenName(sdToken.key) as any);

const getDimensionPx = (sdToken: SDToken) => {
  const original = sdToken.original.$value as unknown as {value: number; unit: string};
  return original && typeof original === 'object' && original.unit === 'px'
    ? `${original.value}px`
    : undefined;
};

/** Preview of a non-color token, rendered from the token's own CSS variable. */
const ExampleCell = ({token: sdToken, level}: {token: SDToken; level?: 'base'}) => {
  const cssVar = getCssVar(sdToken, level);
  const [group] = sdToken.path;
  const fill = tokenVar('color.accent.contrast' as any);
  let preview: React.ReactNode = null;

  switch (sdToken.$type) {
    case 'dimension':
      if (group === 'letter-spacing') {
        preview = (
          <span data-part="text-sample" style={{letterSpacing: cssVar}}>
            Aa-Zz
          </span>
        );
      } else if (group === 'fontSize') {
        preview = (
          <span data-part="text-sample" style={{fontSize: cssVar}}>
            Aa
          </span>
        );
      } else {
        preview = <div data-part="size-sample" style={{width: cssVar, background: fill}} />;
      }
      break;
    case 'number':
      preview = (
        <div data-part="opacity-sample">
          <div
            data-part="opacity-overlay"
            style={{opacity: cssVar as any, background: tokenVar('color.accent.info' as any)}}
          />
        </div>
      );
      break;
    case 'duration':
      preview = (
        <div data-part="duration-sample">
          <div style={{animationDuration: cssVar, background: fill}} />
        </div>
      );
      break;
    case 'cubicBezier': {
      const [x1, y1, x2, y2] = (sdToken.original.$value as unknown as number[]).map(n => n * 100);
      preview = (
        <div data-part="curve-sample">
          <svg viewBox="0 0 100 100" aria-hidden="true" overflow="visible">
            <line x1="0" y1="100" x2="100" y2="0" data-part="curve-linear" />
            <path
              d={`M0 100 C${x1} ${100 - y1} ${x2} ${100 - y2} 100 0`}
              fill="none"
              stroke={fill}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div data-part="curve-x">
            <div data-part="curve-y" style={{animationTimingFunction: cssVar, background: fill}} />
          </div>
        </div>
      );
      break;
    }
    case 'fontWeight':
      preview = (
        <span data-part="text-sample" style={{fontWeight: cssVar as any}}>
          Aa
        </span>
      );
      break;
    case 'fontFamily':
      preview = (
        <span data-part="text-sample" style={{fontFamily: cssVar}}>
          Aa-Zz
        </span>
      );
      break;
  }

  return (
    <div className="example-cell">
      <Card data-part="example">{preview}</Card>
    </div>
  );
};

const SwatchCell = ({token: sdToken, isDark}: {token: SDToken; isDark?: boolean}) => {
  const isGradient = sdToken.$type === 'gradient' || sdToken.$value?.startsWith('linear-gradient');
  // Gradients have no single reference (`original.$value` is a list of stops), so use the token itself
  const tokenName = getTokenName(sdToken.key);
  const tokenValueRef = cleanRef(sdToken.original.$value);
  const darkValue = sdToken.original.$extensions?.['sana.canvas.tokens']?.modes?.dark.$value
    ? cleanRef(sdToken.original.$extensions?.['sana.canvas.tokens']?.modes?.dark.$value)
    : undefined;

  // Semi-transparent colors get a checkerboard backdrop so the alpha is visible
  const hasAlpha = !isGradient && /\/\s*(?!1(\.0+)?\s*\))[\d.]+%?\s*\)/.test(sdToken.$value);

  return (
    <div className="swatch-cell">
      <Card data-part="swatch" data-alpha={hasAlpha ? 'true' : undefined}>
        <div data-part="swatch-color" style={{background: tokenVar(tokenName as any)} as any} />
      </Card>
      {!isGradient && (
        <CodeBlock data-part="ref">{isDark && darkValue ? darkValue : tokenValueRef}</CodeBlock>
      )}
    </div>
  );
};

const getCamelCaseName = (token: string[]) => {
  return token
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
};

const getCapitalizedName = (token: string[]) => {
  return token.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
};

const getMobileTokenName = (path: string[]) => {
  if (path[0] === 'brand') {
    const [_, category, ...token] = path;
    const camelCaseName = getCamelCaseName(token);

    return category !== 'common' && category !== 'gradient'
      ? `SanaCanvasBrand.${category}${path[2]}`
      : `SanaCanvasBrand.${getCapitalizedName([category])}.${camelCaseName}`;
  }
};

const cleanTitle = (name: string) =>
  name
    .replace('.default', '')
    .replace('.bg', '.background')
    .replace('.fg', '.foreground')
    .replace('.ai', '.AI')
    .replace('base.', '')
    .replace(/\.|-/g, ' ');

const DescriptionCell = ({token, level}: {token: SDToken; level?: 'base'}) => {
  const name = getJsName(token, level);
  const title = cleanTitle(name);
  const cssVar = getCssVar(token, level);
  const px = token.$type === 'dimension' ? getDimensionPx(token) : undefined;

  return (
    <Table.Cell className="token-description-cell">
      <Heading size="small">{title}</Heading>
      <Subtext size="large">{token.$description || <i>No description available</i>}</Subtext>
      <div className="token-values">
        <MultiValueBlock
          title="Computed Values"
          items={
            token.$type === 'color'
              ? [
                  {id: 'oklch', value: token.$value},
                  {id: 'hex', value: oklchToHex(token.$value as any)},
                  {id: 'rgba', value: oklchToRgba(token.$value as any)},
                ]
              : [
                  {id: 'value', value: String(token.$value)},
                  {id: 'px', value: px},
                ].filter(item => item.value)
          }
        />
        <MultiValueBlock
          title="Usage"
          items={[
            {id: 'js', value: `token('${name}')`},
            {id: 'css', value: cssVar},
            {id: 'mobile', value: getMobileTokenName(token.path)},
          ].filter(item => item.value)}
        />
      </div>
    </Table.Cell>
  );
};

type MultiValueBlockProps = {
  title: string;
  items: any[];
};

const MultiValueBlock = ({title, items}: MultiValueBlockProps) => {
  const [selected, setSelected] = React.useState(items[0]);

  return (
    <div className="multi-value-block">
      <div>
        <Subtext size="large">{title}</Subtext>
        <div>
          {items.length > 1 &&
            items.map((item, index) => (
              <TertiaryButton
                key={index}
                size="extraSmall"
                onClick={() => setSelected(item)}
                aria-pressed={selected.id === item.id}
              >
                {item.id}
              </TertiaryButton>
            ))}
        </div>
      </div>
      <CodeBlock type="copy">{selected.value}</CodeBlock>
    </div>
  );
};

type TokenRowProps = {
  token: SDToken;
  isDark?: boolean;
  level?: 'base';
};

const TokenRow = ({token, isDark, level}: TokenRowProps) => {
  const isDeprecated = token.$deprecated;
  return (
    <Table.Row>
      <Table.Cell>
        {token.$type === 'color' || token.$type === 'gradient' ? (
          <SwatchCell token={token} isDark={isDark} />
        ) : (
          <ExampleCell token={token} level={level} />
        )}
      </Table.Cell>
      <DescriptionCell token={token} level={level} />
      <Table.Cell>
        <Tooltip title={!isDeprecated ? 'Active' : 'Deprecated'}>
          <SystemIcon
            icon={!isDeprecated ? checkIcon : exclamationTriangleIcon}
            color={
              !isDeprecated
                ? tokenVar('color.fg.success.default')
                : tokenVar('color.fg.danger.default')
            }
          />
        </Tooltip>
      </Table.Cell>
    </Table.Row>
  );
};

export const TokenTable = ({group, isDark, level, filter}: TokenTableProps) => {
  const allTokens = group ? (getTokens(group) as unknown as SDToken[]) : [];
  const tokens = filter ? allTokens.filter(filter) : allTokens;

  return (
    <Table
      aria-label={`${group} tokens table`}
      className="token-table"
      data-theme="sana-canvas"
      cs={{marginBlock: tokenVar('gap.lg')}}
    >
      <Table.Head>
        <Table.Row>
          <Table.Header scope="col">Preview</Table.Header>
          <Table.Header scope="col">Description</Table.Header>
          <Table.Header scope="col">Status</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {tokens.map(token => (
          <TokenRow key={token.key} token={token} isDark={isDark} level={level} />
        ))}
      </Table.Body>
    </Table>
  );
};
