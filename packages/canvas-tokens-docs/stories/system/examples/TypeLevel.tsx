import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

interface TypeLevelToken {
  label: string;
  values: object;
  computedValues: object;
  formattedValues: object;
}

function getComputedStyleValues(values: object) {
  const styles = getComputedStyle(document.documentElement);
  let computedStyleValues = {};
  for (const key in values) {
    if (key in values) {
      const value = styles.getPropertyValue(values[key as keyof typeof values]);
      computedStyleValues = {...computedStyleValues, [key]: value};
    }
  }
  return computedStyleValues;
}

function formatTypeLevelValues(values: object) {
  let formattedValues = {};
  for (const key in values) {
    if (key in values) {
      formattedValues = {...formattedValues, [key]: `var(${values[key as keyof typeof values]})`};
    }
  }
  return formattedValues;
}

const typeLevelTokens = Object.keys(system.type).reduce((acc, level) => {
  const levelTokens = Object.entries(system.type[level as keyof typeof system.type]).map(
    ([size, values]) => {
      return {
        label: `.cnvs-sys-type-${level}-${size}`,
        values: values,
        formattedValues: formatTypeLevelValues(values),
        computedValues: getComputedStyleValues(values),
      };
    }
  );
  return acc.concat(levelTokens);
}, [] as TypeLevelToken[]);

export function TypeLevelTokens() {
  return (
    <TokenGrid
      caption="Type Level Tokens"
      headings={['Sample', 'CSS Class', 'Values', 'Computed Values']}
      rows={typeLevelTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <span style={{...token.formattedValues}}>Canvas</span>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.label}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            {Object.values(token.values).map((value, index) => (
              <TokenGrid.MonospaceLabel key={index}>{value}</TokenGrid.MonospaceLabel>
            ))}
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            {Object.entries(token.computedValues).map(([name, value], index) => (
              <TokenGrid.MonospaceLabel key={index}>
                {name}: {value}
              </TokenGrid.MonospaceLabel>
            ))}
          </TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
