import React from 'react';
import {Heading, Subtext} from '@workday/canvas-kit-react/text';
import {Table} from '@workday/canvas-kit-react/table';

import {Theme} from '../ThemeControl';
import {oklchToHex, oklchToRgba} from '../../util';
import {MultiValueBlock, ValueItem} from './MultiValueBlock';
import {getMobileTokenName} from './mobileNames';
import {resolveColor} from './resolveColor';
import {cleanTitle, formatTypography, getCssVar, getDimensionPx, getJsName} from './tokenNames';
import {SDToken, TokenLevel} from './types';

const isPresent = (item: ValueItem) => Boolean(item.value);

type DescriptionCellProps = {
  token: SDToken;
  group: string;
  level?: TokenLevel;
  theme?: Theme;
  isDark?: boolean;
  /** The computed oklch color of the token, read from the rendered swatch. */
  computed?: string;
};

export const DescriptionCell = ({
  token,
  group,
  level,
  theme,
  isDark,
  computed,
}: DescriptionCellProps) => {
  const name = getJsName(token, level);
  const cssVar = getCssVar(token, level);

  const getComputedItems = (): ValueItem[] => {
    switch (token.$type) {
      case 'color': {
        // Prefer the color the browser computed from the CSS; fall back to the token data until measured
        const color = computed ?? resolveColor(token, theme, isDark).value;
        return [
          {id: 'oklch', value: color},
          {id: 'hex', value: oklchToHex(color)},
          {id: 'rgba', value: oklchToRgba(color)},
        ];
      }
      case 'typography':
        return [{id: 'value', value: formatTypography(token.$value)}];
      case 'dimension':
        return [
          {id: 'value', value: String(token.$value)},
          {id: 'px', value: getDimensionPx(token)},
        ].filter(isPresent);
      default:
        return [{id: 'value', value: String(token.$value)}].filter(isPresent);
    }
  };

  const usageItems: ValueItem[] = [
    {id: 'js', value: `token('${name}')`},
    {id: token.$type === 'typography' ? 'class' : 'css', value: cssVar},
    {id: 'mobile', value: getMobileTokenName(group, token.path)},
  ].filter(isPresent);

  return (
    <Table.Cell className="token-description-cell">
      <Heading size="small">{cleanTitle(name)}</Heading>
      <Subtext size="large">{token.$description || <i>No description available</i>}</Subtext>
      <div className="token-values">
        <MultiValueBlock title="Computed Values" items={getComputedItems()} />
        <MultiValueBlock title="Usage" items={usageItems} />
      </div>
    </Table.Cell>
  );
};
