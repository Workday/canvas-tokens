import {createTable as createTableWith, isDeprecated, only, under} from '../../tableHelpers';
import type {Filter} from '../../tableHelpers';

const createTable = (group: string, filter?: Filter) =>
  createTableWith(group, filter, {level: 'base'});

// Size
export const BaseUnitTokens = createTable('base.size', only('baseline', 'fontSize'));
export const BaseSizeTokens = createTable('base.size', under('size'));

// Opacity
export const BaseOpacityTokens = createTable('base.opacity');

// Motion
export const BaseDurationTokens = createTable('base.motion', under('duration'));
export const BaseEasingTokens = createTable('base.motion', under('easing'));

// Type
export const BaseFontFamilyTokens = createTable('base.type', under('font-family'));
export const BaseFontWeightTokens = createTable('base.type', under('font-weight'));
export const BaseLetterSpacingTokens = createTable(
  'base.type',
  token => under('letter-spacing')(token) && !isDeprecated(token)
);
export const BaseLetterSpacingDeprecatedTokens = createTable(
  'base.type',
  token => under('letter-spacing')(token) && isDeprecated(token)
);
