import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface DurationToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
}

const durationTokens: DurationToken[] = [
  {cssVar: system.motion.duration.instant1, jsVar: formatJSVar('system.motion.duration.instant1')},
  {cssVar: system.motion.duration.instant2, jsVar: formatJSVar('system.motion.duration.instant2')},
  {cssVar: system.motion.duration.short1, jsVar: formatJSVar('system.motion.duration.short1')},
  {cssVar: system.motion.duration.short2, jsVar: formatJSVar('system.motion.duration.short2')},
  {cssVar: system.motion.duration.medium1, jsVar: formatJSVar('system.motion.duration.medium1')},
  {cssVar: system.motion.duration.medium2, jsVar: formatJSVar('system.motion.duration.medium2')},
  {cssVar: system.motion.duration.long1, jsVar: formatJSVar('system.motion.duration.long1')},
  {cssVar: system.motion.duration.xlong1, jsVar: formatJSVar('system.motion.duration.xlong1')},
];

export function DurationTokens() {
  const [computedValues, setComputedValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const values: Record<string, string> = {};
    const element = document.createElement('div');
    document.body.appendChild(element);

    durationTokens.forEach(token => {
      const value = getComputedStyle(element).getPropertyValue(token.cssVar);
      values[token.cssVar] = value.trim();
    });

    document.body.removeChild(element);
    setComputedValues(values);
  }, []);

  return (
    <TokenGrid
      caption="system duration tokens"
      headings={['CSS Variable', 'JS Variable', 'Value']}
      rows={durationTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>{computedValues[token.cssVar] || '...'}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
