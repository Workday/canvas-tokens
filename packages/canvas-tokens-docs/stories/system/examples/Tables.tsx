import React from 'react';
import {TokenTable} from '../../../components/TokenTable';
import type {SDToken} from '../../../components/TokenTable';

type Filter = (token: SDToken) => boolean;

const pathOf = (token: SDToken) => token.path.join('.');

const under =
  (prefix: string): Filter =>
  token =>
    pathOf(token).startsWith(`${prefix}.`);

const isDeprecated: Filter = token => Boolean(token.$deprecated);
const active: Filter = token => !isDeprecated(token);

const createTable = (group: string, filter?: Filter) => () => (
  <TokenTable group={group} filter={filter} />
);

// Space
export const SizeTokens = createTable('system.size');
export const PaddingTokens = createTable('system.padding');
export const GapTokens = createTable('system.gap');
export const BreakpointTokens = createTable('system.breakpoint', active);
export const BreakpointDeprecatedTokens = createTable('system.breakpoint', isDeprecated);

// Shape
export const ShapeTokens = createTable('system.shape');

// Opacity
export const OpacityTokens = createTable('system.opacity', active);
export const OpacityDeprecatedTokens = createTable('system.opacity', isDeprecated);

// Depth
export const DepthTokens = createTable('system.depth');

// Motion
export const EasingTokens = createTable('system.motion', under('motion.easing'));

// Type
export const TypeLevelTokens = createTable('system.type', under('type'));
export const FontFamilyTokens = createTable('system.type', under('font-family'));
export const FontSizeTokens = createTable('system.type', under('font-size'));
export const FontWeightTokens = createTable('system.type', under('font-weight'));
export const LineHeightTokens = createTable('system.type', under('line-height'));
export const LetterSpacingTokens = createTable('system.type', under('letter-spacing'));
