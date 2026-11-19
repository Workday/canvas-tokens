import React from 'react';
import {TokenTable} from '../../../components/TokenTable';
import {ThemeControl} from '../../../components/ThemeControl';

export const BrandPrimaryTokens = () => (
  <ThemeControl>
    <TokenTable group="brand.primary" />
  </ThemeControl>
);
