import fs from 'fs';
import {decodeJSONBufferString} from './parse-utils';
const path = require('path');

const transformToRefs = (tokens: any, parsed = {}, level = '') => {
  const keys = Object.keys(tokens);

  keys.forEach(key => {
    const isHighestLevel = /base|brand|sys/.test(key);
    if (isHighestLevel) {
      // @ts-ignore
      parsed[key] = [];
    }

    if (keys.includes('value')) {
      // @ts-ignore
      parsed.push(level);
      return parsed;
    }

    transformToRefs(
      tokens[key],
      // @ts-ignore
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
      fs.writeFile(refsFileName, JSON.stringify(tokens), () => {});
    } else {
      // @ts-ignore
      const content = decodeJSONBufferString(data);
      fs.writeFile(refsFileName, JSON.stringify({...content, ...tokens}), () => {});
    }
  });
};
