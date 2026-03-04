import * as React from 'react';
import {updatedSystemTokens} from './data/deprecatedMapping';
import {TokenGrid} from '../../../components/TokenGrid';
import {SwatchWithText} from '../../../components/SwatchWithText';

export const BackgroundUpdates = () => {
  const {background} = updatedSystemTokens;
  const names = Object.keys(background);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem'}}>
      {names.map(name => (
        <TokenGrid
          caption={`${name} background`.toUpperCase()}
          headings={['Token Name', 'Old Value', 'New Value', 'Change']}
          rows={background[name]}
        >
          {(token: any) => (
            <>
              <TokenGrid.RowItem>{token.name}</TokenGrid.RowItem>
              <SwatchWithText
                color={token.oldColor}
                name={token.old}
                withWhiteText={token.withWhiteText}
              />
              <SwatchWithText color={token.new} withWhiteText={token.withWhiteText} />
              <TokenGrid.RowItem>
                {!token.old ? '➕ Added' : !token.new ? '❌ Removed' : '✅ Updated'}
              </TokenGrid.RowItem>
            </>
          )}
        </TokenGrid>
      ))}
    </div>
  );
};
