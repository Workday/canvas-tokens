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
      fallbackValue: 'var(--cnvs-base-palette-blueberry-400, blue)',
    };

    expect(result).toStrictEqual(expected);
  });

  it('should transform fallback base token to css variable', () => {
    const result = changeValuesToCSSVars(mockFallbackBaseToken, () => [mockBaseToken]);

    const expected = {
      cssVarName: '--cnvs-base-palette-blue-600',
      fallbackValue: 'var(--cnvs-base-palette-blueberry-400, blue)',
    };

    expect(result).toStrictEqual(expected);
  });

  it('should transform composite tokens into css rule sets', () => {
    const result = changeValuesToCSSVars(mockCompositeToken, () => [mockBaseToken]);

    const expected = {color: {cssVarName: '--cnvs-base-palette-blueberry-400'}};

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
