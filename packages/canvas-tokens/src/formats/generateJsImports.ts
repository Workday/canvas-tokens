import {FormatFnArguments} from 'style-dictionary/types';
import {fileHeader} from 'style-dictionary/utils';

import {SyntaxStyle} from '../../utils';

/** A token file and the names it exports */
type GroupSource = {file: string; names: string[]};

/** Export names mapped to the token files that each define a part of that export */
type Groups = Record<string, GroupSource[]>;

type BaseOptions = {syntaxStyle?: SyntaxStyle};

// Style Dictionary types `options` loosely, so the required options are enforced
// where the files are defined (see `IndexFile` in files.ts)
export type LevelIndexOptions = BaseOptions & {levels: string[]};

export type TokenIndexOptions = BaseOptions & {
  files: string[];
  /**
   * Files exported as one object per group instead of being re-exported directly.
   * Names defined in several files of a group (`color.brand`) are merged
   */
  groups?: Groups;
  /** Export the names of the groups directly instead of wrapping them in an object named after the group */
  flatten?: boolean;
};

/** Generate the index that exports each token level as a namespace */
export const generateJsLevelIndex = async ({file, options}: FormatFnArguments) => {
  const {levels, syntaxStyle} = options as LevelIndexOptions;
  const header = await fileHeader({file});

  return (
    header +
    (syntaxStyle === 'commonjs'
      ? generateCommonJsLevelImports(levels)
      : generateEsModuleLevelImports(levels))
  );
};

/** Generate the index that re-exports the token files of one level */
export const generateJsTokenIndex = async ({file, options}: FormatFnArguments) => {
  const {files, groups = {}, flatten, syntaxStyle} = options as TokenIndexOptions;
  const header = await fileHeader({file});
  const generate =
    syntaxStyle === 'commonjs' ? generateCommonJsTokenImports : generateEsModuleTokenImports;

  return header + generate(files, groups, syntaxStyle === 'ts', flatten);
};

/** Generate Common JS imports for the provided token levels */
const generateCommonJsLevelImports = (levels: string[]) => {
  const imports = levels
    .map((level: string) => `const ${level} = require('./${level}/index.js');`)
    .join('\n');
  return imports + `\nmodule.exports = {${levels.join(', ')}}\n`;
};

/** Generate ES module imports for the provided token levels */
const generateEsModuleLevelImports = (levels: string[]) => {
  const imports = levels
    .map((level: string) => `import * as ${level} from './${level}/index.js';`)
    .join('\n');
  return imports + `\nexport {${levels.join(', ')}}\n`;
};

// Token files come as `level/name.json`; the index sits inside `level/`
const toJsPath = (file: string) =>
  `./${file.split('/').slice(1).join('/').replace('.json', '.js')}`;

/** Get the files of all groups */
const getGroupedFiles = (groups: Groups) =>
  Object.values(groups).flatMap(sources => sources.map(({file}) => file));

/** Collect the names of a group with the indexes of the sources that define them */
const getGroupProps = (sources: GroupSource[]) => {
  const props = new Map<string, number[]>();
  sources.forEach(({names}, index) =>
    names.forEach(name => props.set(name, [...(props.get(name) ?? []), index]))
  );

  return [...props];
};

/** Reference a name defined in several files as one object, spreading all of its definitions */
const mergeRefs = (refs: string[]) =>
  refs.length > 1 ? `{${refs.map(ref => `...${ref}`).join(', ')}}` : refs[0];

/**
 * Generate ES module re-exports for token files based on their paths.
 * Grouped files are imported as namespaces and exported as one object (or type, for declarations)
 * as `export *` drops names exported by several files
 */
const generateEsModuleTokenImports = (
  files: string[],
  groups: Groups,
  isDeclaration: boolean,
  flatten = false
) => {
  const grouped = getGroupedFiles(groups);
  const reExports = files
    .filter(file => !grouped.includes(file))
    .map(file => `export * from '${toJsPath(file)}';`);

  const groupExports = Object.entries(groups).flatMap(([group, sources]) => {
    const imports = sources.map(
      ({file}, i) => `import * as ${group}${i} from '${toJsPath(file)}';`
    );
    const props = getGroupProps(sources).map(([name, indexes]) => {
      const refs = indexes.map(index => `${group}${index}.${name}`);
      if (isDeclaration) return `  ${name}: ${refs.map(ref => `typeof ${ref}`).join(' & ')};`;

      return `  ${name}: ${mergeRefs(refs)},`;
    });
    if (flatten) {
      const exports = getGroupProps(sources).map(([name, indexes]) => {
        const refs = indexes.map(index => `${group}${index}.${name}`);
        if (isDeclaration) {
          return `export declare const ${name}: ${refs.map(ref => `typeof ${ref}`).join(' & ')};`;
        }

        return `export const ${name} = ${mergeRefs(refs)};`;
      });

      return [...imports, ...exports];
    }

    const declaration = isDeclaration
      ? `export declare const ${group}: {`
      : `export const ${group} = {`;

    return [...imports, `${declaration}\n${props.join('\n')}\n};`];
  });

  return [...reExports, ...groupExports].join('\n') + '\n';
};

/** Generate CommonJS re-exports for token files, merging names exported by several files */
const generateCommonJsTokenImports = (
  files: string[],
  groups: Groups,
  _isDeclaration = false,
  flatten = false
) => {
  const grouped = getGroupedFiles(groups);
  const imports = files
    .filter(file => !grouped.includes(file))
    .map(file => `...require('${toJsPath(file)}'),`);

  const groupExports = Object.entries(groups).map(([group, sources]) => {
    const props = getGroupProps(sources).map(([name, indexes]) => {
      const refs = indexes.map(index => `require('${toJsPath(sources[index].file)}').${name}`);
      return `    ${name}: ${mergeRefs(refs)},`;
    });

    if (flatten) return props.map(prop => prop.trim()).join('\n  ');

    return `${group}: {\n${props.join('\n')}\n  },`;
  });

  return `module.exports = {\n  ${[...imports, ...groupExports].join('\n  ')}\n};\n`;
};
