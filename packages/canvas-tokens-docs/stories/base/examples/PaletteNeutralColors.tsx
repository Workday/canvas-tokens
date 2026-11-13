import React from 'react';
import {ThemeControl} from '../../../components/ThemeControl';
import {ColorPaletteCard} from '../../../components/ColorPaletteCard';

const PaletteNeutralColors = () => {
  return (
    <ThemeControl stack="horizontal">
      <ColorPaletteCard colorFamily="neutral" />
      <ColorPaletteCard colorFamily="slate" />
      <ColorPaletteCard colorFamily="neutral" isAlpha />
      <ColorPaletteCard colorFamily="slate" isAlpha />
      <ColorPaletteCard colorFamily="black" isAlpha />
      <ColorPaletteCard colorFamily="white" isAlpha />
    </ThemeControl>
  );
};

export default PaletteNeutralColors;
