/**
 * Rewrites an original token value containing `oklch({ref} / {ref})` into the relative color syntax,
 * keeping references untouched: `oklch(from {palette} l c h / {opacity})`.
 * The result still contains references, so it can be used both as a transform result and as a
 * template for outputting references in a format.
 * @param {string} value - original token value
 * @returns updated value with references
 */
export const flatOklchValue = (value: string): string => {
  // eslint-disable-next-line no-useless-escape
  const updatedValue = value.replace(/{[\w\.]*}/g, (a: string) =>
    a.includes('palette') ? `from ${a} l c h ` : ' ' + a
  );
  return value.includes('{base.opacity.0}') ? 'transparent' : updatedValue;
};
