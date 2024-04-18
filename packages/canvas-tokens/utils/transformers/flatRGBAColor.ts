import {DesignToken} from 'style-dictionary';

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that
 * transforms color values contain rgba and references to do not double rgba in a color value.
 * before: `rgba(rgba(0,0,0,1),0.12)`, after `rgba(0,0,0,0.12)`.
 * @param {*} Token - style dictionary token object.
 * @returns updated token value
 */
export const flatRGBAColor = ({value}: DesignToken): string => {
  const rgba = value.replace(/rgba\((rgba\([,0-9]*)\),([\s.0-9%]*)\)/g, (a: string, b: string) => {
    const [alpha] = a.slice(0, -1).split(',').reverse();
    const alphaNumber: number = parseFloat(alpha);
    const alphaResult = alpha.includes('%') || alphaNumber > 1 ? alphaNumber / 100 : alpha;

    const innerRgb = b.replace(/rgba\(([^}]+)/g, (__: string, c: string) =>
      c.split(',').slice(0, 3).toString()
    );
    return alphaResult === '0' ? 'transparent' : `rgba(${innerRgb},${alphaResult})`;
  });

  return rgba;
};
