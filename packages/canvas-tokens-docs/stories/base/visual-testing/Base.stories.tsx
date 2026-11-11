import PaletteSolidColors from '../examples/PaletteSolidColors';
import PaletteAlphaColors from '../examples/PaletteAlphaColors';
import PaletteNeutralColors from '../examples/PaletteNeutralColors';

export default {
  title: 'Visual Tests/Base Tokens',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const SolidColors = {
  render: PaletteSolidColors,
};

export const AlphaColors = {
  render: PaletteAlphaColors,
};

export const NeutralColors = {
  render: PaletteNeutralColors,
};
