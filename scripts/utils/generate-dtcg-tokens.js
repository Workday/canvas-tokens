#!/usr/bin/env node
import fs from 'fs';
import {createContext} from './token-parser/context.js';
import {
  clearOutputDir,
  mergeFileMaps,
  readInputDir,
  readInputFile,
  sortInputFiles,
  writeOutputFiles,
} from './token-parser/file.js';
import {generateStyleTokens} from './token-parser/styles.js';
import {generateVariableTokens} from './token-parser/variables.js';

const INPUT_DIR = 'figma-raw-tokens';
const OUTPUT_DIR = 'packages/canvas-tokens/dtcg/tokens';

function main() {
  const output = new Map();
  let context;

  clearOutputDir(OUTPUT_DIR);

  for (const file of sortInputFiles(readInputDir(INPUT_DIR))) {
    const payload = readInputFile(file, INPUT_DIR);

    if (context) {
      context.extend(payload);
    } else {
      context = createContext(payload);
    }

    mergeFileMaps(output, generateVariableTokens(payload, context), generateStyleTokens(payload));
  }

  writeOutputFiles(output, OUTPUT_DIR);

  const filenames = fs.readdirSync(OUTPUT_DIR, {recursive: true});
  console.log(
    `Generated ${filenames.length} token files in ${OUTPUT_DIR}.\n  - ${filenames.join('\n  - ')}`
  );
}

main();
