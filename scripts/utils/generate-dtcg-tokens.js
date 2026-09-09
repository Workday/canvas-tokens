#!/usr/bin/env node
import {generateDtcgTokens} from './token-parser/generate.js';

const ignoreDarkMode = process.argv.includes('--ignore-dark-mode');

const {outputDir, files} = generateDtcgTokens({ignoreDarkMode});

console.log(
  `Generated ${files.length} token files in ${outputDir}.\n  - ${files.join('\n  - ')}`
);
