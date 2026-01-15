import path from 'path';
import fs from 'fs';
import process from 'process';

const _dir = path.join(process.cwd(), 'packages/canvas-tokens-web');

export const readAndExtractTokens = level => {
  const fileContent = fs.readFileSync(path.join(_dir, `css/${level}/_variables.css`), 'utf8');
  const tokens = fileContent.match(/--[\w-]+(?=:)/g) || [];
  return tokens;
};

export const generateExistingTokens = () => {
  const baseTokens = readAndExtractTokens('base');
  const brandTokens = readAndExtractTokens('brand');
  const sysTokens = readAndExtractTokens('system');

  return [...baseTokens, ...brandTokens, ...sysTokens];
};
