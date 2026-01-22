import {AccentColors, AccentMutedColors, AccentOverlayColors} from '../examples/Color/Accent';
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
import {DeprecatedColorTokens} from '../examples/Color/Deprecated';
import {FocusColors} from '../examples/Color/Focus';
import {
  ForegroundColors,
  ForegroundAIColors,
  ForegroundContrastColors,
  ForegroundMutedColors,
  ForegroundPrimaryColors,
  ForegroundStatusColors,
} from '../examples/Color/Foreground';
import {
  SurfaceColors,
  SurfaceAltColors,
  SurfaceContrastColors,
  SurfaceOverlayColors,
  SurfaceStatusColors,
  SurfaceAIColors,
} from '../examples/Color/Surface';

export default {
  title: 'Visual Tests/System Tokens/Colors',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
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

// BRAND COLORS TESTS
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

// FOCUS COLORS TESTS
export const Focus = {
  render: FocusColors,
};

// DEPRECATED COLORS TESTS
export const Deprecated = {
  render: DeprecatedColorTokens,
};
