import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface EasingToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The category of the easing */
  category: string;
  /** The type of easing */
  type: string;
}

const easingTokens: EasingToken[] = [
  {
    cssVar: base.easingA100,
    jsVar: formatJSVar('base.easingA100'),
    category: 'Quick',
    type: 'Standard',
  },
  {
    cssVar: base.easingA200,
    jsVar: formatJSVar('base.easingA200'),
    category: 'Quick',
    type: 'Acceleration',
  },
  {
    cssVar: base.easingA300,
    jsVar: formatJSVar('base.easingA300'),
    category: 'Quick',
    type: 'Deceleration',
  },
  {
    cssVar: base.easingB100,
    jsVar: formatJSVar('base.easingB100'),
    category: 'Purposeful',
    type: 'Standard',
  },
  {
    cssVar: base.easingB200,
    jsVar: formatJSVar('base.easingB200'),
    category: 'Purposeful',
    type: 'Acceleration',
  },
  {
    cssVar: base.easingB300,
    jsVar: formatJSVar('base.easingB300'),
    category: 'Purposeful',
    type: 'Deceleration',
  },
];

export function EasingTokens() {
  const [computedValues, setComputedValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const values: Record<string, string> = {};
    const element = document.createElement('div');
    document.body.appendChild(element);

    easingTokens.forEach(token => {
      const value = getComputedStyle(element).getPropertyValue(token.cssVar);
      values[token.cssVar] = value.trim();
    });

    document.body.removeChild(element);
    setComputedValues(values);
  }, []);

  return (
    <TokenGrid
      caption="easing tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value', 'Category', 'Type']}
      rows={easingTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample>
              <div
                style={{
                  width: `var(${system.size.xs})`,
                  height: `var(${system.size.xs})`,
                  borderRadius: `var(${system.shape.round})`,
                  backgroundColor: `var(${system.color.bg.primary.default})`,
                  animation: `ease-slide 2300ms var(${token.cssVar}) infinite`,
                }}
              />
              <style>{`
                @keyframes ease-slide {
                  0%, 35%, 100% { transform: translateX(0); }
                  17.5% { transform: translateX(60px); }
                }
              `}</style>
            </TokenGrid.Sample>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{computedValues[token.cssVar] || '...'}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>{token.category}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.type}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
