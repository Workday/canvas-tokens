import {SizeTokens, PaddingTokens, GapTokens} from '../examples/Space';

export default {
  component: SizeTokens,
  title: 'Visual Tests/System Tokens',
};

export const Size = {
  component: SizeTokens,
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const Padding = {
  component: PaddingTokens,
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const Gap = {
  component: GapTokens,
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};
