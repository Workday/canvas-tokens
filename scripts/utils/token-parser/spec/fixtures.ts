export const lightModeId = 'mode-light';
export const darkModeId = 'mode-dark';
export const colorsCollectionId = 'col-colors';
export const themeCollectionId = 'col-theme';
export const brandCollectionId = 'col-brand';

export function createCollection(
  id: string,
  name: string,
  modes: Array<{modeId: string; name: string}> = [{modeId: lightModeId, name: 'Light'}]
) {
  return {
    id,
    name,
    defaultModeId: modes[0]?.modeId,
    modes,
  };
}

export function createVariable(overrides: Record<string, unknown> = {}) {
  return {
    id: 'var-1',
    key: 'key-1',
    name: 'neutral/100',
    variableCollectionId: colorsCollectionId,
    resolvedType: 'COLOR',
    valuesByMode: {
      [lightModeId]: {r: 1, g: 1, b: 1, a: 1},
    },
    ...overrides,
  };
}

export function createPayload(
  variables: Array<Record<string, unknown>>,
  collections: Record<string, Record<string, unknown>> = {}
) {
  const defaultCollections = {
    [colorsCollectionId]: createCollection(colorsCollectionId, 'Colors'),
    ...collections,
  };

  return {
    library: {name: 'base'},
    meta: {
      variableCollections: defaultCollections,
      variables: Object.fromEntries(variables.map(variable => [variable.id, variable])),
    },
  };
}
