import {Dictionary, Formatter} from 'style-dictionary';
import {json2csv} from 'json-2-csv';

const getTokensInfo = (tokens: Dictionary['allProperties']) => {
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

export const formatTokensInfoExport: Formatter = ({dictionary}) => {
  const tokens = getTokensInfo(dictionary.allProperties);
  return JSON.stringify(tokens, null, 2);
};

export const formatTokensInfoExportCSV: Formatter = ({dictionary}) => {
  const tokens = getTokensInfo(dictionary.allProperties);

  return json2csv(tokens, {emptyFieldValue: ''});
};
