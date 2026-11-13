import {PaletteColorsExample} from '../examples/TestPaletteColors';
import {PaletteDarkColorsExample} from '../examples/TestPaletteDarkColors';

export default {
  title: 'Visual Tests/Base Tokens',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const PaletteColors = {
  render: PaletteColorsExample,
};

export const PaletteDarkColors = {
  render: PaletteDarkColorsExample,
};
