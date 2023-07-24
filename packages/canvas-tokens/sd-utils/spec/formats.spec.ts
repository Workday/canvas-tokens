import {Dictionary, Options, Formatter} from 'style-dictionary';
import {formatToBasicTS, formatToInlineModule} from '../formats';

const headerContent = `// Test Header\n\n`;
const moduleContent = `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`;

describe('formats', () => {
  // FormatterArguments isn't exported, so we're getting the Parameters from the Formatter type
  // Since there's only one argument, we're getting the zeroth item.
  let defaultArgs: Parameters<Formatter>[0];
  let mockDictionary: Dictionary, mockOptions: Options;

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
      ],
    } as Dictionary;
    mockOptions = {
      fileHeader: () => ['Test Header'],
    } as Options;

    defaultArgs = {
      dictionary: mockDictionary,
      options: mockOptions,
      file: {destination: '/mock/file/destination'},
      platform: {},
    };
  });

  describe('formatToBasicTS', () => {
    it('should return correct file structure', () => {
      const result = formatToBasicTS(defaultArgs);
      const expected =
        headerContent +
        `export declare const cinnamon100 = "#ffefee";\nexport declare const cinnamon200 = "#fcc9c5";\n`;

      expect(result).toBe(expected);
    });
  });

  describe('formatToInlineModule', () => {
    it('should return correct file structure', () => {
      const result = formatToInlineModule(defaultArgs);
      const expected =
        headerContent +
        moduleContent +
        `exports.cinnamon100 = "#ffefee";\nexports.cinnamon200 = "#fcc9c5";\n`;

      expect(result).toBe(expected);
    });
  });
});
