import {Identifier, MemberExpression, Transform} from 'jscodeshift';
import {addMissingImports, typeProps, varToMemberExpression} from '../utils';
import {mapping, systemColors} from './mapping';

type DeclarationType = {[key: string]: any};

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const importDeclaration: DeclarationType = {};
  const checkImport = (value: any) => Object.keys(importDeclaration).includes(value);

  root
    .find(j.ImportDeclaration, {
      source: {value: (value: string) => /^@workday\/canvas-kit-/.test(value)},
    })
    .forEach(nodePath => {
      nodePath.value.specifiers?.forEach(specifier => {
        if (specifier.type === 'ImportSpecifier' && specifier.local) {
          const localName = specifier.local.name.toString();
          const importedName = specifier.imported.name.toString();

          importDeclaration[localName] = importedName;
        }
      });

      if (nodePath.value.source.value === '@workday/canvas-kit-react/tokens') {
        nodePath.prune();
      }
    });

  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
      },
    })
    .forEach(nodePath => {
      addMissingImports(
        {j, root},
        {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
      );

      const name = (nodePath.value.callee as Identifier).name;
      const stylesDeclaration = nodePath.value.arguments[0];
      const isCanvasKitStyling =
        importDeclaration[name] === 'createStyles' || importDeclaration[name] === 'createStencil';

      if (stylesDeclaration.type === 'ObjectExpression') {
        const transformProperty = (property: any): any => {
          if (
            property.type === 'ObjectProperty' &&
            property.key.type === 'Identifier' &&
            property.value.type === 'MemberExpression' &&
            property.value.object.type === 'Identifier' &&
            property.value.property.type === 'Identifier' &&
            importDeclaration[property.value.object.name] === 'colors'
          ) {
            const key = property.key.name;
            const tokens = Object.entries(systemColors).find(([blockKey]) =>
              blockKey.split(',').some(prop => prop === key)
            )?.[1];

            const {property: value} = property.value;
            const colorToken = tokens
              ? tokens[value.name as keyof typeof tokens]
              : systemColors.static[value.name as keyof typeof systemColors.static];

            if (colorToken) {
              if (!isCanvasKitStyling) {
                addMissingImports(
                  {j, root},
                  {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
                );
              }

              return j.objectProperty(
                j.identifier(key),
                isCanvasKitStyling
                  ? varToMemberExpression(j, colorToken)
                  : j.callExpression(j.identifier('cssVar'), [varToMemberExpression(j, colorToken)])
              );
            }
          }

          if (property.type === 'ObjectProperty' && property.value.type === 'TemplateLiteral') {
            const templateLiteral = property.value;
            const transformedQuasis = templateLiteral.quasis.map((quasi: string) => quasi);
            const transformedExpressions = templateLiteral.expressions.map(
              (expr: MemberExpression) => {
                if (
                  expr.type === 'MemberExpression' &&
                  expr.object.type === 'Identifier' &&
                  expr.property.type === 'Identifier' &&
                  importDeclaration[expr.object.name] === 'colors'
                ) {
                  const tokens = Object.entries(systemColors).find(([blockKey]) =>
                    blockKey.split(',').some(prop => prop === property.key.name)
                  )?.[1];

                  const colorToken = tokens
                    ? tokens[expr.property.name as keyof typeof tokens]
                    : systemColors.static[expr.property.name as keyof typeof systemColors.static];

                  if (colorToken) {
                    addMissingImports(
                      {j, root},
                      {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
                    );

                    return j.callExpression(j.identifier('cssVar'), [
                      varToMemberExpression(j, colorToken),
                    ]);
                  }
                }
                return expr;
              }
            );

            return j.objectProperty(
              property.key,
              j.templateLiteral(transformedQuasis, transformedExpressions)
            );
          }

          if (property.type === 'ObjectProperty' && property.value.type === 'ObjectExpression') {
            return j.objectProperty(
              property.key,
              j.objectExpression(property.value.properties.map(transformProperty))
            );
          }

          return property;
        };

        stylesDeclaration.properties = stylesDeclaration.properties.map(transformProperty);
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

      addMissingImports(
        {j, root},
        {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
      );

      addMissingImports(
        {j, root},
        {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
      );

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

        addMissingImports(
          {j, root},
          {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
        );

        if (depthValue > 0) {
          addMissingImports(
            {j, root},
            {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
          );
        }

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

      addMissingImports(
        {j, root},
        {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
      );

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
          addMissingImports(
            {j, root},
            {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
          );

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

        if (value.toString() !== '0') {
          addMissingImports(
            {j, root},
            {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
          );

          addMissingImports(
            {j, root},
            {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
          );
        }

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
        addMissingImports(
          {j, root},
          {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
        );

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

            addMissingImports(
              {j, root},
              {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
            );

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
              addMissingImports(
                {j, root},
                {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
              );

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

          if (!isZero) {
            addMissingImports(
              {j, root},
              {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
            );

            addMissingImports(
              {j, root},
              {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
            );
          }

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
            addMissingImports(
              {j, root},
              {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
            );

            addMissingImports(
              {j, root},
              {importPath: '@workday/canvas-tokens-web', specifiers: ['system']}
            );

            return j.callExpression(j.identifier('cssVar'), [
              j.memberExpression(
                j.memberExpression(j.identifier(map.type), j.identifier(map.name)),
                j.identifier(map.keys[lowestProperty.name as keyof typeof map.keys])
              ),
            ]);
          } else if (map.type === 'base' && lowestProperty.type === 'Identifier') {
            addMissingImports(
              {j, root},
              {importPath: '@workday/canvas-tokens-web', specifiers: ['base']}
            );

            addMissingImports(
              {j, root},
              {importPath: '@workday/canvas-kit-styling', specifiers: ['cssVar']}
            );

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
