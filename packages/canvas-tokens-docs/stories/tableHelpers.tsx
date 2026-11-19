import React from 'react';
import {TokenTable} from '../components/TokenTable';
import type {SDToken} from '../components/TokenTable';
import {ThemeControl} from '../components/ThemeControl';
import type {TokenLevel} from '../components/TokenTable/types';

export type Filter = (token: SDToken) => boolean;

export const pathOf = (token: SDToken) => token.path.join('.');

/** Tokens at or below any of the given paths, e.g. `color.surface.alt` and `color.surface.alt.strong`. */
export const under =
  (...prefixes: string[]): Filter =>
  token =>
    prefixes.some(prefix => pathOf(token) === prefix || pathOf(token).startsWith(`${prefix}.`));

/** Tokens exactly one level below a path, e.g. `color.surface.$root` but not `color.surface.alt.$root`. */
export const children =
  (prefix: string): Filter =>
  token =>
    token.path.length === prefix.split('.').length + 1 && pathOf(token).startsWith(`${prefix}.`);

/** Tokens with exactly these paths. */
export const only =
  (...paths: string[]): Filter =>
  token =>
    paths.includes(pathOf(token));

export const isDeprecated: Filter = token => Boolean(token.$deprecated);
export const active: Filter = token => !isDeprecated(token);

type TableOptions = {
  /** Set to `base` for base tokens, whose keys don't carry their level. */
  level?: TokenLevel;
  /** Wraps the table in a `ThemeControl`: `mode` for the color mode only, `theme` to add a theme select. */
  controls?: 'mode' | 'theme';
};

/** A component that renders the tokens of a group, optionally narrowed by a filter. */
export const createTable =
  (group: string, filter?: Filter, {level, controls}: TableOptions = {}) =>
  () => {
    const table = <TokenTable group={group} level={level} filter={filter} />;

    return controls ? (
      <ThemeControl themeSelect={controls === 'theme'}>{table}</ThemeControl>
    ) : (
      table
    );
  };
