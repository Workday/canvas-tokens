import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';

import {Theme} from '../ThemeControl';
import {CodeBlock} from '../CodeBlock';
import {resolveColor} from './resolveColor';
import {getCssVar} from './tokenNames';
import {SDToken} from './types';

/** Matches a color whose alpha is below 1, e.g. `oklch(0.5 0.1 200 / 40%)`. */
const hasAlphaChannel = (color: string) => /\/\s*(?!1(\.0+)?\s*\))[\d.]+%?\s*\)/.test(color);

type SwatchCellProps = {
  token: SDToken;
  isDark?: boolean;
  theme?: Theme;
  /** Attached to the swatch so the row can read its computed color. */
  swatchRef: React.Ref<HTMLDivElement>;
  /** The computed color of the swatch, once measured. */
  computed?: string;
};

export const SwatchCell = ({token, isDark, theme, swatchRef, computed}: SwatchCellProps) => {
  const isGradient = token.$type === 'gradient' || token.$value?.startsWith('linear-gradient');
  // Gradients have no single reference (`original.$value` is a list of stops), so use the token itself
  const {value, ref} = resolveColor(token, theme, isDark);

  // Semi-transparent colors get a checkerboard backdrop so the alpha is visible
  const hasAlpha = !isGradient && hasAlphaChannel(computed ?? value);

  return (
    <div className="swatch-cell">
      <Card data-part="swatch" data-alpha={hasAlpha ? 'true' : undefined}>
        <div ref={swatchRef} data-part="swatch-color" style={{background: getCssVar(token)}} />
      </Card>
      {!isGradient && <CodeBlock>{ref}</CodeBlock>}
    </div>
  );
};
