import {transformHexToHsla, transformNameToCamelCase} from '../transforms';

describe('transformHexToHsla', () => {
  it('should return correct hsla value', () => {
    const result = transformHexToHsla({value: '#ffefee'});
    const expected = 'hsla(3.5, 100%, 96.7%, 1)';

    expect(result).toBe(expected);
  });
});

describe('transformNameToCamelCase', () => {
  it('should return correct name in camel case', () => {
    const result = transformNameToCamelCase({
      path: ['color', 'base', 'sour-lemon', '100'],
      value: '#fff9e6',
    });
    const expected = 'sourLemon100';

    expect(result).toBe(expected);
  });
});
