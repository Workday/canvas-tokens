import React from 'react';
import {Table} from '@workday/canvas-kit-react/table';
import {token as tokenVar} from '@workday/canvas-tokens-web/token';

import {getDataTheme, Theme} from '../ThemeControl';
import {getTokens} from '../../util';
import {TokenRow} from './TokenRow';
import {SDToken, TokenLevel} from './types';

import './index.css';

export type {SDToken} from './types';

type TokenTableProps = {
  group: string;
  isDark?: boolean;
  /** Set by `ThemeControl` to match the selected theme. */
  theme?: Theme;
  /** Set to `base` for base tokens, whose keys don't carry their level, e.g. `{size.100}`. */
  level?: TokenLevel;
  /** Narrows the group to a subset of its tokens, e.g. one sub-category of `system.color.surface`. */
  filter?: (token: SDToken) => boolean;
};

export const TokenTable = ({group, isDark, theme, level, filter}: TokenTableProps) => {
  const allTokens = group ? (getTokens(group) as unknown as SDToken[]) : [];
  const tokens = filter ? allTokens.filter(filter) : allTokens;

  return (
    <Table
      aria-label={`${group} tokens table`}
      className="token-table"
      data-theme={getDataTheme(theme)}
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
          <TokenRow
            key={token.key}
            token={token}
            group={group}
            isDark={isDark}
            theme={theme}
            level={level}
          />
        ))}
      </Table.Body>
    </Table>
  );
};
