import path from 'path';
import fs from 'fs';

import {generateExistingTokens} from './get-tokens-array.js';

const _root = '../../';
const _dir = path.join(_root, 'packages/canvas-tokens-web');

console.log(_dir);

const tokens = generateExistingTokens();
fs.writeFileSync(path.join(_dir, 'existing-tokens.json'), JSON.stringify(tokens, null, 2));
