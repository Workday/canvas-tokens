import sysTokensJson from '../../../../../canvas-tokens/tokens/web/sys.json';
import deprecatedSysTokensJson from '../../../../../canvas-tokens/tokens/deprecated/web/sys.json';

/**
 * Type-safe access to system token metadata from the JSON source files.
 * This provides access to token comments/descriptions that aren't available
 * in the compiled @workday/canvas-tokens-web package.
 */
export const sysTokenMetadata = sysTokensJson.sys;

/**
 * Type-safe access to deprecated system token metadata.
 */
export const deprecatedSysTokenMetadata = deprecatedSysTokensJson.sys;

/**
 * Normalizes a token key to match the JSON format.
 * Converts camelCase keys like "3Xl" to lowercase "3xl" for JSON lookup.
 */
function normalizeKey(key: string): string {
  // Handle numeric prefixes with camelCase (e.g., "3Xl" -> "3xl", "2Xl" -> "2xl")
  return key.replace(/(\d+)([A-Z])/g, (_, num, letter) => `${num}${letter.toLowerCase()}`);
}

/**
 * Gets the comment/description for a system token.
 *
 * @param category - The token category (e.g., 'size', 'gap', 'shape')
 * @param key - The token key (e.g., 'sm', 'md', 'lg', '3Xl')
 * @returns The comment/description string, or undefined if not found
 *
 * @example
 * ```ts
 * getTokenDescription('size', 'sm') // returns "X-Small Buttons, Pills, Checkboxes, Radio Buttons"
 * getTokenDescription('size', '3Xl') // returns "Expandable Container" (handles camelCase)
 * getTokenDescription('gap', 'md') // returns "Use the default inline spacing when other gap tokens may not fit."
 * ```
 */
export function getTokenDescription(
  category: keyof typeof sysTokenMetadata,
  key: string
): string | undefined {
  const categoryData = sysTokenMetadata[category];
  if (!categoryData || typeof categoryData !== 'object') {
    return undefined;
  }

  // Try the key as-is first
  let tokenData = (categoryData as Record<string, any>)[key];

  // If not found, try normalized version (for camelCase keys like "3Xl" -> "3xl")
  if (!tokenData) {
    const normalizedKey = normalizeKey(key);
    if (normalizedKey !== key) {
      tokenData = (categoryData as Record<string, any>)[normalizedKey];
    }
  }

  if (tokenData && typeof tokenData === 'object' && 'comment' in tokenData) {
    return (tokenData as {comment?: string}).comment;
  }

  return undefined;
}

/**
 * Checks if a system token is deprecated.
 *
 * @param category - The token category (e.g., 'font-size', 'font-family', 'font-weight')
 * @param level - Optional level key for nested tokens (e.g., 'subtext', 'body', 'heading')
 * @param key - The token key (e.g., 'sm', 'md', 'lg', 'small', 'medium', 'large')
 * @returns True if the token is deprecated, false otherwise
 *
 * @example
 * ```ts
 * isTokenDeprecated('font-size', 'subtext', 'small') // returns true
 * isTokenDeprecated('font-size', 'subtext', 'sm') // returns false
 * ```
 */
export function isTokenDeprecated(
  category: keyof typeof deprecatedSysTokenMetadata,
  level?: string,
  key?: string
): boolean {
  const categoryData = deprecatedSysTokenMetadata[category];
  if (!categoryData || typeof categoryData !== 'object') {
    return false;
  }

  // For nested tokens like font-size.subtext.sm
  if (level && key) {
    const levelData = (categoryData as Record<string, any>)[level];
    if (levelData && typeof levelData === 'object') {
      const tokenData = (levelData as Record<string, any>)[key];
      return tokenData && typeof tokenData === 'object' && 'deprecated' in tokenData
        ? (tokenData as {deprecated?: boolean}).deprecated === true
        : false;
    }
  }

  // For flat tokens like font-family.default
  if (key && !level) {
    const tokenData = (categoryData as Record<string, any>)[key];
    return tokenData && typeof tokenData === 'object' && 'deprecated' in tokenData
      ? (tokenData as {deprecated?: boolean}).deprecated === true
      : false;
  }

  return false;
}
