import * as React from 'react';
import {updatedSystemTokens} from './data/deprecatedMapping';
import {TokenGrid} from '../../../components/TokenGrid';
import {Swatch} from './DeprecatedTokens';

const TextBlock = ({token, name, color}) => {
  const textColor =
    color && !color.startsWith('#') ? `var(--cnvs-${color.replaceAll('.', '-')})` : color;
  const containerColor = token?.endsWith('inverse')
    ? 'var(--cnvs-sys-color-bg-contrast-strong)'
    : 'transparent';

  return (
    <TokenGrid.RowItem width="100%">
      <div style={{textAlign: 'center', background: containerColor}}>
        {name ? <p style={{color: textColor, fontWeight: 'bold'}}>{name}</p> : <span>none</span>}
      </div>
    </TokenGrid.RowItem>
  );
};

const IconBlock = ({token, name, color}) => {
  const iconColor =
    color && !color.startsWith('#') ? `var(--cnvs-${color.replaceAll('.', '-')})` : color;
  const textColor = token?.endsWith('inverse') ? 'var(--cnvs-sys-color-fg-inverse)' : 'inherit';
  const containerColor = token?.endsWith('inverse')
    ? 'var(--cnvs-sys-color-bg-contrast-strong)'
    : 'transparent';

  return (
    <TokenGrid.RowItem width="100%" style={{textAlign: 'center'}}>
      {name ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: containerColor,
            padding: '0.5rem',
            color: textColor,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="32"
            style={{minWidth: '26px', minHeight: '32px'}}
            viewBox="0 0 26 32"
            fill="none"
          >
            <path
              d="M24.917 0C25.5151 0.000172669 25.9999 0.477529 26 1.06641V30.9336C25.9999 31.5225 25.5151 31.9998 24.917 32H7.58301C6.98494 31.9998 6.50014 31.5225 6.5 30.9336V26.667C6.5 26.078 6.01515 25.5998 5.41699 25.5996H1.08301C0.484849 25.5994 0 25.1222 0 24.5332V1.06641C0.000143197 0.477529 0.484937 0.000173176 1.08301 0H24.917ZM14.083 6.40039C13.4848 6.40054 13 6.87779 13 7.4668V11.7334C12.9999 12.304 12.5441 12.7703 11.9717 12.7988L11.917 12.7998H7.58301C6.98491 12.8 6.49492 13.2793 6.54395 13.8662C7.06486 20.0849 12.1011 25.0438 18.417 25.5566C19.0132 25.605 19.5 25.1223 19.5 24.5332V20.2666C19.5 19.6777 19.0151 19.2004 18.417 19.2002H14.083C13.485 19.2 13.0003 18.7226 13 18.1338V13.8662C13.0003 13.2774 13.485 12.8 14.083 12.7998H18.417C19.0151 12.7996 19.5 12.3223 19.5 11.7334V7.4668C19.5 6.87782 19.0151 6.4006 18.417 6.40039H14.083Z"
              fill={iconColor}
            />
          </svg>
          <span>{name}</span>
        </div>
      ) : (
        <span>none</span>
      )}
    </TokenGrid.RowItem>
  );
};

export const ForegroundUpdates = () => {
  const {foreground} = updatedSystemTokens;
  const names = Object.keys(foreground);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginBlock: '2rem'}}>
      {names.map(name => (
        <TokenGrid
          caption={`${name} Foreground Tokens`.toUpperCase()}
          headings={['Token Name', 'Old Value', 'New Value', 'Change']}
          rows={foreground[name]}
        >
          {(token: any) => (
            <>
              <TokenGrid.RowItem>{token.name}</TokenGrid.RowItem>
              <Swatch color={token.oldColor} name={token.old} withWhiteText={token.withWhiteText} />
              <Swatch color={token.new} withWhiteText={token.withWhiteText} />
              <TokenGrid.RowItem>
                {!token.old ? '➕Added' : !token.new ? '❌ Removed' : '✅ Updated'}
              </TokenGrid.RowItem>
            </>
          )}
        </TokenGrid>
      ))}
    </div>
  );
};

export const TextUpdates = () => {
  const {text} = updatedSystemTokens;
  const names = Object.keys(text);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginBlock: '2rem'}}>
      {names.map(name => (
        <TokenGrid
          caption={`${name} Text Tokens`.toUpperCase()}
          headings={['Token Name', 'Old Value', 'New Value', 'Change']}
          rows={text[name]}
        >
          {(token: any) => (
            <>
              <TokenGrid.RowItem>{token.name}</TokenGrid.RowItem>
              <TextBlock token={token.name} name={token.old} color={token.oldColor} />
              <TextBlock token={token.name} name={token.new} color={token.new} />
              <TokenGrid.RowItem>
                {!token.old ? 'Added' : !token.new ? 'Removed' : 'Updated'}
              </TokenGrid.RowItem>
            </>
          )}
        </TokenGrid>
      ))}
    </div>
  );
};

export const IconUpdates = () => {
  const {icon} = updatedSystemTokens;
  const names = Object.keys(icon);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', marginBlock: '2rem'}}>
      {names.map(name => (
        <TokenGrid
          caption={`${name} Icon Tokens`.toUpperCase()}
          headings={['Token Name', 'Old Value', 'New Value', 'Change']}
          rows={icon[name]}
        >
          {(token: any) => (
            <>
              <TokenGrid.RowItem>{token.name}</TokenGrid.RowItem>
              <IconBlock token={token.name} name={token.old} color={token.oldColor} />
              <IconBlock token={token.name} name={token.new} color={token.new} />
              <TokenGrid.RowItem>
                {!token.old ? '➕Added' : !token.new ? '❌ Removed' : '✅ Updated'}
              </TokenGrid.RowItem>
            </>
          )}
        </TokenGrid>
      ))}
    </div>
  );
};
