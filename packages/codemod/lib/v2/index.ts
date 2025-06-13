import {Transform} from 'jscodeshift';
import migrateOldTokens from './migrateOldTokens';

const transform: Transform = (file, api, options) => {
  const fixes = [migrateOldTokens];
  return fixes.reduce((source, fix) => fix({...file, source}, api, options) as string, file.source);
};

export default transform;
