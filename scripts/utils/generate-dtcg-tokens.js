#!/usr/bin/env node
import {generateDtcgTokens} from './token-parser/generate.js';

const {outputDir, files} = generateDtcgTokens();

console.log(
  `Generated ${files.length} token files in ${outputDir}.\n  - ${files.join('\n  - ')}`
);
