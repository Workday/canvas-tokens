import {flattenFontPath, flattenThemeTypePath, toTokenPath} from './naming.js';
import {formatEasingValue, formatNumericValue, rgbaToOklchColor} from './format.js';

const PALETTE_TO_BRAND = {
  green: 'positive',
  red: 'critical',
  amber: 'caution',
  blue: 'primary',
};

const SEMANTIC_BRAND_GROUPS = ['neutral', 'primary', 'positive', 'caution', 'critical'];

const PALETTE_REFERENCE_ALIASES = {
  white: 'neutral.0',
  black: 'neutral.1000',
};

function normalizePaletteReference(reference) {
  if (typeof reference !== 'string') {
    return reference;
  }

  const match = reference.match(/^\{([^.}]+)\}$/);
  if (!match) {
    return reference;
  }

  const remapped = PALETTE_REFERENCE_ALIASES[match[1]];
  return remapped ? `{${remapped}}` : reference;
}

const toVariableMap = (variables, key) =>
  Object.values(variables).map(variable => [variable[key], variable]);

function mergeIntoMap(target, source) {
  for (const [key, value] of source) {
    target.set(key, value);
  }
}

function createState(payload) {
  const collections = payload.meta.variableCollections;
  const variables = payload.meta.variables;

  return {
    collections,
    variables,
    variablesById: new Map(Object.entries(variables)),
    variablesByKey: new Map(toVariableMap(variables, 'key')),
    variablesByName: new Map(toVariableMap(variables, 'name')),
    collectionById: new Map(Object.entries(collections)),
    output: new Map(),
  };
}

function extendState(state, payload) {
  const next = createState(payload);

  mergeIntoMap(state.variablesById, next.variablesById);
  mergeIntoMap(state.variablesByKey, next.variablesByKey);
  mergeIntoMap(state.variablesByName, next.variablesByName);
  mergeIntoMap(state.collectionById, next.collectionById);
  Object.assign(state.variables, next.variables);
  Object.assign(state.collections, next.collections);
}

function resolveVariableId(state, id) {
  return (
    state.variablesById.get(id) ||
    state.variablesByKey.get(String(id).split('/')[0].replace('VariableID:', ''))
  );
}

function getCollection(state, variable) {
  return state.collectionById.get(variable.variableCollectionId);
}

function getModeValue(state, variable, modeId) {
  const {valuesByMode} = variable;
  const collection = getCollection(state, variable);
  const fallbackModeId = collection?.defaultModeId || collection?.modes?.[0]?.modeId;
  const resolvedModeId = [modeId, fallbackModeId].find(
    id => id && valuesByMode?.[id] !== undefined
  );

  return valuesByMode?.[resolvedModeId] ?? Object.values(valuesByMode ?? {})[0];
}

function resolveAlias(state, id, modeId, seen = new Set()) {
  const isResolvable = Boolean(id && !seen.has(id));

  if (isResolvable) {
    seen.add(id);
    const variable = resolveVariableId(state, id);

    if (variable) {
      const value = getModeValue(state, variable, modeId);
      return value?.type === 'VARIABLE_ALIAS'
        ? resolveAlias(state, value.id, modeId, seen)
        : {variable, value};
    }
  }
}

function getBrandVariablePaths(name) {
  const [first, second, third] = name.split('/');
  const paths = [`brand/${name}`];

  if (name.startsWith('dark/') && PALETTE_TO_BRAND[second] && third) {
    paths.push(`brand/dark/${PALETTE_TO_BRAND[second]}/${third}`);
  }

  if (SEMANTIC_BRAND_GROUPS.includes(first) && second) {
    paths.push(`brand/${first}/${second}`);
  }

  if (PALETTE_TO_BRAND[first] && second) {
    paths.push(`brand/${PALETTE_TO_BRAND[first]}/${second}`);
  }

  return paths;
}

function findBrandVariable(state, variable, {allowAliasLookup = false} = {}) {
  const {name} = variable;
  const lookup = path => state.variablesByName.get(path);
  const directMatch = getBrandVariablePaths(name).map(lookup).find(Boolean);

  if (directMatch) {
    return directMatch;
  }

  return (
    allowAliasLookup &&
    [...state.variablesById.values()]
      .filter(candidate => candidate.name.startsWith('brand/'))
      .find(candidate => {
        const aliasValue = Object.values(candidate.valuesByMode)[0];
        const resolved =
          aliasValue?.type === 'VARIABLE_ALIAS' && resolveAlias(state, aliasValue.id);

        return resolved?.variable?.key === variable.key || resolved?.variable?.id === variable.id;
      })
  );
}

function formatReferencePath(pathSegments, sourceCollectionName) {
  const joined = pathSegments.join('.');

  if (sourceCollectionName === 'Colors') {
    return `{${joined}}`;
  }

  if (sourceCollectionName === 'Brand') {
    return `{brand.${joined.replace(/^brand\./, '')}}`;
  }

  if (joined.startsWith('brand.')) {
    return `{${joined}}`;
  }

  if (joined.startsWith('dark.')) {
    const paletteMatch = joined.match(/^dark\.([^.]+)\.(.+)$/);
    return paletteMatch ? `{dark.${paletteMatch[1]}.${paletteMatch[2]}}` : `{brand.${joined}}`;
  }

  return `{${joined}}`;
}

function formatCollectionReference(state, collectionName, pathSegments, variable, options = {}) {
  const joined = pathSegments.join('.');
  const first = pathSegments[0];
  const sliced = pathSegments.slice(1).join('.');

  if (collectionName === 'Brand') {
    return `{brand.${sliced}}`;
  }

  if (collectionName === 'Colors') {
    if (first === 'dark') {
      return options.remapToBrand && state.variablesByName.get(`brand/${variable.name}`)
        ? `{brand.${joined}}`
        : `{dark.${sliced}}`;
    }

    return `{${joined}}`;
  }

  if (collectionName === 'Theme') {
    return `{${pathSegments.filter(Boolean).join('.')}}`;
  }

  if (collectionName === 'Size') {
    return `{${first === 'size' ? joined : `size.${joined}`}}`;
  }

  if (collectionName === 'Type') {
    return `{${flattenFontPath(variable.name).join('.')}}`;
  }

  return undefined;
}

function resolveImmediateAlias(state, id) {
  const variable = resolveVariableId(state, id);
  return variable && {variable};
}

function valueToReference(state, resolved, options = {}) {
  if (!resolved?.variable) {
    return;
  }

  const brandVariable = options.remapToBrand
    ? findBrandVariable(state, resolved.variable, options)
    : undefined;
  const variable = brandVariable || resolved.variable;
  const collectionName = getCollection(state, variable)?.name;
  const pathSegments = toTokenPath(variable.name);
  const formatted = formatCollectionReference(
    state,
    collectionName,
    pathSegments,
    variable,
    options
  );

  if (formatted) {
    return normalizePaletteReference(formatted);
  }

  const mapped = state.output.get(variable.id);
  return normalizePaletteReference(
    mapped ? `{${mapped}}` : formatReferencePath(pathSegments, collectionName)
  );
}

function resolveValue(state, rawValue, variable, modeId, options = {}) {
  if (rawValue?.type === 'VARIABLE_ALIAS') {
    const isBrandSource = getCollection(state, variable)?.name === 'Brand';

    return valueToReference(
      state,
      isBrandSource
        ? resolveImmediateAlias(state, rawValue.id)
        : resolveAlias(state, rawValue.id, modeId),
      {
        ...options,
        remapToBrand: !isBrandSource || Boolean(options.allowAliasLookup),
      }
    );
  }

  if (variable.resolvedType === 'COLOR' && rawValue?.r !== undefined) {
    return rgbaToOklchColor(rawValue);
  }

  if (variable.resolvedType === 'EASING') {
    return formatEasingValue(rawValue);
  }

  return formatNumericValue(rawValue, variable);
}

function formatThemeTypeReference(variable) {
  const path = flattenThemeTypePath(variable.name);
  const referencePath =
    path[0] === 'font-family' && path[path.length - 1] === 'default'
      ? 'font-family.$root'
      : path.join('.');

  return `{${referencePath}}`;
}

function resolveBoundVariable(state, aliasId, modeId) {
  const resolved = resolveAlias(state, aliasId, modeId);
  if (!resolved?.variable) {
    return undefined;
  }

  return valueToReference(state, resolved, {});
}

function resolveStyleBoundVariable(state, aliasId) {
  const resolved = resolveImmediateAlias(state, aliasId);
  if (!resolved?.variable) {
    return undefined;
  }

  const {variable} = resolved;
  const collectionName = getCollection(state, variable)?.name;

  if (collectionName === 'Theme' && variable.name.startsWith('type/')) {
    return formatThemeTypeReference(variable);
  }

  return valueToReference(state, resolved, {});
}

export function createContext(payload) {
  const state = createState(payload);

  return {
    extend(nextPayload) {
      extendState(state, nextPayload);
    },
    getModeValue: (variable, modeId) => getModeValue(state, variable, modeId),
    resolveValue: (rawValue, variable, modeId, options) =>
      resolveValue(state, rawValue, variable, modeId, options),
    resolveBoundVariable: (aliasId, modeId) => resolveBoundVariable(state, aliasId, modeId),
    resolveStyleBoundVariable: aliasId => resolveStyleBoundVariable(state, aliasId),
    registerOutputPath: (variableId, path) => state.output.set(variableId, path),
  };
}
