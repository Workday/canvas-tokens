import fs from 'fs';
import {decodeJSONBufferString} from './parse-utils';
import path from 'path';

type Transform = (
  tokens: Record<string, any>,
  parsed?: any,
  level?: string
) => Record<string, string[]>;

const transformToRefs: Transform = (tokens, parsed = {}, level = '') => {
  const keys = Object.keys(tokens);

  keys.forEach(key => {
    const isHighestLevel = /base|brand|sys/.test(key);
    if (isHighestLevel) {
      parsed[key] = [];
    }

    if (keys.includes('value')) {
      parsed?.push(level);
      return parsed;
    }

    transformToRefs(
      tokens[key],
      isHighestLevel ? parsed[key] : parsed,
      isHighestLevel ? '' : level ? `${level}.${key}` : key
    );
  });

  return parsed;
};

export const generateRefs = async (file: any) => {
  const refsFileName = path.resolve(__dirname, '../../packages/canvas-tokens/_refs.json');

  await fs.readFile(refsFileName, async (err, data) => {
    const tokens = transformToRefs(file);

    if (err || !data) {
      fs.writeFileSync(refsFileName, JSON.stringify(tokens));
    } else {
      // @ts-ignore
      const content = decodeJSONBufferString(data);
      fs.writeFileSync(refsFileName, JSON.stringify({...content, ...tokens}));
    }
  });
};
