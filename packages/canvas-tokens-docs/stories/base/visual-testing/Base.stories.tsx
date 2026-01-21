import {ColorTokens} from '../examples/Color';
import {DurationTokens} from '../examples/Duration';
import {EasingTokens} from '../examples/Easing';

export default {
  title: 'Visual Tests/Base Tokens',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const Colors = {
  render: ColorTokens,
};

export const Duration = {
  render: DurationTokens,
};

export const Easing = {
  render: EasingTokens,
};
