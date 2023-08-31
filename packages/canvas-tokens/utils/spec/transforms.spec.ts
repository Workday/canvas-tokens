import {transforms} from '../transformers';

describe('transforms', () => {
  it('should turn palette color to rgba', () => {
    // @ts-ignore
    const result = transforms['value/hex-to-rgba'].transformer({value: '#ffefee'});
    const expected = 'rgba(255,239,238,1)';

    expect(result).toBe(expected);
  });

  it('should turn sys color to correct rgba', () => {
    // @ts-ignore
    const result = transforms['value/flatten-rgba'].transformer({value: 'rgba(rgba(0,0,0,1),0.5)'});
    const expected = 'rgba(0,0,0,0.5)';

    expect(result).toBe(expected);
  });

  it('should turn sys color to correct rgba', () => {
    // @ts-ignore
    const result = transforms['value/flatten-rgba'].transformer({
      value:
        '0 0.375rem 1.5rem 0 rgba(rgba(31,38,46,1),0.12), 0 0.75rem 3rem 0 rgba(rgba(31,38,46,1),0.08)',
    });
    const expected =
      '0 0.375rem 1.5rem 0 rgba(31,38,46,0.12), 0 0.75rem 3rem 0 rgba(31,38,46,0.08)';

    expect(result).toBe(expected);
  });

  it('should return token css var name', () => {
    // @ts-ignore
    const result = transforms['value/variables'].transformer({path: ['base', 'shadow', '100']});
    const expected = '--cnvs-base-shadow-100';

    expect(result).toBe(expected);
  });

  it('should wrap font family token with quotes', () => {
    // @ts-ignore
    const result = transforms['value/wrapped-font-family'].transformer({value: 'Roboto'});
    const expected = '"Roboto"';

    expect(result).toBe(expected);
  });

  it('should add em to letter spacing values', () => {
    // @ts-ignore
    const result = transforms['value/spacing-em'].transformer({value: '0.4'});
    const expected = '0.4em';

    expect(result).toBe(expected);
  });

  it('should resolve math expression for base tokens', () => {
    // @ts-ignore
    const result = transforms['value/math'].transformer({
      value: '16rem * 0.5',
      path: ['base', 'font-size', '15'],
    });
    const expected = '8rem';

    expect(result).toBe(expected);
  });

  it('should resolve math expression for sys tokens', () => {
    // @ts-ignore
    const result = transforms['value/math'].transformer({
      value: '16rem * 0.5',
      path: ['sys', 'space', 'x4'],
    });
    const expected = 'calc(16rem * 0.5)';

    expect(result).toBe(expected);
  });

  it('should transform name to camel case without token category for palette', () => {
    // @ts-ignore
    const result = transforms['name/camel'].transformer({
      path: ['base', 'palette', 'blueberry', '100'],
    });
    const expected = 'blueberry100';

    expect(result).toBe(expected);
  });

  it('should transform name to camel case without level', () => {
    // @ts-ignore
    const result = transforms['name/camel'].transformer({
      path: ['base', 'shadow', '100'],
    });
    const expected = 'shadow100';

    expect(result).toBe(expected);
  });

  it('should flat shhadow value', () => {
    const token = {
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
    // @ts-ignore
    const result = transforms['value/flatten-base-shadow'].transformer(token);
    const expected =
      '0 1 4 0 rgba({palette.licorice.600},{opacity.200}), 0 2 16 0 rgba({palette.licorice.600},{opacity.100})';

    expect(result).toBe(expected);
  });

  it('should flat line value', () => {
    // @ts-ignore
    const result = transforms['value/flatten-border'].transformer({
      value: {
        color: '{palette.licorice.600}',
        width: '1rem',
        style: 'solid',
      },
    });
    const expected = '1rem solid {palette.licorice.600}';

    expect(result).toBe(expected);
  });
});
