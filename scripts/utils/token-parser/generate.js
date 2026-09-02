import {createContext} from './context.js';
import {
  clearOutputDir,
  listOutputFiles,
  mergeFileMaps,
  readInputDir,
  readInputFile,
  sortInputFiles,
  writeOutputFiles,
} from './file.js';
import {generateStyleTokens} from './styles.js';
import {generateVariableTokens} from './variables.js';

export const DEFAULT_INPUT_DIR = 'figma-raw-tokens';
export const DEFAULT_OUTPUT_DIR = 'packages/canvas-tokens/dtcg/tokens';

function createSharedContext(payloads) {
  const [first, ...rest] = payloads;
  const context = createContext(first);
  rest.forEach(payload => context.extend(payload));
  return context;
}

function generateFromPayloads(payloads) {
  const context = createSharedContext(payloads);
  const fileMaps = payloads.flatMap(payload => [
    generateVariableTokens(payload, context),
    generateStyleTokens(payload, context),
  ]);

  return mergeFileMaps(new Map(), ...fileMaps);
}

export function generateDtcgTokens({
  inputDir = DEFAULT_INPUT_DIR,
  outputDir = DEFAULT_OUTPUT_DIR,
} = {}) {
  clearOutputDir(outputDir);

  const payloads = sortInputFiles(readInputDir(inputDir)).map(file =>
    readInputFile(file, inputDir)
  );
  const output = generateFromPayloads(payloads);

  writeOutputFiles(output, outputDir);

  return {
    outputDir,
    files: listOutputFiles(outputDir),
  };
}
