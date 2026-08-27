import {createContext} from './context.js';
import {buildBrandThemeExtensions, buildModeExtensions, mergeExtensions} from './extensions.js';
import {figmaTypeToDtcg} from './format.js';
import {
  findLightMode,
  flattenFontPath,
  flattenThemeTypePath,
  getThemeCategory,
  getThemePathSegments,
  isPxToken,
  toSlug,
  toTokenPath,
} from './naming.js';
import {addTokenToFiles, buildToken, nestDashedVariants} from './tokens.js';

const SKIP_THEME_CATEGORIES = new Set(['slot']);
const SKIP_FOCUS_TOKENS = new Set(['inverse', 'contrast', 'inner', 'outer']);

function registerRoute(context, variable, outputKey, file, path) {
  context.registerOutputPath(variable.id, outputKey);
  return {file, path};
}

function getLibraryPrefix(payload) {
  const name = payload.library?.name || '';
  return /token/i.test(name) ? 'system' : 'base';
}

function routeBrandVariable(variable, _libraryPrefix, context) {
  const segments = toTokenPath(variable.name).slice(1);
  const [first, second, ...rest] = segments;

  return first === 'dark'
    ? registerRoute(context, variable, ['brand', ...segments].join('.'), `brand/dark/${second}.json`, rest)
    : registerRoute(
        context,
        variable,
        ['brand', ...segments].join('.'),
        `brand/${first}.json`,
        [second, ...rest].filter(Boolean)
      );
}

function routeColorsVariable(variable, _libraryPrefix, context) {
  const tokenPath = toTokenPath(variable.name);
  return registerRoute(context, variable, tokenPath.join('.'), 'base/palette.json', tokenPath);
}

function routeMotionVariable(variable, libraryPrefix, context) {
  const segments = toTokenPath(variable.name);
  return registerRoute(
    context,
    variable,
    ['motion', ...segments].join('.'),
    `${libraryPrefix}/motion.json`,
    segments
  );
}

function routeOpacityVariable(variable, libraryPrefix, context) {
  const tokenPath = toTokenPath(variable.name).slice(1);
  return registerRoute(
    context,
    variable,
    ['opacity', ...tokenPath].join('.'),
    `${libraryPrefix}/opacity.json`,
    tokenPath
  );
}

function routeShadowVariable(variable, _libraryPrefix, context) {
  const tokenPath = toTokenPath(variable.name).slice(1);
  return registerRoute(
    context,
    variable,
    ['shadow', ...tokenPath].join('.'),
    'base/shadow.json',
    tokenPath
  );
}

function routeTypeVariable(variable, _libraryPrefix, context) {
  const tokenPath = flattenFontPath(variable.name);
  return registerRoute(
    context,
    variable,
    ['type', ...tokenPath].join('.'),
    'base/type.json',
    tokenPath
  );
}

function routeCanvasVariable(variable) {
  return {file: 'base/base.json', path: toTokenPath(variable.name).slice(1)};
}

function routeSizeVariable(name) {
  if (!isPxToken(name)) {
    const path = toTokenPath(name).slice(1);

    if (name.startsWith('size/icon/')) {
      return {file: 'component/system-icon.json', path: ['size', ...toTokenPath(name).slice(2)]};
    }

    const routes = [
      {prefix: 'padding/', file: 'system/padding.json'},
      {prefix: 'gap/', file: 'system/gap.json'},
      {prefix: 'shape/', file: 'system/shape.json'},
      {prefix: 'size/', file: 'system/size.json'},
    ];

    const match = routes.find(route => name.startsWith(route.prefix));
    if (match) {
      return {file: match.file, path};
    }
  }

  return null;
}

function routeBaseSizeVariable(variable, context) {
  const shouldInclude =
    variable.name.startsWith('size/') &&
    !variable.name.startsWith('size/icon/') &&
    !isPxToken(variable.name);

  if (shouldInclude) {
    const tokenPath = toTokenPath(variable.name).slice(1);
    return registerRoute(
      context,
      variable,
      ['size', ...tokenPath].join('.'),
      'base/size.json',
      tokenPath
    );
  }

  return null;
}

function routeSizeCollectionVariable(variable, libraryPrefix, context) {
  if (variable.name.startsWith('base/')) {
    return {file: 'base/base.json', path: toTokenPath(variable.name).slice(1)};
  }

  if (libraryPrefix === 'system') {
    return routeSizeVariable(variable.name);
  }

  return routeBaseSizeVariable(variable, context);
}

function routeThemeVariable(variable, _libraryPrefix, _context, category) {
  if (category === 'type') {
    return {file: 'system/type.json', path: flattenThemeTypePath(variable.name)};
  }

  const path = getThemePathSegments(variable);

  if (category === 'focus') {
    return SKIP_FOCUS_TOKENS.has(path[0]) ? null : {file: 'brand/focus.json', path};
  }

  return {
    file: `system/color/${category}.json`,
    path,
  };
}

function routeBreakpointVariable(variable) {
  return {file: 'system/breakpoint.json', path: toTokenPath(variable.name).slice(1)};
}

const COLLECTION_ROUTES = {
  Colors: routeColorsVariable,
  Brand: routeBrandVariable,
  Motion: routeMotionVariable,
  Opacity: routeOpacityVariable,
  Shadow: routeShadowVariable,
  Type: routeTypeVariable,
  Canvas: routeCanvasVariable,
  Size: routeSizeCollectionVariable,
  Theme: routeThemeVariable,
  Breakpoint: routeBreakpointVariable,
};

function getActiveCollections(payload) {
  return Object.entries(payload.meta.variableCollections)
    .map(([id, collection]) => ({id, ...collection}))
    .filter(
      collection =>
        !collection.remote && Object.hasOwn(COLLECTION_ROUTES, collection.name)
    );
}

function findThemeCollection(collections) {
  return collections.find(collection => collection.name === 'Theme' && !collection.isExtension);
}

function findBrandExtension(collections) {
  return collections.find(
    collection => collection.isExtension && toSlug(collection.name) === 'brand'
  );
}

function shouldSkipThemeVariable(collection, themeCollection, variable) {
  if (collection.id !== themeCollection?.id) {
    return false;
  }

  return SKIP_THEME_CATEGORIES.has(getThemeCategory(variable));
}

function buildVariableToken({
  variable,
  context,
  collection,
  lightModeId,
  themeCollection,
  brandExtension,
}) {
  const defaultRaw = context.getModeValue(variable, lightModeId);
  if (defaultRaw === undefined) {
    return null;
  }

  const isTheme = collection.id === themeCollection?.id;
  const brandThemes =
    isTheme && brandExtension
      ? buildBrandThemeExtensions(variable, brandExtension, context)
      : undefined;
  const resolveOptions =
    brandThemes && getThemeCategory(variable) !== 'focus' ? {useInnerValue: true} : undefined;
  const defaultValue = context.resolveValue(defaultRaw, variable, lightModeId, resolveOptions);
  let type = figmaTypeToDtcg(variable.resolvedType, defaultValue);

  if (
    variable.name.startsWith('size/icon/') &&
    typeof defaultValue === 'string' &&
    defaultValue.startsWith('{size.')
  ) {
    type = 'dimension';
  }

  const extensions = mergeExtensions(
    isTheme ? buildModeExtensions(variable, collection, context, resolveOptions) : undefined,
    brandThemes
  );

  return buildToken({
    value: defaultValue,
    type,
    description: variable.description || undefined,
    extensions,
  });
}

export function generateVariableTokens(payload, sharedContext) {
  const context = sharedContext ?? createContext(payload);
  const libraryPrefix = getLibraryPrefix(payload);
  const files = new Map();
  const collections = getActiveCollections(payload);
  const themeCollection = findThemeCollection(collections);
  const brandExtension = findBrandExtension(collections);

  collections
    .filter(collection => !collection.isExtension)
    .forEach(collection => {
      const lightModeId = (findLightMode(collection) || collection.modes?.[0])?.modeId;

      Object.values(payload.meta.variables)
        .filter(variable => !variable.remote && variable.variableCollectionId === collection.id)
        .forEach(variable => {
        if (shouldSkipThemeVariable(collection, themeCollection, variable)) {
          return;
        }

        const token = buildVariableToken({
          variable,
          context,
          collection,
          lightModeId,
          themeCollection,
          brandExtension,
        });

        if (token) {
          const destination = COLLECTION_ROUTES[collection.name]?.(
            variable,
            libraryPrefix,
            context,
            collection.id === themeCollection?.id ? getThemeCategory(variable) : undefined
          );

          if (destination) {
            addTokenToFiles(files, destination.file, destination.path, token);
          }
        }
      });
    });

  for (const content of files.values()) {
    nestDashedVariants(content);
  }

  return files;
}
