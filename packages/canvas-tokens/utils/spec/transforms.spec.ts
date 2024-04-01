import {transforms} from '../transformers';

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
    const result = transforms['value/spacing-rem'].transformer(
      {...defaultToken, value: '0.4'},
      defaultOptions
    );
    const expected = '0.025rem';

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

  it('should flat shhadow value', () => {
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
    const result = transforms['value/flatten-base-shadow'].transformer(token, defaultOptions);
    const expected =
      '0 1 4 0 rgba({palette.licorice.600},{opacity.200}), 0 2 16 0 rgba({palette.licorice.600},{opacity.100})';

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
});
