import React from 'react';
import {TokenTable} from '../../../components/TokenTable';
import type {SDToken} from '../../../components/TokenTable';

type Filter = (token: SDToken) => boolean;

const pathOf = (token: SDToken) => token.path.join('.');

const under =
  (prefix: string): Filter =>
  token =>
    pathOf(token).startsWith(`${prefix}.`);

const only =
  (...paths: string[]): Filter =>
  token =>
    paths.includes(pathOf(token));

const isDeprecated: Filter = token => Boolean(token.$deprecated);

const createTable = (group: string, filter?: Filter) => () => (
  <TokenTable group={group} level="base" filter={filter} />
);

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
