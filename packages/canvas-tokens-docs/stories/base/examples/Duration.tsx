import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface DurationToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
}

const durationTokens: DurationToken[] = [
  {cssVar: base.duration50, jsVar: formatJSVar('base.duration50')},
  {cssVar: base.duration100, jsVar: formatJSVar('base.duration100')},
  {cssVar: base.duration150, jsVar: formatJSVar('base.duration150')},
  {cssVar: base.duration200, jsVar: formatJSVar('base.duration200')},
  {cssVar: base.duration250, jsVar: formatJSVar('base.duration250')},
  {cssVar: base.duration300, jsVar: formatJSVar('base.duration300')},
  {cssVar: base.duration350, jsVar: formatJSVar('base.duration350')},
  {cssVar: base.duration400, jsVar: formatJSVar('base.duration400')},
  {cssVar: base.duration450, jsVar: formatJSVar('base.duration450')},
  {cssVar: base.duration500, jsVar: formatJSVar('base.duration500')},
  {cssVar: base.duration550, jsVar: formatJSVar('base.duration550')},
  {cssVar: base.duration600, jsVar: formatJSVar('base.duration600')},
  {cssVar: base.duration650, jsVar: formatJSVar('base.duration650')},
  {cssVar: base.duration700, jsVar: formatJSVar('base.duration700')},
  {cssVar: base.duration750, jsVar: formatJSVar('base.duration750')},
  {cssVar: base.duration800, jsVar: formatJSVar('base.duration800')},
  {cssVar: base.duration850, jsVar: formatJSVar('base.duration850')},
  {cssVar: base.duration900, jsVar: formatJSVar('base.duration900')},
  {cssVar: base.duration950, jsVar: formatJSVar('base.duration950')},
  {cssVar: base.duration1000, jsVar: formatJSVar('base.duration1000')},
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
      caption="duration tokens"
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
