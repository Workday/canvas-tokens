import {formats} from '../formatters';

jest.mock('style-dictionary', () => ({
  format: {
    'es6/objects': ({dictionary}: any) => {
      const recursivelyFlatObjectValue = ({tokens, isFallback, isRoot = true}: any) => {
        if (isFallback) {
          if ('fallbackValue' in tokens) {
            return tokens.fallbackValue;
          }
          if ('cssVarName' in tokens) {
            return undefined;
          }
        }

        if ('cssVarName' in tokens) {
          return tokens.cssVarName;
        }

        const next: Record<string, any> = {};

        for (const key of Object.keys(tokens)) {
          const value = recursivelyFlatObjectValue({
            tokens: tokens[key],
            isFallback,
            isRoot: false,
          });

          if (!(isFallback && value === undefined)) {
            next[key] = value;
          }
        }

        if (isFallback && !isRoot && !Object.keys(next).length) {
          return undefined;
        }

        return next;
      };

      const mainTokens = recursivelyFlatObjectValue({tokens: dictionary.properties});
      const body = mainTokens
        ? Object.entries(mainTokens).reduce((acc: string, [key, values]) => {
            return (acc += `export const ${key} = ` + JSON.stringify(values, null, 2) + ';\n');
          }, '')
        : '';

      const legacyTokens = recursivelyFlatObjectValue({
        tokens: dictionary.properties,
        isFallback: true,
      });
      const legacyBlock = legacyTokens
        ? `export const legacy = ${JSON.stringify(legacyTokens, null, 2)};\n`
        : '';

      return body + legacyBlock;
    },
    'javascript/types': () =>
      `export declare const opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n}`,
    'javascript/common-js': () => `exports.cinnamon100 = "--cnvs-base-palette-cinnamon-100";`,
    'css/variables': () => `:root {\n --cnvs-sys-shape-zero: 0rem;\n}`,
    'css/composite': () =>
      `.cnvs-sys-border-input-default {\n border: var(--cnvs-sys-line-default);\n}`,
    'css/shadow': () => ` --cnvs-sys-depth-1: 0 0 0 0 black;`,
  },
  formatHelpers: {
    fileHeader: () => `// Test Header\n\n`,
  },
}));

const headerContent = `// Test Header\n\n`;
const moduleContent = `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`;

describe('formats', () => {
  // FormatterArguments isn't exported, so we're getting the Parameters from the Formatter type
  // Since there's only one argument, we're getting the zeroth item.
  let defaultArgs: any;
  let mockDictionary: any, mockOptions: any;

  beforeEach(() => {
    mockDictionary = {
      allTokens: [
        {
          name: 'cinnamon100',
          value: '#ffefee',
          path: ['base', 'palette', 'cinnamon', '100'],
          filePath: '',
          isSource: true,
          original: {value: '#ffefee'},
        },
        {
          name: 'amber100',
          value: 'oklch(0.9567 0.0948 100.22 / 1)',
          path: ['base', 'palette', 'amber', '100'],
          filePath: '',
          isSource: true,
          original: {
            value: 'oklch(0.9567 0.0948 100.22 / 1)',
            deprecatedValues: {v2: 'base.palette.cinnamon.100'},
          },
        },
      ],
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
    };
    mockOptions = {
      fileHeader: () => ['Test Header'],
    };

    defaultArgs = {
      dictionary: mockDictionary,
      options: mockOptions,
      file: {destination: '/mock/file/destination'},
      platform: {prefix: 'cnvs-'},
    };
  });

  describe('js/common-js', () => {
    it('should return correct file structure as inline js vars', () => {
      const result = formats['js/common-js'](defaultArgs);
      const expected =
        headerContent +
        moduleContent +
        `exports.cinnamon100 = "--cnvs-base-palette-cinnamon-100";\nexports.amber100 = "--cnvs-base-palette-amber-100";\n\nexports.legacy = {\n  amber100: "var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9567 0.0948 100.22 / 1)))"\n};\n`;

      expect(result).toBe(expected);
    });
  });

  describe('js/es6', () => {
    it('should return correct file structure as inline js vars', () => {
      const result = formats['js/es6'](defaultArgs);
      const expected =
        headerContent +
        `export const cinnamon100 = "--cnvs-base-palette-cinnamon-100";\nexport const amber100 = "--cnvs-base-palette-amber-100";\n\nexport const legacy = {\n  amber100: "var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9567 0.0948 100.22 / 1)))"\n};\n`;

      expect(result).toBe(expected);
    });

    it('should use deprecatedValues.base as the inner fallback when present', () => {
      const result = formats['js/es6']({
        ...defaultArgs,
        dictionary: {
          allTokens: [
            {
              name: 'amber100',
              value: 'oklch(0.9567 0.0948 100.22 / 1)',
              path: ['base', 'palette', 'amber', '100'],
              filePath: '',
              isSource: true,
              original: {
                value: 'oklch(0.9567 0.0948 100.22 / 1)',
                deprecatedValues: {
                  v2: 'base.palette.cinnamon.100',
                  base: 'oklch(0.9 0.05 100 / 1)',
                },
              },
            },
          ],
          getReferences: () => [],
        },
      });

      const expected =
        headerContent +
        'export const amber100 = "--cnvs-base-palette-amber-100";\n\nexport const legacy = {\n  amber100: "var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9 0.05 100 / 1)))"\n};\n';

      expect(result).toBe(expected);
    });
  });

  describe('ts/inline', () => {
    it('should return correct file structure as inline js vars', () => {
      const result = formats['ts/inline'](defaultArgs);
      const expected =
        headerContent +
        `export declare const cinnamon100 = "--cnvs-base-palette-cinnamon-100";\nexport declare const amber100 = "--cnvs-base-palette-amber-100";\n\nexport declare const legacy: {\n  amber100: "var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9567 0.0948 100.22 / 1)))"\n};\n`;

      expect(result).toBe(expected);
    });
  });

  describe('es6/objects', () => {
    it('should return correct file structure', () => {
      const result = formats['es6/objects']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
          properties: {
            opacity: {
              disabled: {
                cssVarName: '--cnvs-base-opacity-300',
                fallbackValue: 'var(--cnvs-base-opacity-300, 0.3)',
              },
            },
          },
        },
      });
      const expectedLegacy = {
        opacity: {
          disabled: 'var(--cnvs-base-opacity-300, 0.3)',
        },
      };
      const expected =
        headerContent +
        `export const opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n};\n` +
        `export const legacy = ${JSON.stringify(expectedLegacy, null, 2)};\n`;

      expect(result).toBe(expected);
    });
  });

  describe('common-js/objects', () => {
    it('should return correct file structure', () => {
      const result = formats['common-js/objects']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
          properties: {
            opacity: {
              disabled: {
                cssVarName: '--cnvs-base-opacity-300',
                fallbackValue: 'var(--cnvs-base-opacity-300, 0.3)',
              },
            },
          },
        },
      });
      const expectedLegacy = {
        opacity: {
          disabled: 'var(--cnvs-base-opacity-300, 0.3)',
        },
      };
      const expected =
        headerContent +
        moduleContent +
        `exports.opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n};\n` +
        `exports.legacy = ${JSON.stringify(expectedLegacy, null, 2)};\n`;

      expect(result).toBe(expected);
    });
  });

  describe('es6/packages-export', () => {
    it('should return correct file structure', () => {
      const result = formats['es6/packages-export']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
          properties: {
            base: {},
            sys: {},
          },
        },
      });
      const expected =
        headerContent +
        `import * as base from "./base";\nimport * as system from "./system";\nexport {base,system}`;

      expect(result).toBe(expected);
    });
  });

  describe('common-js/packages-export', () => {
    it('should return correct file structure', () => {
      const result = formats['common-js/packages-export']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
          properties: {
            base: {},
            sys: {},
          },
        },
      });
      const expected =
        headerContent +
        moduleContent +
        `var base = require("./base");\nexports.base = base;\nvar system = require("./system");\nexports.system = system;\n`;

      expect(result).toBe(expected);
    });
  });

  describe('css/composite', () => {
    it('should return correct file structure', () => {
      const result = formats['css/composite']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
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
          ],
        },
      });
      const expected =
        '.cnvs-sys-border-input-disabled {\n  border: var(--cnvs-sys-line-disabled);\n}';

      expect(result).toBe(expected);
    });
  });

  describe('scss/composite', () => {
    it('should return correct file structure', () => {
      const result = formats['scss/composite']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
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
          ],
        },
      });
      const expected = '.cnvs-sys-border-input-disabled {\n  border: $cnvs-sys-line-disabled;\n}';

      expect(result).toBe(expected);
    });
  });

  describe('less/composite', () => {
    it('should return correct file structure', () => {
      const result = formats['less/composite']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
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
          ],
        },
      });
      const expected = '.cnvs-sys-border-input-disabled {\n  border: @cnvs-sys-line-disabled;\n}';

      expect(result).toBe(expected);
    });
  });

  describe('merge/objects', () => {
    it('should return correct file structure for system tokens', () => {
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

      const legacyBorderToken = {
        value: '--cnvs-sys-color-border-input-inverse-default',
        type: 'color',
        filePath: 'tokens/all.json',
        isSource: true,
        original: {
          value: '{base.palette.neutral.0}',
          type: 'composition',
          deprecatedValues: {
            v2: 'base.palette.neutral.0',
            base: '#FFFFFF',
          },
        },
        name: 'borderColorInputInverseDefault',
        deprecatedValues: {
          v3: 'sys.color.border.input.inverse',
          base: '#FFFFFF',
        },
        attributes: {},
        path: ['sys', 'color', 'border', 'input', 'inverse', 'default'],
      };

      const result = formats['merge/objects']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
          allTokens: [borderToken, legacyBorderToken],
          properties: {
            sys: {
              border: {
                input: {
                  disabled: borderToken,
                },
              },
              color: {
                border: {
                  input: {
                    inverse: {
                      default: legacyBorderToken,
                    },
                  },
                },
              },
            },
          },
        },
        options: {
          formats: ['es6/objects'],
          level: 'sys',
        },
      });

      const expectedLegacy = {
        color: {
          border: {
            input: {
              inverse: {
                default:
                  'var(--cnvs-sys-color-border-input-inverse-default, var(--cnvs-base-palette-neutral-0, #FFFFFF))',
              },
            },
          },
        },
      };
      const expected =
        `export const border = {\n  "input": {\n    "disabled": "--cnvs-sys-border-input-disabled"\n  }\n};\n` +
        `export const color = {\n  "border": {\n    "input": {\n      "inverse": {\n        "default": "--cnvs-sys-color-border-input-inverse-default"\n      }\n    }\n  }\n};\n` +
        `export const legacy = ${JSON.stringify(expectedLegacy, null, 2)};\n`;

      expect(result).toBe(expected);
    });
  });

  describe('merge/types', () => {
    it('should return correct file structure for es6', () => {
      const result = formats['merge/types']({
        ...defaultArgs,
        options: {
          formats: ['javascript/types'],
          level: 'sys',
        },
        dictionary: {
          properties: {
            opacity: {
              disabled: '--cnvs-base-opacity-300',
            },
          },
        },
      });

      const expected =
        'export declare const opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n}';

      expect(result).toBe(expected);
    });
  });

  describe('ts/jsdoc-object', () => {
    it('should return correct file structure with between line JSDoc', () => {
      const result = formats['ts/jsdoc-object']({
        ...defaultArgs,
        options: {
          originalValues: {
            opacity: {
              disabled: {
                comment: 'Test JSDoc',
                value: '0.4',
                raw: '{base.opacity.400}',
              },
            },
          },
        },
        dictionary: {
          properties: {
            opacity: {
              disabled: {
                cssVarName: '--cnvs-base-opacity-300',
              },
              legacy: {
                cssVarName: '--cnvs-base-opacity-legacy',
                fallbackValue: 'var(--cnvs-base-opacity-legacy, 0.3)',
              },
            },
          },
        },
      });

      const legacyJSDoc = `\n/**\n * Temporary legacy object including fallback values to older versions of the tokens\n * for internal use only, will be removed in the future\n */\n`;

      const expectedLegacy = {
        opacity: {
          legacy: 'var(--cnvs-base-opacity-legacy, 0.3)',
        },
      };

      const expected =
        headerContent +
        'export declare const opacity: {\n  /**\n   * **value**: `0.4`\n   * \n   * **CSS Var**: `--cnvs-base-opacity-300`\n   * \n   * Test JSDoc\n   */\n  "disabled": "--cnvs-base-opacity-300",\n  "legacy": "--cnvs-base-opacity-legacy",\n};\n' +
        legacyJSDoc +
        `export declare const legacy: ${JSON.stringify(expectedLegacy, null, 2)};\n`;

      expect(result).toBe(expected);
    });

    it('should have one line jsDoc for tokens without comment', () => {
      const result = formats['ts/jsdoc-object']({
        ...defaultArgs,
        options: {
          originalValues: {
            opacity: {
              disabled: {
                value: '0.4',
              },
            },
          },
        },
        dictionary: {
          properties: {
            opacity: {
              disabled: {cssVarName: '--cnvs-base-opacity-300'},
              legacy: {
                cssVarName: '--cnvs-base-opacity-legacy',
                fallbackValue: 'var(--cnvs-base-opacity-legacy, 0.3)',
              },
            },
          },
        },
      });

      const legacyJSDoc = `\n/**\n * Temporary legacy object including fallback values to older versions of the tokens\n * for internal use only, will be removed in the future\n */\n`;

      const expectedLegacy = {
        opacity: {
          legacy: 'var(--cnvs-base-opacity-legacy, 0.3)',
        },
      };

      const expected =
        headerContent +
        'export declare const opacity: {\n  /**\n   * **value**: `0.4`\n   * \n   * **CSS Var**: `--cnvs-base-opacity-300`\n   */\n  "disabled": "--cnvs-base-opacity-300",\n  "legacy": "--cnvs-base-opacity-legacy",\n};\n' +
        legacyJSDoc +
        `export declare const legacy: ${JSON.stringify(expectedLegacy, null, 2)};\n`;

      expect(result).toBe(expected);
    });
  });

  describe('merge/refs', () => {
    it('should return correct file structure for es6', () => {
      const result = formats['merge/refs']({
        ...defaultArgs,
        options: {
          formats: ['css/composite', 'css/variables', 'css/shadow'],
          level: 'sys',
        },
      });

      const expected =
        `:root {\n --cnvs-sys-depth-1: 0 0 0 0 black;\n --cnvs-sys-shape-zero: 0rem;\n}` +
        '\n' +
        `.cnvs-sys-border-input-default {\n border: var(--cnvs-sys-line-default);\n}`;

      expect(result).toBe(expected);
    });
  });
});
