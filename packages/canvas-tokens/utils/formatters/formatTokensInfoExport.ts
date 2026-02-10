import {Dictionary, Formatter} from 'style-dictionary';
import {json2csv} from 'json-2-csv';

const getTokensInfo = (tokens: Dictionary['allTokens']) => {
  return tokens.map(prop => ({
    name: prop.path.join('.'),
    level: prop.path[0],
    value: prop.original.value,
    computedValue: prop.value,
    fallback: prop.original.fallback,
    feedbackValue: prop.fallback,
    deprecatedComment: prop.original.deprecatedComment,
  }));
};

/**
 * Formatter creating the json file structure with tokens info
 * @param {FormatterArguments} - Style Dictionary formatter object containing `dictionary` property.
 * @returns file content as a string
 */
export const formatTokensInfoExport: Formatter = ({dictionary}) => {
  const tokens = getTokensInfo(dictionary.allTokens);
  return JSON.stringify(tokens, null, 2);
};

/**
 * Formatter creating the csv file structure with tokens info
 * @param {FormatterArguments} - Style Dictionary formatter object containing `dictionary` property.
 * @returns file content as a string
 */
export const formatTokensInfoExportCSV: Formatter = ({dictionary}) => {
  const tokens = getTokensInfo(dictionary.allTokens);
  return json2csv(tokens, {emptyFieldValue: ''});
};
