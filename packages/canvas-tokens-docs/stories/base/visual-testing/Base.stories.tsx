import {PaletteColorsExample} from '../examples/TestPaletteColors';
import {PaletteDarkColorsExample} from '../examples/TestPaletteDarkColors';
import {
  BaseSizeExample,
  BaseOpacityExample,
  BaseMotionExample,
  BaseTypeExample,
} from '../examples/TestBaseTokens';

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

export const Size = {
  render: BaseSizeExample,
};

export const Opacity = {
  render: BaseOpacityExample,
};

export const Motion = {
  render: BaseMotionExample,
};

export const Type = {
  render: BaseTypeExample,
};
