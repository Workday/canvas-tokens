import type {TransformedToken} from 'style-dictionary';

export const isOldBaseTokens = (token: TransformedToken) =>
  token.filePath.includes('/base/') && token.path[0] !== 'dark' && !checkExcluded(token);

export const isOldBrandTokens = (token: TransformedToken) =>
  token.filePath.includes('/brand/') && token.path[1] !== 'action';

export const isOldSystemTokens = (token: TransformedToken) =>
  token.filePath.includes('/system/') &&
  !token.name.includes('color-chart') &&
  !checkExcluded(token);

export const isSanaTokens = (token: TransformedToken) =>
  token.$type !== 'typography' &&
  token.path[0] !== 'dark' &&
  !['dark', 'action'].includes(token.path[1]) &&
  token.$extensions?.['sana.canvas.tokens']?.themes?.canvas;

export const isSanaDarkTokens = (token: TransformedToken) =>
  (token.filePath.includes('/base/') && token.path[0] === 'dark') ||
  (!(token.filePath.includes('/brand/') && token.path[1] === 'action') &&
    Boolean(token.$extensions?.['sana.canvas.tokens']?.modes?.dark));

export const isOklchToken = (token: any) => {
  return typeof token.original.$value === 'object' && token.original.$value?.colorSpace === 'oklch';
};

const checkExcluded = (token: TransformedToken) => {
  return token?.$extensions?.['sana.canvas.tokens']?.themes?.canvas?.$excluded === true;
};
