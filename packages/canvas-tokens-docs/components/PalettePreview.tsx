import * as React from 'react';

const paletteColors = [
  'header',
  'amber',
  'azure',
  'blue',
  'coral',
  'green',
  'indigo',
  'orange',
  'magenta',
  'purple',
  'red',
  'slate',
  'teal',
];

const paletteNumbers = [
  'header',
  '25',
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
  '975',
];

const Swatch = ({color, number}: {color: string; number: string}) => {
  return (
    <div
      style={{
        backgroundColor: `var(--cnvs-base-palette-${color}-${number})`,
        color: color !== 'header' ? 'transparent' : 'black',
        padding: '8px 16px',
        border: '1px solid transparent',
        borderColor:
          parseInt(number) < 200 && color !== 'header'
            ? 'var(--cnvs-sys-color-border-divider)'
            : 'transparent',
      }}
    >
      {number.toString().replace('header', '')}
    </div>
  );
};

const ColorRow = ({color, numbers}: {color: string; numbers: string[]}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numbers.length}, minmax(10px, 1fr))`,
        alignItems: 'center',
        textAlign: 'center',
        gap: '1px',
        marginBottom: '1px',
      }}
    >
      {numbers.map(number =>
        number === 'header' ? (
          color === 'header' ? (
            <div>{number.replace('header', '')}</div>
          ) : (
            <div style={{textAlign: 'end', paddingInlineEnd: '8px'}}>{color}</div>
          )
        ) : (
          <Swatch color={color} number={number} />
        )
      )}
    </div>
  );
};

/** A configuration of TokenGrid to quickly build tables for colors */
export function PalettePreview() {
  return (
    <div style={{fontSize: '14px', fontFamily: 'monospace'}}>
      {paletteColors.map(color => (
        <ColorRow color={color} numbers={paletteNumbers} />
      ))}
      <br />
      {['header', 'neutral'].map(color => {
        const numbers = ['header', '0', ...paletteNumbers.slice(1), '1000'];
        return <ColorRow color={color} numbers={numbers} />;
      })}
    </div>
  );
}
