import {ImportSpecifier} from 'jscodeshift';

export const addMissingImports = (
  {j, root, nodePath}: any,
  {importPath, specifiers, localName}: any
) => {
  const stylingImport = root
    .find(j.ImportDeclaration, {
      source: {
        value: (value: string) => value.includes(importPath),
      },
    })
    .nodes()[0];

  if (!stylingImport) {
    nodePath.insertBefore(
      j.importDeclaration(
        specifiers.map((specifier: string) =>
          j.importSpecifier(j.identifier(specifier), j.identifier(localName || specifier))
        ),
        j.stringLiteral(importPath)
      )
    );
  } else {
    specifiers.forEach((specifier: string) => {
      if (
        !stylingImport.specifiers?.some(
          (existingSpecifier: ImportSpecifier) =>
            existingSpecifier.type === 'ImportSpecifier' &&
            existingSpecifier.imported.name === specifier
        )
      ) {
        const newSpecifier = j.importSpecifier(j.identifier(specifier));
        stylingImport.specifiers.push(newSpecifier);
      }
    });
  }
};
