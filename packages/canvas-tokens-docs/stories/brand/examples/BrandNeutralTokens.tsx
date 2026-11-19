import React from 'react';
import {TokenTable} from '../../../components/TokenTable';
import {ThemeControl} from '../../../components/ThemeControl';

export const BrandNeutralTokens = () => (
  <ThemeControl>
    <TokenTable group="brand.neutral" />
  </ThemeControl>
);
