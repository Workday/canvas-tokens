import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface DurationToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
}

const durationTokens: DurationToken[] = [
  {cssVar: base.duration50, jsVar: formatJSVar('base.duration50'), value: '50ms'},
  {cssVar: base.duration100, jsVar: formatJSVar('base.duration100'), value: '100ms'},
  {cssVar: base.duration150, jsVar: formatJSVar('base.duration150'), value: '150ms'},
  {cssVar: base.duration200, jsVar: formatJSVar('base.duration200'), value: '200ms'},
  {cssVar: base.duration250, jsVar: formatJSVar('base.duration250'), value: '250ms'},
  {cssVar: base.duration300, jsVar: formatJSVar('base.duration300'), value: '300ms'},
  {cssVar: base.duration350, jsVar: formatJSVar('base.duration350'), value: '350ms'},
  {cssVar: base.duration400, jsVar: formatJSVar('base.duration400'), value: '400ms'},
  {cssVar: base.duration450, jsVar: formatJSVar('base.duration450'), value: '450ms'},
  {cssVar: base.duration500, jsVar: formatJSVar('base.duration500'), value: '500ms'},
  {cssVar: base.duration550, jsVar: formatJSVar('base.duration550'), value: '550ms'},
  {cssVar: base.duration600, jsVar: formatJSVar('base.duration600'), value: '600ms'},
  {cssVar: base.duration650, jsVar: formatJSVar('base.duration650'), value: '650ms'},
  {cssVar: base.duration700, jsVar: formatJSVar('base.duration700'), value: '700ms'},
  {cssVar: base.duration750, jsVar: formatJSVar('base.duration750'), value: '750ms'},
  {cssVar: base.duration800, jsVar: formatJSVar('base.duration800'), value: '800ms'},
  {cssVar: base.duration850, jsVar: formatJSVar('base.duration850'), value: '850ms'},
  {cssVar: base.duration900, jsVar: formatJSVar('base.duration900'), value: '900ms'},
  {cssVar: base.duration950, jsVar: formatJSVar('base.duration950'), value: '950ms'},
  {cssVar: base.duration1000, jsVar: formatJSVar('base.duration1000'), value: '1000ms'},
];

export function DurationTokens() {
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

          <TokenGrid.RowItem>{token.value}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
