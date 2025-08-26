import * as React from 'react';
import {updatedSystemTokens} from './data/deprecatedMapping';
import {TokenGrid} from '../../../components/TokenGrid';
import {Swatch} from './DeprecatedTokens';

export const BorderUpdates = () => {
  const {border} = updatedSystemTokens;
  const names = Object.keys(border);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem'}}>
      {names.map(name => (
        <TokenGrid
          caption={`${name} border tokens`.toUpperCase()}
          headings={['Token Name', 'Old Value', 'New Value', 'Change']}
          rows={border[name]}
        >
          {(token: any) => (
            <>
              <TokenGrid.RowItem>{token.name}</TokenGrid.RowItem>
              <Swatch color={token.oldColor} name={token.old} withWhiteText={token.withWhiteText} />
              <Swatch color={token.new} withWhiteText={token.withWhiteText} />
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
