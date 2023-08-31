import {formattedCompositeStyles} from '../formatters/helpers/formattedCompositeStyles';
import {formattedObjectValue} from '../formatters/helpers/formattedObjectValue';

const mockDicttionary = {
  allTokens: [
    {
      value: {border: '0.0625rem solid rgba(162,171,180,1)'},
      type: 'composition',
      filePath: 'tokens/all.json',
      isSource: true,
      original: {value: {border: '{sys.line.disabled}'}, type: 'composition'},
      name: 'cnvs-sys-border-input-disabled',
      attributes: {},
      path: ['sys', 'border', 'input', 'disabled'],
    },
    {
      value: '--cnvs-brand-primary-base',
      type: 'fontSizes',
      filePath: 'tokens/all.json',
      isSource: true,
      original: {
        value: '{base.blueberry.400}',
        type: 'color',
      },
      name: 'brandPrimaryBase',
      attributes: {},
      path: ['brand', 'primary', 'base'],
    },
  ],
  tokens: {sys: {}},
  allProperties: [],
  usesReference: () => true,
};

describe('format helpers', () => {
  it('should transform composite tokens into css rule sets', () => {
    const result = formattedCompositeStyles({
      dictionary: mockDicttionary,
      format: str => `@${str}`,
    });

    const expected = '.cnvs-sys-border-input-disabled {\n  border: @sys-line-disabled;\n}';

    expect(result).toStrictEqual(expected);
  });

  it('should transform token objects to new values', () => {
    const token = {
      value: '--cnvs-brand-primary-base',
      type: 'fontSizes',
      filePath: 'tokens/all.json',
      isSource: true,
      original: {
        value: '{base.blueberry.400}',
        type: 'color',
      },
      name: 'brandPrimaryBase',
      attributes: {},
      path: ['brand', 'primary', 'base'],
    };
    const result = formattedObjectValue({
      dictionary: {
        ...mockDicttionary,
        allTokens: [token],
        properties: {
          brand: {
            primary: {
              base: token,
            },
          },
        },
        getReferences: () => [
          {
            value: '--cnvs-base-palette-blueberry-400',
            type: 'fontSizes',
            filePath: 'tokens/all.json',
            isSource: true,
            original: {
              value: '#0875E2',
              type: 'color',
            },
            name: 'bluberry400',
            attributes: {},
            path: ['base', 'palette', '400'],
          },
        ],
      },
      format: 'brand',
    });

    const expected = {brand: {primary: {base: '--cnvs-brand-primary-base'}}};

    expect(result).toStrictEqual(expected); //?
  });

  it('should transform token objects to new values', () => {
    const borderToken = {
      value: '--cnvs-sys-border-input-disabled',
      type: 'composition',
      filePath: 'tokens/all.json',
      isSource: true,
      original: {
        value: '{sys.line.disabled}',
        type: 'composition',
      },
      name: 'borderInputDisabled',
      attributes: {},
      path: ['sys', 'border', 'input', 'disabled'],
    };
    const result = formattedObjectValue({
      dictionary: {
        ...mockDicttionary,
        allTokens: [borderToken],
        properties: {
          sys: {
            border: {
              input: {
                disabled: borderToken,
              },
            },
          },
        },
        getReferences: () => [
          {
            value: '--cnv-sys-line-disabled',
            type: 'border',
            filePath: 'tokens/all.json',
            isSource: true,
            original: {
              value: '1px solid #0875E2',
              type: 'color',
            },
            name: 'lineDefault',
            attributes: {},
            path: ['sys', 'line', 'disabled'],
          },
        ],
      },
      format: 'sys',
    });

    const expected = {border: {input: {disabled: '--cnvs-sys-border-input-disabled'}}};

    expect(result).toStrictEqual(expected);
  });
});
