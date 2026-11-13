import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {Table} from '@workday/canvas-kit-react/table';
import {token} from '@workday/canvas-tokens-web/token';

import tokens from '../../data/tokens';
import './index.css';
import {CodeBlock} from '../CodeBlock';

type TokenTableProps = {
  group: string;
  type?: 'color' | 'spacing' | 'typography';
};

type SDToken = {
  key: string;
  $value: string;
  $type: string;
  $description: string;
  $deprecated?: boolean;
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
    ? token(cleanDarkValue as any)
    : token(tokenName as any)) as unknown as string;

  return (
    <div
      className="swatch-cell"
      data-theme="sana-canvas"
      data-color-mode={isDark ? 'dark' : 'light'}
    >
      <div data-part="swatch-backdrop">
        <Card data-part="swatch" cs={{backgroundColor: value}}></Card>
      </div>
      <CodeBlock type="link">{tokenName}</CodeBlock>
    </div>
  );
};

type TokenRowProps = {
  token: SDToken;
};

const TokenRow = ({token}: TokenRowProps) => (
  <Table.Row>
    <Table.Cell>
      {token.$type === 'color' && (
        <>
          <SwatchCell token={token} />
          <SwatchCell token={token} isDark />
        </>
      )}
    </Table.Cell>
    <Table.Cell>{token.$description}</Table.Cell>
    <Table.Cell>{!token.$deprecated}</Table.Cell>
  </Table.Row>
);

const getDeepValue = (obj: Record<string, any>, path: string[]) => {
  return path.reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
};

export const TokenTable = ({group}: TokenTableProps) => {
  const path = group.split('.');
  const tokenGroup = group ? getDeepValue(tokens, path) : {};

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
