import * as React from 'react';
import {deprecatedBaseTokens} from './data/deprecatedMapping';
import {TokenGrid} from '../../../components/TokenGrid';

export const Swatch = ({color, withWhiteText, name = ''}) => {
  const isVar = color && !color.startsWith('#');
  const background = isVar ? `var(--cnvs-${color.replaceAll('.', '-')})` : color || 'transparent';
  const lastNumber = isVar ? parseInt(color.split('.').reverse()[0] || '0') : 0;

  const textColor = withWhiteText || lastNumber > 400 ? 'white' : 'black';

  return (
    <TokenGrid.RowItem style={{width: '100%', paddingInlineEnd: '1rem', textAlign: 'center'}}>
      {color ? (
        <div
          style={{
            background,
            color: textColor,
            border: '1px solid var(--cnvs-sys-color-border-divider)',
            padding: '0.5rem',
          }}
        >
          {name || color}
        </div>
      ) : (
        <span>none</span>
      )}
    </TokenGrid.RowItem>
  );
};

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
              <Swatch color={token.old} withWhiteText={token.withWhiteText} />
              <Swatch color={token.new} withWhiteText={token.withWhiteText} />
              {
                <TokenGrid.RowItem>
                  {token.systemTokens?.map(token => (
                    <div>{token}</div>
                  ))}
                </TokenGrid.RowItem>
              }
            </>
          )}
        </TokenGrid>
      ))}
    </div>
  );
};
