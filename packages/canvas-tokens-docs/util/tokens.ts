import tokens from '../data/tokens';

/** A transformed token as exported by the docs build (`javascript/token-array` format). */
export type DocsToken = Record<string, any> & {key: string; path: string[]};

/** The token array of a group in the docs index, e.g. `brand.primary` or `system.color.bg` */
export const getTokens = (group: string): DocsToken[] => {
  const value = group.split('.').reduce<any>((acc, key) => acc?.[key], tokens);
  return Array.isArray(value) ? value : [];
};

/** Tokens of a group by the path segment after `prefix`, e.g. the steps of `['red']` or `['dark', 'red']` */
export const getTokensByStep = (
  group: DocsToken[],
  prefix: string[] = []
): Record<string, DocsToken> =>
  Object.fromEntries(
    group
      .filter(
        token =>
          token.path.length === prefix.length + 1 &&
          prefix.every((part, i) => token.path[i] === part)
      )
      .map(token => [token.path[prefix.length], token])
  );
