import {AccentColors, AccentMutedColors, AccentOverlayColors} from '../examples/Color/Accent';
import {
  BackgroundColors,
  BackgroundAlternateColors,
  BackgroundMutedColors,
  BackgroundContrastColors,
  BackgroundStatusColors,
  BackgroundAIColors,
  BackgroundPrimaryColors,
} from '../examples/Color/Background';
import {
  BorderColors,
  BorderContrastColors,
  BorderInputColors,
  BorderStatusColors,
} from '../examples/Color/Border';
import {
  BrandFocusColors,
  BrandSurfaceColors,
  BrandAccentColors,
  BrandFgColors,
  BrandBorderColors,
} from '../examples/Color/Brand';
import {FocusColors} from '../examples/Color/Focus';
import {
  ForegroundColors,
  ForegroundAIColors,
  ForegroundContrastColors,
  ForegroundMutedColors,
  ForegroundPrimaryColors,
  ForegroundStatusColors,
} from '../examples/Color/Foreground';
import {IconColors, IconPrimaryColors, IconStatusColors} from '../examples/Color/Icon';
import {ShadowColors} from '../examples/Color/Shadow';
import {
  SurfaceColors,
  SurfaceAltColors,
  SurfaceContrastColors,
  SurfaceOverlayColors,
  SurfaceStatusColors,
  SurfaceAIColors,
} from '../examples/Color/Surface';
import {TextColors, TextStatusColors, TextPrimaryColors} from '../examples/Color/Text';

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

export const BackgroundAI = {
  render: BackgroundAIColors,
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

export const BackgroundPrimary = {
  render: BackgroundPrimaryColors,
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

export const ForegroundMuted = {
  render: ForegroundMutedColors,
};

export const ForegroundPrimary = {
  render: ForegroundPrimaryColors,
};

export const ForegroundContrast = {
  render: ForegroundContrastColors,
};

export const ForegroundAI = {
  render: ForegroundAIColors,
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

// TEXT COLORS TESTS
export const Text = {
  render: TextColors,
};

export const TextStatus = {
  render: TextStatusColors,
};

export const TextPrimary = {
  render: TextPrimaryColors,
};

// SURFACE COLORS TESTS
export const Surface = {
  render: SurfaceColors,
};

export const SurfaceAlt = {
  render: SurfaceAltColors,
};

export const SurfaceContrast = {
  render: SurfaceContrastColors,
};

export const SurfaceOverlay = {
  render: SurfaceOverlayColors,
};

export const SurfaceStatus = {
  render: SurfaceStatusColors,
};

export const SurfaceAI = {
  render: SurfaceAIColors,
};

// ACCENT COLORS TESTS
export const Accent = {
  render: AccentColors,
};

export const AccentMuted = {
  render: AccentMutedColors,
};

export const AccentOverlay = {
  render: AccentOverlayColors,
};

// BRAND COLORS TESTS (system.color.brand)
export const BrandFocus = {
  render: BrandFocusColors,
};

export const BrandSurface = {
  render: BrandSurfaceColors,
};

export const BrandAccent = {
  render: BrandAccentColors,
};

export const BrandFg = {
  render: BrandFgColors,
};

export const BrandBorder = {
  render: BrandBorderColors,
};

// FOCUS COLORS TESTS
export const Focus = {
  render: FocusColors,
};
