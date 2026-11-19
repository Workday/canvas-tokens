import {children, createTable as createTableWith, only, pathOf, under} from '../../../tableHelpers';
import type {Filter} from '../../../tableHelpers';

const createTable = (group: string, filter?: Filter) =>
  createTableWith(group, filter, {controls: 'theme'});

// Background
export const BackgroundTokens = createTable('system.color.bg', under('color.bg'));

// Surface
export const SurfaceDefaultTokens = createTable(
  'system.color.surface',
  token => children('color.surface')(token) || under('color.surface.text')(token)
);
export const SurfaceAltTokens = createTable('system.color.surface', under('color.surface.alt'));
export const SurfaceStatusTokens = createTable(
  'system.color.surface',
  under(
    'color.surface.info',
    'color.surface.danger',
    'color.surface.warning',
    'color.surface.success'
  )
);
export const SurfaceContrastTokens = createTable(
  'system.color.surface',
  under('color.surface.contrast')
);
export const SurfaceOverlayTokens = createTable(
  'system.color.surface',
  under('color.surface.overlay')
);
export const SurfaceAITokens = createTable('system.color.surface', under('color.surface.ai'));

// Foreground
export const ForegroundDefaultTokens = createTable(
  'system.color.fg',
  only(
    'color.fg.$root',
    'color.fg.strong',
    'color.fg.stronger',
    'color.fg.disabled',
    'color.fg.inverse'
  )
);
export const ForegroundMutedTokens = createTable('system.color.fg', under('color.fg.muted'));
export const ForegroundContrastTokens = createTable('system.color.fg', under('color.fg.contrast'));
export const ForegroundStatusTokens = createTable(
  'system.color.fg',
  under('color.fg.danger', 'color.fg.warning', 'color.fg.success')
);
export const ForegroundInfoTokens = createTable('system.color.fg', under('color.fg.info'));
export const ForegroundLinkTokens = createTable('system.color.fg', under('color.fg.link'));
export const ForegroundAITokens = createTable('system.color.fg', only('color.fg.ai'));

// Border
export const BorderDefaultTokens = createTable(
  'system.color.border',
  only(
    'color.border.$root',
    'color.border.strong',
    'color.border.elevated',
    'color.border.transparent'
  )
);
export const BorderInputTokens = createTable('system.color.border', under('color.border.input'));
export const BorderStatusTokens = createTable(
  'system.color.border',
  under('color.border.info', 'color.border.danger', 'color.border.warning')
);
export const BorderInverseTokens = createTable(
  'system.color.border',
  under('color.border.inverse')
);
export const BorderContrastTokens = createTable(
  'system.color.border',
  under('color.border.contrast')
);
export const BorderAITokens = createTable('system.color.border', only('color.border.ai'));

// Accent
export const AccentStatusTokens = createTable(
  'system.color.accent',
  only('color.accent.info', 'color.accent.success', 'color.accent.danger', 'color.accent.warning')
);
export const AccentSpecialTokens = createTable(
  'system.color.accent',
  only('color.accent.ai', 'color.accent.contrast')
);
export const AccentMutedTokens = createTable('system.color.accent', under('color.accent.muted'));
export const AccentOverlayTokens = createTable(
  'system.color.accent',
  under('color.accent.overlay')
);

// Focus
export const FocusTokens = createTable('system.color.focus', under('color.focus'));

// Shadow
export const ShadowTokens = createTable('system.color.shadow', token =>
  /^color\.shadow\.\d/.test(pathOf(token))
);
export const ShadowDeprecatedTokens = createTable(
  'system.color.shadow',
  only('color.shadow.base', 'color.shadow.ambient')
);

// System brand
export const BrandSurfaceTokens = createTable('system.color.surface', under('color.brand.surface'));
export const BrandAccentTokens = createTable('system.color.accent', under('color.brand.accent'));
export const BrandForegroundTokens = createTable('system.color.fg', under('color.brand.fg'));
export const BrandBorderTokens = createTable('system.color.border', under('color.brand.border'));
export const BrandFocusTokens = createTable('system.color.focus', under('color.brand.focus'));
