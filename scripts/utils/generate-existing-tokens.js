import path from 'path';
import fs from 'fs';
import process from 'process';

import {generateExistingTokens} from './get-tokens-array.js';

const _dir = path.join(process.cwd(), 'packages/canvas-tokens-web');

const tokens = generateExistingTokens();
fs.writeFileSync(path.join(_dir, 'existing-tokens.json'), JSON.stringify(tokens, null, 2));
