import React from 'react';
import {Heading, Subtext} from '@workday/canvas-kit-react/text';
import {TertiaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {Table} from '@workday/canvas-kit-react/table';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {checkIcon, exclamationTriangleIcon} from '@workday/canvas-system-icons-web';
import {token as tokenVar} from '@workday/canvas-tokens-web/token';

import tokens from '../../data/tokens';
import {CodeBlock} from '../CodeBlock';
import {oklchToHex, oklchToRgba} from '../../util';

import './index.css';

type TokenType = 'color' | 'spacing' | 'typography';

type TokenTableProps = {
  group: string;
  type?: TokenType;
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

const SwatchCell = ({token: sdToken, isDark}: {token: SDToken; isDark?: boolean}) => {
  const tokenName = sdToken.original.$value.replace(/{|}/g, '');
  const darkValueRef = sdToken.original.$extensions['sana.canvas.tokens'].modes?.dark.$value;
  const cleanDarkValue = darkValueRef ? darkValueRef.replace(/{|}/g, '') : undefined;

  const value = (isDark && cleanDarkValue
    ? tokenVar(cleanDarkValue as any)
    : tokenVar(tokenName as any)) as unknown as string;

  // Semi-transparent colors get a checkerboard backdrop so the alpha is visible
  const hasAlpha = /\/\s*(?!1(\.0+)?\s*\))[\d.]+%?\s*\)/.test(sdToken.$value);

  return (
    <div className="swatch-cell">
      <Card data-part="swatch" data-alpha={hasAlpha ? 'true' : undefined}>
        <div
          data-part="swatch-color"
          style={{backgroundColor: hasAlpha && !isDark ? sdToken.$value : value}}
        />
      </Card>
      <CodeBlock data-part="ref" type="link">
        {tokenName}
      </CodeBlock>
    </div>
  );
};

const getMobileTokenName = (path: string[]) => {
  if (path[0] === 'brand') {
    return path[1] !== 'common' ? `SanaCanvasBrand.${path[1]}${path[2]}` : '';
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
          items={[
            {id: 'oklch', value: token.$value},
            {id: 'hex', value: oklchToHex(token.$value as any)},
            {id: 'rgba', value: oklchToRgba(token.$value as any)},
          ]}
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
};

const TokenRow = ({token}: TokenRowProps) => {
  const isDeprecated = token.$deprecated;
  return (
    <Table.Row>
      <Table.Cell>{token.$type === 'color' && <SwatchCell token={token} />}</Table.Cell>
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

const getDeepValue = (obj: Record<string, any>, path: string[]) => {
  return path.reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
};

export const TokenTable = ({group}: TokenTableProps) => {
  const path = group.split('.');
  const tokenGroup = group ? getDeepValue(tokens, path) : {};

  console.log(Object.keys(tokens.brand));

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
        {Object.entries(tokenGroup).map(([key, token]) => (
          <TokenRow key={key} token={token} />
        ))}
      </Table.Body>
    </Table>
  );
};
