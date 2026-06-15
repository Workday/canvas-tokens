import {formattedCompositeStyles} from '../formatters/helpers/formattedCompositeStyles';
import {
  formattedObjectInnerValues,
  changeValuesToCSSVars,
  getOriginalValues,
} from '../formatters/helpers/formattedObjectInnerValues';

const mockCompositeToken = {
  value: {color: '{base.palette.blueberry.400}'},
  comment: 'Use for primary background',
  type: 'composition',
  filePath: 'tokens/all.json',
  isSource: true,
  original: {
    value: {color: '{base.palette.blueberry.400}'},
    type: 'color',
  },
  name: 'cnvs-sys-color-primary',
  attributes: {},
  path: ['sys', 'color', 'primary'],
};

const mockMathToken = {
  value: '0.25rem * 4',
  comment: 'Use for spaces between elements',
  type: 'space',
  filePath: 'tokens/all.json',
  isSource: true,
  original: {
    value: '{base.unit} * 4',
    type: 'space',
  },
  name: 'cnvs-sys-space-x',
  attributes: {},
  path: ['sys', 'space', 'x'],
};

const mockBrandToken = {
  value: 'blue',
  type: 'color',
  filePath: 'tokens/all.json',
  isSource: true,
  original: {
    value: '{base.palette.blueberry.400}',
    type: 'color',
  },
  name: 'brandPrimaryBase',
  attributes: {},
  path: ['brand', 'primary', 'base'],
};

const mockFallbackBrandToken = {
  value: 'blue',
  type: 'color',
  filePath: 'tokens/all.json',
  isSource: true,
  original: {
    value: '{base.palette.blue.600}',
    type: 'color',
    deprecatedValues: {v2: 'base.palette.blueberry.400'},
  },
  name: 'brandPrimaryA600',
  attributes: {},
  path: ['brand', 'primary', 'A600'],
  deprecatedValues: {v2: 'base.palette.blueberry.400'},
};

const mockBaseToken = {
  value: '--cnvs-base-palette-blueberry-400',
  type: 'color',
  filePath: 'tokens/all.json',
  isSource: true,
  original: {
    value: 'blue',
    type: 'color',
  },
  name: 'basePaletteBlueberry400',
  attributes: {},
  path: ['base', 'palette', 'blueberry', '400'],
};

const mockFallbackBaseToken = {
  value: 'blue',
  type: 'color',
  filePath: 'tokens/all.json',
  isSource: true,
  original: {
    value: 'blue',
    type: 'color',
    deprecatedValues: {v2: 'base.palette.blueberry.400'},
  },
  name: 'basePaletteBlue600',
  attributes: {},
  path: ['base', 'palette', 'blue', '600'],
  deprecatedValues: {v2: 'base.palette.blueberry.400'},
};

const mockDicttionary = {
  allTokens: [mockBrandToken, mockMathToken, mockBaseToken, mockCompositeToken],
  properties: {brand: {primary: {base: mockBrandToken}}},
  tokens: {sys: {}},
  allProperties: [],
  usesReference: () => true,
  getReferences: () => [],
};

describe('format helpers', () => {
  it('should transform composite tokens into css rule sets', () => {
    const result = formattedCompositeStyles({
      dictionary: mockDicttionary,
      format: str => `@${str}`,
    });

    const expected = `.cnvs-sys-color-primary {\n  color: @base-palette-blueberry-400;\n}`;

    expect(result).toStrictEqual(expected);
  });

  it('should transform token objects to new values', () => {
    const result = formattedObjectInnerValues({
      dictionary: mockDicttionary,
      format: 'brand',
      changeValueFn: () => 'testValue',
    });

    const expected = {primary: {base: 'testValue'}};

    expect(result).toStrictEqual(expected);
  });
});

describe('utils to change value', () => {
  it('should transform single value token to css variable', () => {
    const result = changeValuesToCSSVars(mockBrandToken, () => [mockBaseToken]);

    const expected = {cssVarName: '--cnvs-brand-primary-base'};

    expect(result).toStrictEqual(expected);
  });

  it('should transform fallback brand token to css variable', () => {
    const result = changeValuesToCSSVars(mockFallbackBrandToken, () => [mockBaseToken]);

    const expected = {
      cssVarName: '--cnvs-brand-primary-a600',
      fallbackValue: 'var(--cnvs-brand-primary-a600, var(--cnvs-base-palette-blueberry-400, blue))',
    };

    expect(result).toStrictEqual(expected);
  });

  it('should transform fallback base token to css variable', () => {
    const result = changeValuesToCSSVars(mockFallbackBaseToken, () => [mockBaseToken]);

    const expected = {
      cssVarName: '--cnvs-base-palette-blue-600',
      fallbackValue:
        'var(--cnvs-base-palette-blue-600, var(--cnvs-base-palette-blueberry-400, blue))',
    };

    expect(result).toStrictEqual(expected);
  });

  it('should transform composite tokens into css rule sets', () => {
    const result = changeValuesToCSSVars(mockCompositeToken, () => [mockBaseToken]);

    const expected = {color: {cssVarName: '--cnvs-base-palette-blueberry-400'}};

    expect(result).toStrictEqual(expected);
  });

  it('should fall back each typography sub-property to its own referenced token', () => {
    const refMap: Record<string, any> = {
      '{sys.font-family.default}': {
        path: ['sys', 'font-family', 'default'],
        value: 'Roboto',
        original: {value: '{base.font-family.50}', type: 'text'},
      },
      '{sys.font-weight.normal}': {
        path: ['sys', 'font-weight', 'normal'],
        value: 'Regular',
        original: {value: '{base.font-weight.400}', type: 'text'},
      },
      '{sys.line-height.body.md}': {
        path: ['sys', 'line-height', 'body', 'md'],
        value: '1rem / 2 * 3.50',
        original: {
          value: '{base.size.350}',
          type: 'number',
          deprecatedValues: {v3: 'sys.line-height.body.medium', base: '1.75rem'},
        },
      },
      '{sys.font-size.body.md}': {
        path: ['sys', 'font-size', 'body', 'md'],
        value: '1rem / 2 * 2.25',
        original: {
          value: '{base.size.225}',
          type: 'sizing',
          deprecatedValues: {v3: 'sys.font-size.body.medium', base: '1.125rem'},
        },
      },
      '{sys.letter-spacing.body.sm}': {
        path: ['sys', 'letter-spacing', 'body', 'sm'],
        value: 0.4,
        original: {
          value: '{base.letter-spacing.200}',
          type: 'number',
          deprecatedValues: {v3: 'sys.type.letter-spacing.body.small'},
        },
      },
    };

    const mockTypographyToken = {
      value: {
        'font-family': 'Roboto',
        'font-weight': 'Regular',
        'line-height': '1rem / 2 * 3.50',
        'font-size': '1rem / 2 * 2.25',
        'letter-spacing': 0.4,
      },
      type: 'typography',
      filePath: 'tokens/web/sys.json',
      isSource: true,
      original: {
        value: {
          'font-family': '{sys.font-family.default}',
          'font-weight': '{sys.font-weight.normal}',
          'line-height': '{sys.line-height.body.md}',
          'font-size': '{sys.font-size.body.md}',
          'letter-spacing': '{sys.letter-spacing.body.sm}',
        },
        type: 'typography',
        deprecatedValues: {v3: 'sys.type.body.md'},
      },
      name: 'typeBodyMd',
      attributes: {},
      path: ['sys', 'type', 'body', 'md'],
    };

    const result = changeValuesToCSSVars(mockTypographyToken as any, value => [refMap[value as string]]);

    const expected = {
      fontFamily: {
        cssVarName: '--cnvs-sys-font-family-default',
        fallbackValue: 'var(--cnvs-sys-font-family-default, "Roboto")',
      },
      fontWeight: {
        cssVarName: '--cnvs-sys-font-weight-normal',
        fallbackValue: 'var(--cnvs-sys-font-weight-normal, 400)',
      },
      lineHeight: {
        cssVarName: '--cnvs-sys-line-height-body-md',
        fallbackValue: 'var(--cnvs-sys-line-height-body-md, 1.75rem)',
      },
      fontSize: {
        cssVarName: '--cnvs-sys-font-size-body-md',
        fallbackValue: 'var(--cnvs-sys-font-size-body-md, 1.125rem)',
      },
      letterSpacing: {
        cssVarName: '--cnvs-sys-letter-spacing-body-sm',
        fallbackValue: 'var(--cnvs-sys-letter-spacing-body-sm, 0.025rem)',
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should transform to original value', () => {
    const result = getOriginalValues(mockCompositeToken);

    const expected = {
      color: {
        comment: 'Use for primary background',
        value: '{base.palette.blueberry.400}',
        raw: {
          color: '{base.palette.blueberry.400}',
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should transform to original math value', () => {
    const result = getOriginalValues(mockMathToken);

    const expected = {
      comment: 'Use for spaces between elements',
      value: '0.25rem * 4',
      raw: '{base.unit} * 4',
    };

    expect(result).toStrictEqual(expected);
  });
});
