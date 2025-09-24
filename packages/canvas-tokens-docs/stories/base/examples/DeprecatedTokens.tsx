import * as React from 'react';
import {deprecatedBaseTokens} from './data/deprecatedMapping';
import {TokenGrid} from '../../../components/TokenGrid';
import {SwatchWithText} from '../../../components/SwatchWithText';

const getCamelCasedName = (name: string) => {
  return name
    .split('.')
    .slice(2)
    .map(p =>
      p
        .split('-')
        .map((s, i) => (i ? s.charAt(0).toUpperCase() + s.slice(1) : s))
        .join('')
    )
    .join('');
};

export const DeprecatedTokens = () => {
  const names = Object.keys(deprecatedBaseTokens);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem'}}>
      {names.map(name => (
        <TokenGrid
          caption={name.replaceAll('-', ' ')}
          headings={[
            'Token Name (JS Name)',
            'Old Value',
            'New Value (JS Name)',
            'System Token Replacement',
          ]}
          rows={deprecatedBaseTokens[name]}
        >
          {(token: any) => (
            <>
              <TokenGrid.RowItem>
                <div>{token.name}</div>
                <div>(base.{getCamelCasedName(token.name)})</div>
              </TokenGrid.RowItem>
              <SwatchWithText color={token.old} withWhiteText={token.withWhiteText} />
              <SwatchWithText
                color={token.new}
                withWhiteText={token.withWhiteText}
                jsName={'base.' + getCamelCasedName(token.new)}
              />
              <TokenGrid.RowItem>
                {token.systemTokens?.map(token => (
                  <div>{token}</div>
                ))}
              </TokenGrid.RowItem>
            </>
          )}
        </TokenGrid>
      ))}
    </div>
  );
};
