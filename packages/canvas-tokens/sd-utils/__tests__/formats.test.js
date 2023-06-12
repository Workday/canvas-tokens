const {formatToBasicTS, formatToInlineModule} = require('../formats');

const headerContent = `// Test Header\n\n`;
const moduleContent = `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`;

describe('formats', () => {
  let mockDictionary, mockOptions;

  beforeEach(() => {
    mockDictionary = {
      allTokens: [
        {name: 'cinnamon100', value: '#ffefee'},
        {name: 'cinnamon200', value: '#fcc9c5'},
      ],
    };
    mockOptions = {
      fileHeader: () => [`Test Header`],
    };
  });

  describe('formatToBasicTS', () => {
    it('should return correct file structure', () => {
      const result = formatToBasicTS({dictionary: mockDictionary, options: mockOptions});
      const expected =
        headerContent +
        `export declare const cinnamon100 = "#ffefee";\nexport declare const cinnamon200 = "#fcc9c5";\n`;

      expect(result).toBe(expected);
    });
  });

  describe('formatToInlineModule', () => {
    it('should return correct file structure', () => {
      const result = formatToInlineModule({dictionary: mockDictionary, options: mockOptions});
      const expected =
        headerContent +
        moduleContent +
        `exports.cinnamon100 = "#ffefee";\nexports.cinnamon200 = "#fcc9c5";\n`;

      expect(result).toBe(expected);
    });
  });
});
