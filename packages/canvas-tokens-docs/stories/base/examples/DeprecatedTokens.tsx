import * as React from 'react';
import {deprecatedBaseTokens} from './data/deprecatedMapping';
import {TokenGrid} from '../../../components/TokenGrid';
import {SwatchWithText} from '../../../components/SwatchWithText';

export const DeprecatedTokens = () => {
  const names = Object.keys(deprecatedBaseTokens);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem'}}>
      {names.map(name => (
        <TokenGrid
          caption={name.replaceAll('-', ' ')}
          headings={['Token Name', 'Old Value', 'New Value', 'System Token Replacement']}
          rows={deprecatedBaseTokens[name]}
        >
          {(token: any) => (
            <>
              <TokenGrid.RowItem>{token.name}</TokenGrid.RowItem>
              <SwatchWithText color={token.old} withWhiteText={token.withWhiteText} />
              <SwatchWithText color={token.new} withWhiteText={token.withWhiteText} />
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
