import {createContext} from './context.js';
import {
  clearOutputDir,
  listOutputFiles,
  mergeFileMaps,
  readInputDir,
  readInputFile,
  readOutputDir,
  sortInputFiles,
  writeOutputFiles,
} from './file.js';
import {generateStyleTokens} from './styles.js';
import {markDeprecatedTokens} from './tokens.js';
import {generateVariableTokens} from './variables.js';

export const DEFAULT_INPUT_DIR = 'figma-raw-tokens';
export const DEFAULT_OUTPUT_DIR = 'packages/canvas-tokens/dtcg/tokens';

function createSharedContext(payloads, options) {
  const [first, ...rest] = payloads;
  const context = createContext(first, options);
  rest.forEach(payload => context.extend(payload));
  return context;
}

function generateFromPayloads(payloads, {ignoreDarkMode, colorFormat, removedPaths} = {}) {
  const context = createSharedContext(payloads, {colorFormat});
  const fileMaps = payloads.flatMap(payload => [
    generateVariableTokens(payload, context, {ignoreDarkMode, removedPaths}),
    generateStyleTokens(payload, context),
  ]);

  return mergeFileMaps(new Map(), ...fileMaps);
}

export function generateDtcgTokens({
  inputDir = DEFAULT_INPUT_DIR,
  outputDir = DEFAULT_OUTPUT_DIR,
  ignoreDarkMode = false,
  colorFormat,
} = {}) {
  const previousOutput = readOutputDir(outputDir);

  clearOutputDir(outputDir);

  const payloads = sortInputFiles(readInputDir(inputDir)).map(file =>
    readInputFile(file, inputDir)
  );
  const removedPaths = new Map();
  const output = markDeprecatedTokens(
    previousOutput,
    generateFromPayloads(payloads, {ignoreDarkMode, colorFormat, removedPaths}),
    {ignoreDarkMode, removedPaths}
  );

  writeOutputFiles(output, outputDir);

  return {
    outputDir,
    files: listOutputFiles(outputDir),
  };
}
