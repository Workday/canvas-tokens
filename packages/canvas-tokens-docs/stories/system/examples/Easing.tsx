import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface EasingToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
  /** The category of the easing */
  category: string;
  /** The type of easing */
  type: string;
}

const easingTokens: EasingToken[] = [
  {
    cssVar: system.motion.easing.quick.standard,
    jsVar: formatJSVar('system.motion.easing.quick.standard'),
    value: 'cubic-bezier(0.2, 0, 0.2, 1)',
    category: 'Quick',
    type: 'Standard',
  },
  {
    cssVar: system.motion.easing.quick.acceleration,
    jsVar: formatJSVar('system.motion.easing.quick.acceleration'),
    value: 'cubic-bezier(0.4, 0, 0.95, 0.8)',
    category: 'Quick',
    type: 'Acceleration',
  },
  {
    cssVar: system.motion.easing.quick.deceleration,
    jsVar: formatJSVar('system.motion.easing.quick.deceleration'),
    value: 'cubic-bezier(0.05, 0.4, 0.3, 1)',
    category: 'Quick',
    type: 'Deceleration',
  },
  {
    cssVar: system.motion.easing.purposeful.standard,
    jsVar: formatJSVar('system.motion.easing.purposeful.standard'),
    value: 'cubic-bezier(0.35, 0, 0.05, 1)',
    category: 'Purposeful',
    type: 'Standard',
  },
  {
    cssVar: system.motion.easing.purposeful.acceleration,
    jsVar: formatJSVar('system.motion.easing.purposeful.acceleration'),
    value: 'cubic-bezier(0.4, 0, 0.8, 0.3)',
    category: 'Purposeful',
    type: 'Acceleration',
  },
  {
    cssVar: system.motion.easing.purposeful.deceleration,
    jsVar: formatJSVar('system.motion.easing.purposeful.deceleration'),
    value: 'cubic-bezier(0, 0.4, 0.2, 1)',
    category: 'Purposeful',
    type: 'Deceleration',
  },
];

export function EasingTokens() {
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
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#0875e1',
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
            <TokenGrid.MonospaceLabel>{token.value}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>{token.category}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.type}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
