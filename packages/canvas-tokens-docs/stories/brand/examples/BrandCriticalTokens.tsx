import React from 'react';
import {TokenTable} from '../../../components/TokenTable';
import {ThemeControl} from '../../../components/ThemeControl';

export const BrandCriticalTokens = () => (
  <ThemeControl>
    <TokenTable group="brand.critical" type="color" />
  </ThemeControl>
);
