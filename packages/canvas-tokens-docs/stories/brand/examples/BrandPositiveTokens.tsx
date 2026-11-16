import React from 'react';
import {TokenTable} from '../../../components/TokenTable';
import {ThemeControl} from '../../../components/ThemeControl';

export const BrandPositiveTokens = () => (
  <ThemeControl>
    <TokenTable group="brand.positive" type="color" />
  </ThemeControl>
);
