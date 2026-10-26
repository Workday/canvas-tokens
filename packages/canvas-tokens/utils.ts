export const getOklchValue = (token: any) => {
  const components = token.original.$value.components;
  const alpha = typeof token.original.$value.alpha === 'number' ? token.original.$value.alpha : 1;

  return `oklch(${components.join(' ')} / ${alpha})`;
};
