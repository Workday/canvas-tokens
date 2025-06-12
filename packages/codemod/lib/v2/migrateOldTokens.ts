import {Identifier, MemberExpression, Transform} from 'jscodeshift';
import {addMissingImports} from '../utils/addMissingImports';
import {mapping, typeProps} from './mapping';

type DeclarationType = {[key: string]: any};

const varToMemberExpression = (j: any, value: string) => {
  const valuesKeys = value.split('.');
  return valuesKeys.reduce((acc: any, key: string, index: number) => {
    if (index === 0) {
      return j.identifier(key);
    }
    return j.memberExpression(acc, j.identifier(key));
  }, null);
};

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const importDeclaration: DeclarationType = {};
  const checkImport = (value: any) => Object.keys(importDeclaration).includes(value);

  root
    .find(j.ImportDeclaration, {
      source: {value: (value: string) => value.includes('@workday/canvas-kit-react/tokens')},
    })
    .forEach(nodePath => {
      addMissingImports(
        {j, root, nodePath},
        {
          importPath: '@workday/canvas-kit-styling',
          specifiers: ['cssVar'],
        }
      );

      nodePath.value.specifiers = nodePath.value.specifiers?.filter(specifier => {
        if (specifier.type === 'ImportSpecifier' && specifier.local) {
          const localName = specifier.local.name.toString();
          const importedName = specifier.imported.name.toString();
          const type = mapping[importedName as keyof typeof mapping].type;

          importDeclaration[localName] = importedName;

          addMissingImports(
            {j, root, nodePath},
            {
              importPath: '@workday/canvas-tokens-web',
              specifiers: [type],
            }
          );

          return false;
        }
        return true;
      });

      if (!nodePath.value.specifiers?.length) {
        nodePath.prune();
      }
    });

  root
    .find(j.SpreadElement, {
      argument: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'MemberExpression',
            object: {
              name: 'type',
            },
            property: {
              name: 'levels',
            },
          },
        },
      },
    })
    .replaceWith(nodePath => {
      const argument = nodePath.value.argument as MemberExpression;
      const object = argument.object as MemberExpression;
      const level = (object.property as Identifier).name;
      const size = (argument.property as Identifier).name;

      nodePath.insertAfter(
        j.objectProperty(
          j.identifier('color'),
          j.callExpression(j.identifier('cssVar'), [
            j.memberExpression(
              j.memberExpression(
                j.memberExpression(j.identifier('system'), j.identifier('color')),
                j.identifier('fg')
              ),
              j.identifier(['heading', 'title'].includes(level) ? 'strong' : 'default')
            ),
          ])
        )
      );

      return [
        j.spreadElement(
          j.memberExpression(
            j.memberExpression(
              j.memberExpression(j.identifier('system'), j.identifier('type')),
              j.identifier(level)
            ),
            j.identifier(size)
          )
        ),
      ];
    });

  root
    .find(j.SpreadElement, {
      argument: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'depth',
        },
        property: {
          type: 'NumericLiteral',
        },
      },
    })
    .replaceWith(nodePath => {
      const argument = nodePath.value.argument;
      if (argument.type === 'MemberExpression' && argument.property.type === 'NumericLiteral') {
        const depthValue = argument.property.value;

        return depthValue > 0
          ? j.objectProperty(
              j.identifier('boxShadow'),
              j.callExpression(j.identifier('cssVar'), [
                j.memberExpression(
                  j.memberExpression(j.identifier('system'), j.identifier('depth')),
                  j.numericLiteral(depthValue),
                  true
                ),
              ])
            )
          : j.objectProperty(j.identifier('boxShadow'), j.literal('none'));
      }
    });

  root
    .find(j.MemberExpression, (value: any) => {
      return (
        value.type === 'MemberExpression' &&
        typeProps.includes(value.property.name) &&
        value.object.type === 'MemberExpression' &&
        value.object.object.type === 'MemberExpression' &&
        value.object.object.object.type === 'MemberExpression' &&
        value.object.object.object.object.type === 'Identifier' &&
        checkImport(value.object.object.object.object.name)
      );
    })
    .replaceWith(nodePath => {
      const mainWrapper = nodePath.value.object;
      const property = nodePath.value.property;

      if (
        mainWrapper.type === 'MemberExpression' &&
        mainWrapper.object.type === 'MemberExpression' &&
        mainWrapper.object.object.type === 'MemberExpression' &&
        mainWrapper.object.object.object.type === 'Identifier' &&
        checkImport(mainWrapper.object.object.object.name)
      ) {
        const level = (mainWrapper.object.property as Identifier).name;
        const size = (mainWrapper.property as Identifier).name;
        const prop = (property as Identifier).name;

        const {values} = mapping.type.keys.levels;
        const levels = values[level as keyof typeof values];
        const tokens = levels[size as keyof typeof levels];
        const value = tokens[prop as keyof typeof tokens];

        if (value) {
          return j.callExpression(j.identifier('cssVar'), [varToMemberExpression(j, value)]);
        }
      }

      return nodePath;
    });

  root
    .find(j.MemberExpression, (value: any) => {
      return (
        value.type === 'MemberExpression' &&
        value.property.name === 'boxShadow' &&
        checkImport(value.object.object.name)
      );
    })
    .replaceWith(nodePath => {
      if (
        nodePath.value.object.type === 'MemberExpression' &&
        nodePath.value.object.object.type === 'Identifier' &&
        nodePath.value.object.property.type === 'NumericLiteral'
      ) {
        const value = nodePath.value.object.property.value;

        return value.toString() === '0'
          ? j.literal('none')
          : j.callExpression(j.identifier('cssVar'), [
              j.memberExpression(
                j.memberExpression(j.identifier('system'), j.identifier('depth')),
                j.numericLiteral(value),
                true
              ),
            ]);
      }
    });

  root
    .find(j.MemberExpression, (value: any) => {
      return (
        value.type === 'MemberExpression' &&
        ((value.object.type === 'MemberExpression' &&
          value.object.object.type === 'MemberExpression' &&
          checkImport(value.object.object.object.name)) ||
          checkImport(value.object.name))
      );
    })
    .replaceWith(nodePath => {
      const mainWrapper = nodePath.value.object;

      if (
        mainWrapper.type === 'MemberExpression' &&
        mainWrapper.object.type === 'MemberExpression'
      ) {
        const mainProperty = mainWrapper.object.property;
        const innerProperty = mainWrapper.property;
        const lowestProperty = nodePath.value.property;

        if (
          mainProperty.type === 'Identifier' &&
          innerProperty.type === 'Identifier' &&
          (lowestProperty.type === 'Identifier' || lowestProperty.type === 'NumericLiteral')
        ) {
          const lowestPropertyValue =
            lowestProperty.type === 'Identifier' ? lowestProperty.name : lowestProperty.value;

          const innerKey = innerProperty.name as keyof typeof mapping.type.keys;

          if (mainProperty.name === 'properties') {
            const {name, values} = mapping.type.keys[innerKey];

            const newValue: string = values[lowestPropertyValue as keyof typeof values];

            if (newValue.includes('.')) {
              const [first, second] = newValue.split('.');
              return j.callExpression(j.identifier('cssVar'), [
                j.memberExpression(
                  j.memberExpression(
                    j.memberExpression(j.identifier('system'), j.identifier(name)),
                    j.identifier(first)
                  ),
                  j.identifier(second)
                ),
              ]);
            } else {
              return j.callExpression(j.identifier('cssVar'), [
                j.memberExpression(
                  j.memberExpression(j.identifier('system'), j.identifier(name)),
                  j.identifier(newValue)
                ),
              ]);
            }
          } else if (mainProperty.name === 'levels') {
            const {values} = mapping.type.keys.levels;
            const levels = values[innerKey as keyof typeof values];

            const lowestKey = lowestPropertyValue as keyof typeof levels;
            const tokens = levels[lowestKey];

            const props = Object.entries(tokens).map(([key, value]) => {
              return j.property(
                'init',
                j.identifier(key),
                j.callExpression(j.identifier('cssVar'), [varToMemberExpression(j, value)])
              );
            });

            return j.objectExpression(props);
          }
        }
      } else if (
        mainWrapper.type === 'Identifier' &&
        importDeclaration[mainWrapper.name] !== 'type'
      ) {
        const mainObject = mainWrapper;
        const mainName = mainObject.name;
        const lowestProperty = nodePath.value.property;

        const importedName = importDeclaration[mainName];
        const map = mapping[importedName as keyof typeof mapping];
        if (importedName === 'depth' && lowestProperty.type === 'NumericLiteral') {
          const isZero = lowestProperty.value.toString() === '0';

          return j.objectExpression([
            j.property(
              'init',
              j.identifier('boxShadow'),
              isZero
                ? j.literal('none')
                : j.callExpression(j.identifier('cssVar'), [
                    j.memberExpression(
                      j.memberExpression(j.identifier('system'), j.identifier('depth')),
                      j.numericLiteral(lowestProperty.value),
                      true
                    ),
                  ])
            ),
          ]);
        } else {
          if (map.type === 'system' && lowestProperty.type === 'Identifier') {
            return j.callExpression(j.identifier('cssVar'), [
              j.memberExpression(
                j.memberExpression(j.identifier(map.type), j.identifier(map.name)),
                j.identifier(map.keys[lowestProperty.name as keyof typeof map.keys])
              ),
            ]);
          } else if (map.type === 'base' && lowestProperty.type === 'Identifier') {
            return j.callExpression(j.identifier('cssVar'), [
              j.memberExpression(j.identifier(map.type), j.identifier(lowestProperty.name)),
            ]);
          }
        }
      }

      return nodePath;
    });

  return root.toSource();
};

export default transform;
