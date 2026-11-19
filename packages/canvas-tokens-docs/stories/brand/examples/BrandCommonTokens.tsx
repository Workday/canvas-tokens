import React from 'react';
import {TokenTable} from '../../../components/TokenTable';
import {ThemeControl} from '../../../components/ThemeControl';

export const BrandCommonTokens = () => (
  <ThemeControl>
    <TokenTable group="brand.common" />
  </ThemeControl>
);
