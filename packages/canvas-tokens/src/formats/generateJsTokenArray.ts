import {fileHeader} from 'style-dictionary/utils';
import type {FormatFn} from 'style-dictionary/types';

/**
 * Style Dictionary has no built-in format that outputs the transformed tokens as an array
 * (`javascript/esm` outputs a nested object). This one exports `dictionary.allTokens`
 * as the default export, so each token keeps its `path`, `key`, `filePath`, `$value`, `original`, etc.
 */
export const generateJsTokenArray: FormatFn = async ({dictionary, file}) => {
  const header = await fileHeader({file});

  return `${header}export default ${JSON.stringify(dictionary.allTokens, null, 2)};\n`;
};
