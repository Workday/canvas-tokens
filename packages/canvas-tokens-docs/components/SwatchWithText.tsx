import * as React from 'react';
import {TokenGrid} from './TokenGrid';

export const SwatchWithText = ({color, withWhiteText, name = ''}) => {
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
