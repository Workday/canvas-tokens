import path from 'path';
import fs from 'fs';

import tokens from '../../packages/canvas-tokens-web/existing-tokens.json' with { type: 'json' };
import {generateExistingTokens} from './get-tokens-array.js';

const _dir = path.join(process.cwd(), 'packages/canvas-tokens-web');

const validateTokens = () => {
  const newTokens = generateExistingTokens();

  const removed = tokens.filter(token => !newTokens.includes(token));
//   const added = newTokens.filter(token => !tokens.includes(token));

if (removed.length > 0) {
    console.log(
      `⚠️ The following tokens will be removed:\n  ${removed.map(token => `- ${token.split('-').slice(3).join('.')}`).join('\n  ')}
      `
    )

    fs.unlinkSync(path.join(_dir, 'existing-tokens.json'));
  }
};

validateTokens();
