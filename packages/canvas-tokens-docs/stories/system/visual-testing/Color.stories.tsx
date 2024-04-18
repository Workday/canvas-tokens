import {
  BackgroundColors,
  BackgroundAlternateColors,
  BackgroundMutedColors,
  BackgroundContrastColors,
  BackgroundStatusColors,
} from '../examples/Color/Background';
import {
  BorderColors,
  BorderContrastColors,
  BorderInputColors,
  BorderStatusColors,
} from '../examples/Color/Border';
import {ForegroundColors, ForegroundStatusColors} from '../examples/Color/Foreground';
import {IconColors, IconPrimaryColors, IconStatusColors} from '../examples/Color/Icon';
import {ShadowColors} from '../examples/Color/Shadow';
import {StaticColors} from '../examples/Color/Static';
import {TextColors, TextStatusColors} from '../examples/Color/Text';

export default {
  title: 'Visual Tests/System Tokens/Colors',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

// BACKGROUND COLORS TESTS
export const Background = {
  render: BackgroundColors,
};

export const BackgroundAlternate = {
  render: BackgroundAlternateColors,
};

export const BackgroundMuted = {
  render: BackgroundMutedColors,
};

export const BackgroundContrast = {
  render: BackgroundContrastColors,
};

export const BackgroundStatus = {
  render: BackgroundStatusColors,
};

// BORDER COLORS TESTS
export const Border = {
  render: BorderColors,
};
export const BorderContrast = {
  render: BorderContrastColors,
};
export const BorderInput = {
  render: BorderInputColors,
};
export const BorderStatus = {
  render: BorderStatusColors,
};

// FOREGROUND COLORS TESTS

export const Foreground = {
  render: ForegroundColors,
};
export const ForegroundStatus = {
  render: ForegroundStatusColors,
};

// ICON COLORS TESTS

export const Icon = {
  render: IconColors,
};
export const IconPrimary = {
  render: IconPrimaryColors,
};
export const IconStatus = {
  render: IconStatusColors,
};

// SHADOW COLORS TESTS
export const Shadow = {
  render: ShadowColors,
};

// STATIC COLORS TESTS
export const Static = {
  render: StaticColors,
};

// TEXT COLORS TESTS
export const Text = {
  render: TextColors,
};

export const TextStatus = {
  render: TextStatusColors,
};
