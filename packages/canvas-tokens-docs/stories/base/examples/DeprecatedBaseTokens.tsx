import * as React from 'react';
import * as baseTokens from '@workday/canvas-tokens-web/dist/es6/base';
import {system} from '@workday/canvas-tokens-web';
import deprecatedBaseTokens from '../../../../canvas-tokens/tokens/deprecated/base.json';

import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';
import {buildColorSwatch, ColorSwatch, formatName, getSwatchStyles} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

// Helper to get the replacement token path from the deprecated base JSON
function getDeprecatedBaseTokenValue(tokenPath: string): string | undefined {
  const pathWithoutBase = tokenPath.replace(/^base\./, '');
  const pathParts = pathWithoutBase.split('.');
  let current: any = deprecatedBaseTokens.base;

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (part === 'palette' && i + 1 < pathParts.length) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
        const kebabKey = pathParts[i + 1]
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase();
        if (current && typeof current === 'object' && kebabKey in current) {
          current = current[kebabKey];
          i++;
          continue;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
  }

  if (
    current &&
    typeof current === 'object' &&
    'deprecated' in current &&
    current.deprecated === true &&
    'value' in current
  ) {
    const value = current.value as string;
    if (value.startsWith('{') && value.endsWith('}')) {
      return value.slice(1, -1);
    }
  }
  return undefined;
}

// Deprecated unit token
const deprecatedUnitTokens = [buildColorSwatch(baseTokens.baseUnit, 'base.unit')];

// Deprecated opacity tokens
const deprecatedOpacityTokens = [
  buildColorSwatch(baseTokens.opacity100, 'base.opacity.100'),
  buildColorSwatch(baseTokens.opacity250, 'base.opacity.250'),
  buildColorSwatch(baseTokens.opacity300, 'base.opacity.300'),
  buildColorSwatch(baseTokens.opacity500, 'base.opacity.500'),
];

// Deprecated palette color tokens
const deprecatedPaletteNames = [
  'cinnamon',
  'peach',
  'chiliMango',
  'cantaloupe',
  'sourLemon',
  'juicyPear',
  'kiwi',
  'greenApple',
  'watermelon',
  'jewel',
  'toothpaste',
  'blueberry',
  'plum',
  'berrySmoothie',
  'blackberry',
  'islandPunch',
  'grapeSoda',
  'pomegranate',
  'fruitPunch',
  'rootBeer',
  'toastedMarshmallow',
  'licorice',
  'soap',
  'frenchVanilla',
  'blackPepper',
  'coconut',
  'cappuccino',
] as const;

const deprecatedPalettePalettes = deprecatedPaletteNames.map(paletteName => ({
  name: paletteName,
  values: Object.entries(baseTokens)
    .filter(([key]) => new RegExp(`^${paletteName}(\\d+)$`).test(key))
    .map(([key, varName]) =>
      buildColorSwatch(
        varName as string,
        `base.palette.${paletteName}.${key.replace(paletteName, '')}`
      )
    ),
}));

// Extended palette (dragon-fruit)
const deprecatedExtendedPalette = {
  name: 'extended.dragonFruit',
  values: Object.entries(baseTokens)
    .filter(([key]) => /^extendedDragonFruit(\d+)$/.test(key))
    .map(([key, varName]) =>
      buildColorSwatch(
        varName as string,
        `base.extended.palette.dragon-fruit.${key.replace('extendedDragonFruit', '')}`
      )
    ),
};

const deprecatedPalettes = [
  {name: 'unit', values: deprecatedUnitTokens},
  {name: 'opacity', values: deprecatedOpacityTokens},
  ...deprecatedPalettePalettes,
  deprecatedExtendedPalette,
].filter(palette => palette.values.length > 0);

function getPixelValue(remValue: string) {
  return `${Number(remValue.replace('rem', '')) * 16}px`;
}

/** Stacked CSS + JS variable chips, shared across all row variants */
const VariablesCell = ({
  token,
}: {
  token: ColorSwatch;
}) => (
  <TokenGrid.RowItem>
    <div className="token-grid__var-row">
      <span className="token-grid__var-badge">CSS</span>
      <TokenGrid.MonospaceLabel isDeprecated copyText={token.cssVar}>
        {token.cssVar}
      </TokenGrid.MonospaceLabel>
    </div>
    <div className="token-grid__var-row">
      <span className="token-grid__var-badge">JS</span>
      <TokenGrid.MonospaceLabel isDeprecated copyText={token.jsVarRaw}>
        {token.jsVar}
      </TokenGrid.MonospaceLabel>
    </div>
  </TokenGrid.RowItem>
);

/** Replacement chip, shared across all row variants */
const ReplacementCell = ({replacement}: {replacement?: string}) => (
  <TokenGrid.RowItem>
    {replacement ? (
      <TokenGrid.MonospaceLabel copyText={replacement}>
        {formatJSVar(replacement)}
      </TokenGrid.MonospaceLabel>
    ) : (
      <span>—</span>
    )}
  </TokenGrid.RowItem>
);

// All tables share the same 4-column heading: visual | variables | value | replacement
const HEADINGS = ['Swatch', 'Variables', 'Value', 'Replacement'];
const UNIT_HEADINGS = ['Sample', 'Variables', 'Value (rem / px)', 'Replacement'];

export const DeprecatedBaseTokens = () => (
  <Stack>
    {deprecatedPalettes.map(palette => {
      const tokensWithReplacements = palette.values.map(token => ({
        ...token,
        replacement: getDeprecatedBaseTokenValue(token.jsVarRaw),
        pxValue:
          palette.name === 'unit'
            ? getPixelValue(
                getComputedStyle(document.documentElement).getPropertyValue(token.cssVar)
              )
            : undefined,
      }));

      return (
        <TokenGrid
          key={palette.name}
          caption={formatName(palette.name)}
          headings={palette.name === 'unit' ? UNIT_HEADINGS : HEADINGS}
          rows={tokensWithReplacements}
        >
          {(token: ColorSwatch & {replacement?: string; pxValue?: string}) => {
            if (palette.name === 'unit') {
              return (
                <>
                  <TokenGrid.RowItem>
                    <TokenGrid.Sample
                      style={{
                        width: `var(${token.cssVar})`,
                        backgroundColor: `var(${system.color.bg.primary.default})`,
                      }}
                    />
                  </TokenGrid.RowItem>
                  <VariablesCell token={token} />
                  {/* Combine rem value + px conversion in one cell */}
                  <TokenGrid.RowItem>
                    <span>{token.value || 'none'}</span>
                    {token.pxValue && (
                      <span style={{color: 'var(--cnvs-sys-color-text-subdued)', fontSize: '0.75rem'}}>
                        {token.pxValue}
                      </span>
                    )}
                  </TokenGrid.RowItem>
                  <ReplacementCell replacement={token.replacement} />
                </>
              );
            }

            if (palette.name === 'opacity') {
              return (
                <>
                  <TokenGrid.RowItem>
                    <TokenGrid.Swatch
                      style={{
                        backgroundColor: `var(${system.color.bg.primary.default})`,
                        opacity: `var(${token.cssVar})`,
                      }}
                    />
                  </TokenGrid.RowItem>
                  <VariablesCell token={token} />
                  <TokenGrid.RowItem>
                    <span>{token.value || 'none'}</span>
                  </TokenGrid.RowItem>
                  <ReplacementCell replacement={token.replacement} />
                </>
              );
            }

            return (
              <>
                <TokenGrid.RowItem>
                  <TokenGrid.Swatch style={getSwatchStyles(token)} />
                </TokenGrid.RowItem>
                <VariablesCell token={token} />
                <TokenGrid.RowItem>
                  <span>{token.value || 'none'}</span>
                </TokenGrid.RowItem>
                <ReplacementCell replacement={token.replacement} />
              </>
            );
          }}
        </TokenGrid>
      );
    })}
  </Stack>
);
