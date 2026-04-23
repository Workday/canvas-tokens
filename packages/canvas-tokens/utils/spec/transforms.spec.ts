import {transforms} from '../transformers';
import {generateFallbacks} from '../transformers/generateNewTokenFallback';

const defaultToken = {
  name: '',
  value: '',
  path: [],
  original: {
    value: '',
  },
  filePath: '',
  isSource: true,
};

const defaultOptions = {};

describe('transforms', () => {
  it('should turn palette color to rgba', () => {
    const result = transforms['value/hex-to-rgba'].transformer(
      {...defaultToken, value: '#ffefee'},
      defaultOptions
    );
    const expected = 'rgba(255,239,238,1)';

    expect(result).toBe(expected);
  });

  it('should turn sys color to correct rgba', () => {
    const result = transforms['value/flatten-rgba'].transformer(
      {...defaultToken, value: 'rgba(rgba(0,0,0,1),0.5)'},
      defaultOptions
    );
    const expected = 'rgba(0,0,0,0.5)';

    expect(result).toBe(expected);
  });

  it('should handle percentage alpha in rgba', () => {
    const result = transforms['value/flatten-rgba'].transformer(
      {...defaultToken, value: 'rgba(rgba(0,0,0,1),50%)'},
      defaultOptions
    );
    const expected = 'rgba(0,0,0,0.5)';

    expect(result).toBe(expected);
  });

  it('should handle space before opacity', () => {
    const result = transforms['value/flatten-rgba'].transformer(
      {...defaultToken, value: 'rgba(rgba(0,0,0,1), 50%)'},
      defaultOptions
    );
    const expected = 'rgba(0,0,0,0.5)';

    expect(result).toBe(expected);
  });

  it('should handle fallback value when deprecated values are provided', () => {
    const result = transforms['value/old-values'].transformer(
      {
        ...defaultToken,
        value: 'blue',
        original: {value: 'blue', deprecatedValues: {v2: 'base.palette.blueberry.400'}},
        path: ['base', 'palette', 'blue', '600'],
        deprecatedValues: {v2: 'base.palette.blueberry.400'},
      },
      defaultOptions
    );
    const expected = 'var(--cnvs-base-palette-blueberry-400, blue)';

    expect(result).toBe(expected);
  });

  it('should handle fallback value when old values are empty', () => {
    const result = transforms['value/old-values'].transformer(
      {
        value: 'oklch(0.4658 0.1562 255.5 / 1)',
        type: 'color',
        description: '',
        deprecatedValues: {},
        filePath: 'tokens/web/brand.json',
        isSource: true,
        original: {
          value: '{base.palette.blue.700}',
          type: 'color',
          description: '',
          deprecatedValues: {},
        },
        name: 'cnvs-brand-primary-700',
        attributes: {},
        path: ['brand', 'primary', '700'],
      },
      defaultOptions
    );
    const expected = 'oklch(0.4658 0.1562 255.5 / 1)';

    expect(result).toBe(expected);
  });

  it('should handle fallback value with raw value', () => {
    const result = transforms['value/old-values'].transformer(
      {
        ...defaultToken,
        value: 'blue',
        original: {
          value: 'blue',
          deprecatedValues: {v2: 'base.palette.blueberry.400', raw: 'light-blue'},
        },
        path: ['base', 'palette', 'blue', '600'],
        deprecatedValues: {v2: 'base.palette.blueberry.400', raw: 'light-blue'},
      },
      defaultOptions
    );
    const expected = 'var(--cnvs-base-palette-blueberry-400, light-blue)';

    expect(result).toBe(expected);
  });

  it('should chain all deprecatedValues when rawValue is a literal (not a token reference)', () => {
    const result = generateFallbacks(
      ['base.palette.cinnamon.100', 'base.palette.old-red.100'],
      'red'
    );
    const expected =
      'var(--cnvs-base-palette-cinnamon-100, var(--cnvs-base-palette-old-red-100, red))';

    expect(result).toBe(expected);
  });

  it('should chain only deprecatedValues when rawValue is a token reference', () => {
    const result = generateFallbacks(
      ['base.palette.cinnamon.100', 'base.palette.old-red.100'],
      '{base.palette.old-red.100}'
    );
    const expected = 'var(--cnvs-base-palette-cinnamon-100, var(--cnvs-base-palette-old-red-100))';

    expect(result).toBe(expected);
  });

  it('should return use last as a raw value if provided', () => {
    const result = generateFallbacks(['base.palette.cinnamon.100', 'light-red'], 'red');
    const expected = 'var(--cnvs-base-palette-cinnamon-100, light-red)';

    expect(result).toBe(expected);
  });

  it('should return raw value if empty array is provided', () => {
    const result = generateFallbacks([], 'red');
    const expected = 'red';

    expect(result).toBe(expected);
  });

  it('should handle space before opacity', () => {
    const result = transforms['value/flatten-rgba'].transformer(
      {...defaultToken, value: 'rgba(rgba(0,0,0,1),50)'},
      defaultOptions
    );
    const expected = 'rgba(0,0,0,0.5)';

    expect(result).toBe(expected);
  });

  it('should handle space before opacity', () => {
    const result = transforms['value/flatten-rgba'].transformer(
      {...defaultToken, value: 'rgba(rgba(0,0,0,1),.64)'},
      defaultOptions
    );
    const expected = 'rgba(0,0,0,0.64)';

    expect(result).toBe(expected);
  });

  it('should turn sys color to correct rgba', () => {
    const result = transforms['value/flatten-rgba'].transformer(
      {
        ...defaultToken,
        value:
          '0 0.375rem 1.5rem 0 rgba(rgba(31,38,46,1),0.12), 0 0.75rem 3rem 0 rgba(rgba(31,38,46,1),0.08)',
      },
      defaultOptions
    );
    const expected =
      '0 0.375rem 1.5rem 0 rgba(31,38,46,0.12), 0 0.75rem 3rem 0 rgba(31,38,46,0.08)';

    expect(result).toBe(expected);
  });

  it('should return token css var name', () => {
    const result = transforms['value/variables'].transformer(
      {...defaultToken, path: ['base', 'shadow', '100']},
      defaultOptions
    );
    const expected = '--cnvs-base-shadow-100';

    expect(result).toBe(expected);
  });

  it('should wrap font family token with quotes', () => {
    const result = transforms['value/wrapped-font-family'].transformer(
      {...defaultToken, value: 'Roboto'},
      defaultOptions
    );
    const expected = '"Roboto"';

    expect(result).toBe(expected);
  });

  it('should convert letter spacing values from px to rem', () => {
    const result = transforms['value/letter-spacing/px2rem'].transformer(
      {...defaultToken, value: '0.4'},
      defaultOptions
    );
    const expected = '0.025rem';

    expect(result).toBe(expected);
  });

  it('should convert line height values from px to rem', () => {
    const result = transforms['value/line-height/px2rem'].transformer(
      {...defaultToken, value: '16'},
      defaultOptions
    );
    const expected = '1rem';

    expect(result).toBe(expected);
  });

  it('should change font weight value to lower case', () => {
    const result = transforms['value/font-weight/numbers'].transformer(
      {...defaultToken, value: 'Bold'},
      defaultOptions
    );
    const expected = '700';

    expect(result).toBe(expected);
  });

  it('should resolve math expression for base tokens', () => {
    const result = transforms['value/math'].transformer(
      {
        ...defaultToken,
        value: '16rem * 0.5',
        path: ['base', 'font-size', '15'],
      },
      defaultOptions
    );
    const expected = '8rem';

    expect(result).toBe(expected);
  });

  it('should resolve math expression for sys tokens', () => {
    const result = transforms['value/math'].transformer(
      {
        ...defaultToken,
        value: '16rem * 0.5',
        path: ['sys', 'space', 'x4'],
      },
      defaultOptions
    );
    const expected = 'calc(16rem * 0.5)';

    expect(result).toBe(expected);
  });

  it('should transform name to camel case without token category for palette', () => {
    const result = transforms['name/camel'].transformer(
      {
        ...defaultToken,
        path: ['base', 'palette', 'blueberry', '100'],
      },
      defaultOptions
    );
    const expected = 'blueberry100';

    expect(result).toBe(expected);
  });

  it('should transform name to camel case without token category for palette', () => {
    const result = transforms['name/camel'].transformer(
      {
        ...defaultToken,
        path: ['base', 'extended', 'palette', 'dragon-fruit', '100'],
      },
      defaultOptions
    );
    const expected = 'extendedDragonFruit100';

    expect(result).toBe(expected);
  });

  it('should transform name to camel case without level', () => {
    const result = transforms['name/camel'].transformer(
      {
        ...defaultToken,
        path: ['base', 'shadow', '100'],
      },
      defaultOptions
    );
    const expected = 'shadow100';

    expect(result).toBe(expected);
  });

  it('should transform name to camel case for base level', () => {
    const result = transforms['name/camel'].transformer(
      {
        ...defaultToken,
        path: ['base', 'level'],
      },
      defaultOptions
    );
    const expected = 'baseLevel';

    expect(result).toBe(expected);
  });

  it('should flat shadow value', () => {
    const token = {
      ...defaultToken,
      value: [
        {
          x: '0',
          y: '1',
          blur: '4',
          spread: '0',
          color: 'rgba({palette.licorice.600},{opacity.200})',
          type: 'dropShadow',
        },
        {
          x: '0',
          y: '2',
          blur: '16',
          spread: '0',
          color: 'rgba({palette.licorice.600},{opacity.100})',
          type: 'dropShadow',
        },
      ],
      original: {
        value: [
          {
            x: '0',
            y: '1',
            blur: '4',
            spread: '0',
            color: 'rgba({palette.licorice.600},{opacity.200})',
            type: 'dropShadow',
          },
          {
            x: '0',
            y: '2',
            blur: '16',
            spread: '0',
            color: 'rgba({palette.licorice.600},{opacity.100})',
            type: 'dropShadow',
          },
        ],
      },
      path: ['base', 'shadow', '100'],
    };
    const result = transforms['value/shadow/flat-sys'].transformer(token, defaultOptions);
    const expected =
      '0 0.0625rem 0.25rem 0 rgba({palette.licorice.600},{opacity.200}), 0 0.125rem 1rem 0 rgba({palette.licorice.600},{opacity.100})';

    expect(result).toBe(expected);
  });

  it('should flat line value', () => {
    const result = transforms['value/flatten-border'].transformer(
      {
        ...defaultToken,
        value: {
          color: '{palette.licorice.600}',
          width: '1rem',
          style: 'solid',
        },
      },
      defaultOptions
    );
    const expected = '1rem solid {palette.licorice.600}';

    expect(result).toBe(expected);
  });

  it('should convert opacity to number below 1', () => {
    const result = transforms['value/opacity'].transformer(
      {...defaultToken, value: '40'},
      defaultOptions
    );
    const expected = '0.4';

    expect(result).toBe(expected);
  });

  it('should add ms suffix to duration values', () => {
    const result = transforms['value/duration/ms'].transformer(
      {...defaultToken, value: '1000'},
      defaultOptions
    );
    const expected = '1000ms';

    expect(result).toBe(expected);
  });
});
