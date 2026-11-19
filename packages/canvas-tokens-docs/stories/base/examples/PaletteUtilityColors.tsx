import React from 'react';
import {ThemeControl} from '../../../components/ThemeControl';
import {ColorPaletteCard} from '../../../components/ColorPaletteCard';

const PaletteUtilityColors = () => {
  return (
    <ThemeControl stack="horizontal">
      <ColorPaletteCard colorFamily="black" isAlpha />
      <ColorPaletteCard colorFamily="white" isAlpha />
    </ThemeControl>
  );
};

export default PaletteUtilityColors;
