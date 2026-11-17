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

type TokenType = 'color' | 'spacing' | 'typography' | 'gradient';

type TokenTableProps = {
  group: string;
  type?: TokenType;
  isDark?: boolean;
};

type SDToken = {
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

const cleanRef = (value: string) => value.replace(/{|}/g, '');

const SwatchCell = ({token: sdToken, isDark}: {token: SDToken; isDark?: boolean}) => {
  const isGradient = sdToken.$type === 'gradient';
  // Gradients have no single reference (`original.$value` is a list of stops), so use the token itself
  const tokenName = cleanRef(sdToken.key);
  const tokenValueRef = cleanRef(sdToken.original.$value);
  const darkValue = sdToken.original.$extensions?.['sana.canvas.tokens']?.modes?.dark.$value
    ? cleanRef(sdToken.original.$extensions?.['sana.canvas.tokens']?.modes?.dark.$value)
    : undefined;

  // Semi-transparent colors get a checkerboard backdrop so the alpha is visible
  const hasAlpha = !isGradient && /\/\s*(?!1(\.0+)?\s*\))[\d.]+%?\s*\)/.test(sdToken.$value);

  return (
    <div className="swatch-cell">
      <Card data-part="swatch" data-alpha={hasAlpha ? 'true' : undefined}>
        <div data-part="swatch-color" style={{background: tokenVar(tokenName as any)}} />
      </Card>
      {sdToken.$type === 'color' && (
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

const DescriptionCell = ({token}: {token: SDToken}) => {
  const name = token.key.replace(/{|}/g, '');
  const title = name.replace(/\./g, ' ');
  const cssVar = tokenVar(name as any);

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
              : [{id: 'oklch', value: token.$value}]
          }
        />
        <MultiValueBlock
          title="Usage"
          items={[
            {id: 'css', value: cssVar},
            {id: 'js', value: `token('${token.key.replace(/{|}/g, '')}')`},
            {id: 'mobile', value: getMobileTokenName(token.path)},
          ]}
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
          {items.map((item, index) => (
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
};

const TokenRow = ({token, isDark}: TokenRowProps) => {
  const isDeprecated = token.$deprecated;
  return (
    <Table.Row>
      <Table.Cell>
        {(token.$type === 'color' || token.$type === 'gradient') && (
          <SwatchCell token={token} isDark={isDark} />
        )}
      </Table.Cell>
      <DescriptionCell token={token} />
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

export const TokenTable = ({group, isDark}: TokenTableProps & {isDark?: boolean}) => {
  const tokens = group ? (getTokens(group) as unknown as SDToken[]) : [];

  return (
    <Table aria-label={`${group} tokens table`} className="token-table">
      <Table.Head>
        <Table.Row>
          <Table.Header scope="col">Preview</Table.Header>
          <Table.Header scope="col">Description</Table.Header>
          <Table.Header scope="col">Status</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {tokens.map(token => (
          <TokenRow key={token.key} token={token} isDark={isDark} />
        ))}
      </Table.Body>
    </Table>
  );
};
