import {fileHeader} from 'style-dictionary/utils';
import {camelCase} from 'case-anything';
import type {FormatFn} from 'style-dictionary/types';

type Node = {[key: string]: Node | string};

/**
 * Imports the token array of each file and exports them as one object nested by the file path,
 * e.g. `base/palette.js` is `base.palette` and `system/color/bg.js` is `system.color.bg`
 */
export const generateDocsIndex: FormatFn = async ({file, options}) => {
  const imports: string[] = options.imports;
  const header = await fileHeader({file});
  const tree: Node = {};

  const importBlock = imports
    .map(i => {
      const parts = i.replace('.js', '').split('/');
      const name = camelCase(parts.join('-'));
      let node = tree;
      parts.slice(0, -1).forEach(part => {
        node = (node[camelCase(part)] ??= {}) as Node;
      });
      node[camelCase(parts[parts.length - 1])] = name;
      return `import ${name} from "./${i}";\n`;
    })
    .join('');

  const print = (node: Node, indent: string): string =>
    Object.entries(node)
      .map(([key, value]) =>
        typeof value === 'string'
          ? `${indent}${key}: ${value},\n`
          : `${indent}${key}: {\n${print(value, indent + '  ')}${indent}},\n`
      )
      .join('');

  return `${header}${importBlock}\nexport default {\n${print(tree, '  ')}};\n`;
};
