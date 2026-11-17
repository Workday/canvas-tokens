import React from 'react';
import {BrandColorsExample} from './TestBrandColors';
import {BrandDarkColorsExample} from './TestBrandDarkColors';

export default {
  title: 'Visual Tests/Brand Tokens',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const BrandColors = () => <BrandColorsExample />;
export const BrandDarkColors = () => <BrandDarkColorsExample />;
