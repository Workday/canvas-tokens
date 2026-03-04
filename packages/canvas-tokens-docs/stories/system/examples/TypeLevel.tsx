import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface TypeLevelToken {
  /** The name of the CSS class */
  cssClass: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The CSS var values for the CSS class */
  values: string;
  /** The formatted values for CSS Vars to render the type sample */
  formattedValues: object;
}

function getCSSVarValue(varName: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).replace(/"/g, '');
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

// Deprecated size names that should be filtered out (use t-shirt sizes sm, md, lg instead)
const deprecatedSizeNames = ['small', 'medium', 'large'];

const typeLevelTokens = Object.keys(system.type).reduce((acc, level) => {
  const levelTokens = Object.entries(system.type[level as keyof typeof system.type])
    .filter(([size]) => !deprecatedSizeNames.includes(size)) // Filter out deprecated size names
    .map(([size, values]) => {
      return {
        cssClass: `.cnvs-sys-type-${level}-${size}`,
        jsVar: formatJSVar(`system.type.${level}.${size}`),
        values: values,
        formattedValues: formatTypeLevelValues(values),
      };
    });
  return acc.concat(levelTokens);
}, [] as TypeLevelToken[]);

export function TypeLevelTokens() {
  return (
    <TokenGrid
      caption="Type Level Tokens"
      headings={['Sample', 'CSS Class', 'JS Variable', 'CSS Variables (Values)']}
      rows={typeLevelTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <span style={{...token.formattedValues, fontFamily: 'var(--cnvs-base-font-family-50)'}}>
              Canvas
            </span>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.cssClass}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            {Object.values(token.values).map((value, index) => (
              <span key={index}>
                {value} ({getCSSVarValue(value)})
              </span>
            ))}
          </TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
