import {Transform} from 'jscodeshift';

const transform: Transform = (file, api, options) => {
  const fixes = [];
  return fixes.reduce(
    // @ts-expect-error - fix is not a function
    (source, fix) => fix({...file, source}, api, options) as string,
    file.source
  );
};

export default transform;
