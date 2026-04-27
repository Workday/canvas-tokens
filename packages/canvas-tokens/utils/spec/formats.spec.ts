import {formats} from '../formatters';

jest.mock('style-dictionary', () => ({
  format: {
    'es6/objects': ({dictionary}: any) => {
      const [first] = Object.keys(dictionary.properties);
      return `export const ${first} = ` + JSON.stringify(dictionary.properties[first], null, 2);
    },
    'javascript/es6': ({dictionary}: any) => {
      const [first] = Object.keys(dictionary.properties);
      return `exports.${first} = ` + JSON.stringify(dictionary.properties[first], null, 2);
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
        `exports.cinnamon100 = "--cnvs-base-palette-cinnamon-100";\nexports.amber100 = "var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9567 0.0948 100.22 / 1)))";\n`;

      expect(result).toBe(expected);
    });
  });

  describe('js/es6', () => {
    it('should return correct file structure as inline js vars', () => {
      const result = formats['js/es6'](defaultArgs);
      const expected =
        headerContent +
        `export const cinnamon100 = "--cnvs-base-palette-cinnamon-100";\nexport const amber100 = "var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9567 0.0948 100.22 / 1)))";\n`;

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

      expect(result).toContain(
        'var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9 0.05 100 / 1)))'
      );
    });
  });

  describe('ts/inline', () => {
    it('should return correct file structure as inline js vars', () => {
      const result = formats['ts/inline'](defaultArgs);
      const expected =
        headerContent +
        `export declare const cinnamon100: "--cnvs-base-palette-cinnamon-100";\nexport declare const amber100: "var(--cnvs-base-palette-amber-100, var(--cnvs-base-palette-cinnamon-100, oklch(0.9567 0.0948 100.22 / 1)))";\n`;

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
              disabled: '--cnvs-base-opacity-300',
            },
          },
        },
      });
      const expected =
        headerContent + `export const opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n};\n`;

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
              disabled: '--cnvs-base-opacity-300',
            },
          },
        },
      });
      const expected =
        headerContent +
        moduleContent +
        `exports.opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n};\n`;

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

      const result = formats['merge/objects']({
        ...defaultArgs,
        dictionary: {
          ...defaultArgs.dictionary,
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
        },
        options: {
          formats: ['es6/objects'],
          level: 'sys',
        },
      });

      const expected = `export const border = {\n  "input": {\n    "disabled": "--cnvs-sys-border-input-disabled"\n  }\n}`;

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
              disabled: '--cnvs-base-opacity-300',
            },
          },
        },
      });

      const expected =
        headerContent +
        'export declare const opacity: {\n  /**\n   * **value**: `0.4`\n   * \n   * **CSS Var**: `--cnvs-base-opacity-300`\n   * \n   * Test JSDoc\n   */\n  "disabled": "--cnvs-base-opacity-300",\n};\n';

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
              disabled: '--cnvs-base-opacity-300',
            },
          },
        },
      });

      const expected =
        headerContent +
        'export declare const opacity: {\n  /**\n   * **value**: `0.4`\n   * \n   * **CSS Var**: `--cnvs-base-opacity-300`\n   */\n  "disabled": "--cnvs-base-opacity-300",\n};\n';

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
