#!/usr/bin/env node
import {generateDtcgTokens} from './token-parser/generate.js';

const ignoreDarkMode = process.argv.includes('--ignore-dark-mode');
const colorFormat = process.argv.includes('--rgba') ? 'rgba' : undefined;

const {outputDir, files} = generateDtcgTokens({ignoreDarkMode, colorFormat});

console.log(
  `Generated ${files.length} token files in ${outputDir}.\n  - ${files.join('\n  - ')}`
);
