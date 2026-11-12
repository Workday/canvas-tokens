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
  {cssVar: system.motion.duration.instant, jsVar: formatJSVar('system.motion.duration.instant')},
  {cssVar: system.motion.duration.short, jsVar: formatJSVar('system.motion.duration.short')},
  {cssVar: system.motion.duration.medium, jsVar: formatJSVar('system.motion.duration.medium')},
  {cssVar: system.motion.duration.long, jsVar: formatJSVar('system.motion.duration.long')},
  {cssVar: system.motion.duration.xlong, jsVar: formatJSVar('system.motion.duration.xlong')},
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
