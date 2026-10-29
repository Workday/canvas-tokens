export const getOklchValue = (token: any) => {
  const components = token.original.$value.components;
  const alpha = typeof token.original.$value.alpha === 'number' ? token.original.$value.alpha : 1;

  return `oklch(${components.join(' ')} / ${alpha})`;
};

/** Module syntax a generated JS file is written in; `ts` is used for `.d.ts` declarations */
export type SyntaxStyle = 'es6' | 'commonjs' | 'ts';

/** Join the non-empty parts with a dash */
export const joinParts = (...parts: (string | undefined)[]) => parts.filter(Boolean).join('-');

/** Whether tokens of a source file are exported as flat constants rather than as an object tree */
export const isInlineTokenFile = (file: string) =>
  file.includes('base/') || (file.includes('brand/') && !/(common|action)\.json/.test(file));
