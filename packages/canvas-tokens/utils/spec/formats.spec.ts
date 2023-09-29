import {formats} from '../formatters';

jest.mock('../tokenStudioParser', () => ({
  resolveRef: (ref: string, resolver: (full: string, ref: string) => string) =>
    ref.replace(/\{([^}]+)\}/gi, resolver),
}));

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
    'javascript/common-js': () => `exports.cinnamon100 = "--cnvs-base-palette-cinnamon-100";`,
    'css/variables': () => `:root {\n --cnvs-sys-shape-zero: 0rem;\n}`,
    'css/composite': () =>
      `.cnvs-sys-border-input-default {\n border: var(--cnvs-sys-line-default);\n}`,
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
          path: [''],
          filePath: '',
          isSource: true,
          original: {value: '#ffefee'},
        },
        {
          name: 'cinnamon200',
          value: '#fcc9c5',
          path: [''],
          filePath: '',
          isSource: true,
          original: {value: '#fcc9c5'},
        },
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

  describe('javascript/common-js', () => {
    it('should return correct file structure as inline js vars', () => {
      const result = formats['javascript/common-js'](defaultArgs);
      const expected =
        headerContent +
        moduleContent +
        `exports.cinnamon100 = "#ffefee";\nexports.cinnamon200 = "#fcc9c5";\nexports.cnvs-sys-border-input-disabled = "[object Object]";\n`;

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

      expect(result).toBe(expected); //?
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

      expect(result).toBe(expected); //?
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
          formats: ['javascript/es6'],
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

    it('should return correct file structure for common-js', () => {
      const result = formats['merge/types']({
        ...defaultArgs,
        options: {
          formats: ['javascript/common-js'],
          level: 'sys',
        },
      });

      const expected = 'export declare const cinnamon100 = "--cnvs-base-palette-cinnamon-100";';

      expect(result).toBe(expected); //
    });
  });

  describe('es6/types', () => {
    it('should return correct file structure for es6', () => {
      const result = formats['es6/types']({
        ...defaultArgs,
        options: {
          formats: ['javascript/es6'],
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
        headerContent +
        'export declare const opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n} as const;' +
        '\n\n';

      expect(result).toBe(expected);
    });
  });

  describe('common-js/types', () => {
    it('should return correct file structure for es6', () => {
      const result = formats['es6/types']({
        ...defaultArgs,
        options: {
          formats: ['javascript/common-js'],
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
        headerContent +
        'export declare const opacity = {\n  "disabled": "--cnvs-base-opacity-300"\n} as const;' +
        '\n\n';

      expect(result).toBe(expected);
    });
  });

  describe('merge/refs', () => {
    it('should return correct file structure for es6', () => {
      const result = formats['merge/refs']({
        ...defaultArgs,
        options: {
          formats: ['css/composite', 'css/variables'],
          level: 'sys',
        },
      });

      const expected =
        `:root {\n --cnvs-sys-shape-zero: 0rem;\n}` +
        '\n' +
        `.cnvs-sys-border-input-default {\n border: var(--cnvs-sys-line-default);\n}`;

      expect(result).toBe(expected);
    });
  });
});
