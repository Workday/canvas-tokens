import {ColorTokens, DeprecatedColorTokens} from '../examples/Color';

export default {
  component: ColorTokens,
  title: 'Visual Tests/Brand Tokens',
};

export const Color = {
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const DeprecatedColor = {
  render: DeprecatedColorTokens,
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};
