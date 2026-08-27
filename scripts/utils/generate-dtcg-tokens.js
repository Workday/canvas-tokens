#!/usr/bin/env node
import {existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const DEFAULT_INPUT_DIR = 'figma-raw-tokens';
const DEFAULT_OUTPUT_DIR = 'packages/canvas-tokens/dtcg/tokens';
const CANVAS_TOKENS_EXTENSION = 'sana.canvas.tokens';
const DARK_MODE_KEY = 'dark';
const BRAND_THEME_KEY = 'brand';

const DIMENSION_SCOPES = [
  'WIDTH_HEIGHT',
  'GAP',
  'CORNER_RADIUS',
  'FONT_SIZE',
  'LINE_HEIGHT',
  'LETTER_SPACING',
  'PARAGRAPH_SPACING',
  'PARAGRAPH_INDENT',
  'EFFECT_FLOAT',
];

const HYPHENATED_SEGMENT_PAIRS = [
  ['font', 'size'],
  ['font', 'weight'],
  ['font', 'family'],
  ['line', 'height'],
  ['letter', 'spacing'],
];

const SKIP_COLLECTIONS = new Set([
  'Grid',
  'Discord',
  'Spotify',
  'Airbnb',
  'Canvas',
  'Utility',
  'Color',
  'Palette',
]);
const SKIP_THEME_CATEGORIES = new Set(['slot']);
const SKIP_STYLE_TYPES = new Set(['FILL', 'GRID']);
const STYLE_GROUP_SKIP = new Set(['more styles', 'user avatar']);

function toSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toModeKey(name) {
  return toSlug(name);
}

function isDarkMode(mode) {
  return toModeKey(mode.name) === DARK_MODE_KEY;
}

function findDarkMode(collection) {
  return collection.modes?.find(isDarkMode);
}

function findLightMode(collection) {
  return collection.modes?.find(mode => toModeKey(mode.name) === 'light');
}

function toTokenPath(name) {
  const segments = name.split('/').map(segment => segment.replace(/\s+/g, '-'));
  const normalized = [];

  for (let index = 0; index < segments.length; index += 1) {
    const pair = HYPHENATED_SEGMENT_PAIRS.find(
      ([left, right]) => segments[index] === left && segments[index + 1] === right
    );
    if (pair) {
      normalized.push(`${pair[0]}-${pair[1]}`);
      index += 1;
      continue;
    }
    normalized.push(segments[index]);
  }

  return normalized;
}

function resolveInputPaths() {
  const figmaDir = resolve(process.cwd(), DEFAULT_INPUT_DIR);
  if (!existsSync(figmaDir)) {
    throw new Error(`Missing ${DEFAULT_INPUT_DIR} directory.`);
  }

  const discovered = readdirSync(figmaDir)
    .filter(file => file.endsWith('.json'))
    .map(file => resolve(figmaDir, file));

  if (!discovered.length) {
    throw new Error(`No JSON files found in ${DEFAULT_INPUT_DIR}.`);
  }

  return sortLibraryInputPaths(discovered);
}

function sortLibraryInputPaths(paths) {
  return [...paths].sort((left, right) => {
    const leftIsBase = /base/i.test(left);
    const rightIsBase = /base/i.test(right);

    if (leftIsBase !== rightIsBase) {
      return leftIsBase ? -1 : 1;
    }

    return left.localeCompare(right);
  });
}

function mergePayloads(payloads) {
  const merged = {
    libraries: payloads.map(payload => payload.library),
    meta: {
      variableCollections: {},
      variables: {},
    },
    styles: {
      published: [],
      nodes: {},
    },
  };

  for (const payload of payloads) {
    Object.assign(merged.meta.variableCollections, payload.meta.variableCollections || {});
    Object.assign(merged.meta.variables, payload.meta.variables || {});
    merged.styles.published.push(...(payload.styles?.published || []));
    Object.assign(merged.styles.nodes, payload.styles?.nodes || {});
  }

  return merged;
}

function roundNumber(value, decimals = 4) {
  if (!Number.isFinite(value)) {
    return value;
  }

  if (Object.is(value, -0) || value === 0) {
    return 0;
  }

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function roundOpacity(value) {
  return roundNumber(value, 2);
}

function valueWithUnit(value, unit) {
  return {
    value: roundNumber(value),
    unit,
  };
}

function srgbToLinear(channel) {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function linearRgbToOklab(r, g, b) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  return {
    L: 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot,
    a: 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot,
    b: 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot,
  };
}

function oklabToOklch({L, a, b}) {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) {
    h += 360;
  }

  return {
    l: L,
    c,
    h,
  };
}

function rgbaToHex({r, g, b, a = 1}) {
  const channel = value =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');

  const hex = `#${channel(r)}${channel(g)}${channel(b)}`;
  if (a >= 1) {
    return hex;
  }

  return `${hex}${channel(a)}`;
}

function formatOklchComponent(value, index) {
  if (index === 2) {
    return roundNumber(value, 2);
  }

  const rounded = roundNumber(value, 4);
  if (index === 1 && Math.abs(rounded) < 0.0002) {
    return 0.0001;
  }

  if (index === 0) {
    return roundNumber(rounded, 4);
  }

  return rounded;
}

function rgbaToOklchColor(rgba) {
  const linearR = srgbToLinear(rgba.r);
  const linearG = srgbToLinear(rgba.g);
  const linearB = srgbToLinear(rgba.b);
  const oklab = linearRgbToOklab(linearR, linearG, linearB);
  const oklch = oklabToOklch(oklab);

  const color = {
    colorSpace: 'oklch',
    components: [
      formatOklchComponent(oklch.l, 0),
      formatOklchComponent(oklch.c, 1),
      formatOklchComponent(oklch.h, 2),
    ],
    hex: rgbaToHex(rgba),
  };

  if (rgba.a !== undefined && rgba.a < 1) {
    color.alpha = roundOpacity(rgba.a);
  }

  return color;
}

function formatNumericValue(rawValue, variable) {
  if (variable.resolvedType === 'TIMING') {
    return valueWithUnit(Math.round(rawValue * 1000), 'ms');
  }

  const value = isSizeZeroToken(variable.name) ? 0 : rawValue;
  const scopes = variable.scopes || [];

  if (scopes.includes('OPACITY')) {
    return roundOpacity(value / 100);
  }

  if (DIMENSION_SCOPES.some(scope => scopes.includes(scope))) {
    return valueWithUnit(value, 'px');
  }

  return roundNumber(value);
}

function isSizeZeroToken(name) {
  const path = toTokenPath(name);
  return path[0] === 'size' && path[1] === '0' && path.length === 2;
}

function formatEasingValue(value) {
  if (typeof value === 'string') {
    return value;
  }

  const bezier = value?.bezierValues;
  if (!bezier) {
    return value;
  }

  const p1x = roundNumber(bezier.p1x, 2);
  const p1y = roundNumber(bezier.p1y, 2);
  const p2x = roundNumber(bezier.p2x, 2);
  const p2y = roundNumber(bezier.p2y, 2);

  return `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;
}

function figmaTypeToDtcg(resolvedType, value) {
  switch (resolvedType) {
    case 'COLOR':
      return 'color';
    case 'FLOAT':
      return typeof value === 'object' && value?.unit ? 'dimension' : 'number';
    case 'STRING':
      return 'fontFamily';
    case 'TIMING':
      return 'duration';
    case 'EASING':
      return 'cubic-bezier';
    default:
      return undefined;
  }
}

function deepSet(target, path, value) {
  let cursor = target;

  for (let index = 0; index < path.length - 1; index += 1) {
    const key = path[index];
    if (!cursor[key] || cursor[key].$value) {
      cursor[key] = {};
    }
    cursor = cursor[key];
  }

  cursor[path[path.length - 1]] = value;
}

function buildTokenLeaf({value, type, description, extensions}) {
  const token = {$value: value};

  if (type) {
    token.$type = type;
  }

  if (description) {
    token.$description = description;
  }

  if (extensions && Object.keys(extensions).length) {
    token.$extensions = extensions;
  }

  return token;
}

const PALETTE_TO_BRAND = {
  green: 'positive',
  red: 'critical',
  amber: 'caution',
  blue: 'primary',
};

function createContext(payload) {
  const collections = payload.meta.variableCollections;
  const variables = payload.meta.variables;
  const variablesById = new Map(Object.entries(variables));
  const variablesByKey = new Map();

  for (const [, variable] of variablesById) {
    variablesByKey.set(variable.key, variable);
  }

  const collectionById = new Map(Object.entries(collections));

  function resolveVariableId(id) {
    if (variablesById.has(id)) {
      return variablesById.get(id);
    }

    if (String(id).includes('/')) {
      const key = String(id).split('/')[0].replace('VariableID:', '');
      return variablesByKey.get(key);
    }

    return undefined;
  }

  function getCollection(variable) {
    return collectionById.get(variable.variableCollectionId);
  }

  function getModeValue(variable, modeId) {
    if (!variable.valuesByMode) {
      return undefined;
    }

    if (modeId && variable.valuesByMode[modeId] !== undefined) {
      return variable.valuesByMode[modeId];
    }

    const collection = getCollection(variable);
    const defaultModeId = collection?.defaultModeId || collection?.modes?.[0]?.modeId;
    if (defaultModeId && variable.valuesByMode[defaultModeId] !== undefined) {
      return variable.valuesByMode[defaultModeId];
    }

    const [first] = Object.values(variable.valuesByMode);
    return first;
  }

  function resolveAlias(id, modeId, seen = new Set()) {
    if (!id || seen.has(id)) {
      return undefined;
    }
    seen.add(id);

    const variable = resolveVariableId(id);
    if (!variable) {
      return undefined;
    }

    const value = getModeValue(variable, modeId);
    if (value?.type === 'VARIABLE_ALIAS') {
      return resolveAlias(value.id, modeId, seen);
    }

    return {variable, value};
  }

  const outputPathByVariableId = new Map();
  const variablesByName = new Map();

  for (const variable of variablesById.values()) {
    variablesByName.set(variable.name, variable);
  }

  function registerOutputPath(variableId, path) {
    outputPathByVariableId.set(variableId, path);
  }

  function findBrandVariable(variable, {allowAliasLookup = false} = {}) {
    const directBrand = variablesByName.get(`brand/${variable.name}`);
    if (directBrand) {
      return directBrand;
    }

    if (variable.name.startsWith('dark/')) {
      const directDarkBrand = variablesByName.get(`brand/${variable.name}`);
      if (directDarkBrand) {
        return directDarkBrand;
      }

      const [, color, shade] = variable.name.split('/');
      const mapped = PALETTE_TO_BRAND[color];
      if (mapped && shade) {
        return variablesByName.get(`brand/dark/${mapped}/${shade}`);
      }
    }

    const semanticBrandGroups = ['neutral', 'primary', 'positive', 'caution', 'critical'];
    const [group, shade] = variable.name.split('/');
    if (semanticBrandGroups.includes(group) && shade) {
      return variablesByName.get(`brand/${group}/${shade}`);
    }

    const [color, shadeOnly] = variable.name.split('/');
    const mapped = PALETTE_TO_BRAND[color];
    if (mapped && shadeOnly) {
      return variablesByName.get(`brand/${mapped}/${shadeOnly}`);
    }

    if (!allowAliasLookup) {
      return undefined;
    }

    for (const candidate of variablesById.values()) {
      if (!candidate.name.startsWith('brand/')) {
        continue;
      }

      const aliasValue = Object.values(candidate.valuesByMode)[0];
      if (aliasValue?.type !== 'VARIABLE_ALIAS') {
        continue;
      }

      const resolved = resolveAlias(aliasValue.id, undefined);
      if (resolved?.variable?.key === variable.key || resolved?.variable?.id === variable.id) {
        return candidate;
      }
    }

    return undefined;
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
      if (paletteMatch) {
        return `{dark.${paletteMatch[1]}.${paletteMatch[2]}}`;
      }
      return `{brand.${joined}}`;
    }

    return `{${joined}}`;
  }

  function valueToReference(resolved, options = {}) {
    if (!resolved?.variable) {
      return undefined;
    }

    let {variable} = resolved;
    const brandVariable = findBrandVariable(variable, options);
    if (brandVariable) {
      variable = brandVariable;
    }

    const collection = getCollection(variable);
    const collectionName = collection?.name;
    const pathSegments = toTokenPath(variable.name);

    if (collectionName === 'Brand') {
      return `{brand.${pathSegments.slice(1).join('.')}}`;
    }

    if (collectionName === 'Colors' && pathSegments[0] === 'dark') {
      const brandDark = variablesByName.get(`brand/${variable.name}`);
      if (brandDark) {
        return `{brand.${pathSegments.join('.')}}`;
      }
      return `{dark.${pathSegments.slice(1).join('.')}}`;
    }

    if (collectionName === 'Colors') {
      return `{${pathSegments.join('.')}}`;
    }

    if (collectionName === 'Theme') {
      const category = pathSegments[0];
      const rest = pathSegments.slice(1).join('.');
      return `{${[category, rest].filter(Boolean).join('.')}}`;
    }

    if (collectionName === 'Size') {
      const refPath =
        pathSegments[0] === 'size' ? pathSegments.join('.') : `size.${pathSegments.join('.')}`;
      return `{${refPath}}`;
    }

    if (collectionName === 'Type') {
      const flatPath = flattenFontPath(variable.name);
      return `{${flatPath.join('.')}}`;
    }

    if (collectionName === 'Motion') {
      return `{motion.${pathSegments.join('.')}}`;
    }

    if (collectionName === 'Shadow') {
      return `{shadow.${pathSegments.join('.')}}`;
    }

    if (collectionName === 'Opacity') {
      return `{opacity.${pathSegments.join('.')}}`;
    }

    const mapped = outputPathByVariableId.get(variable.id);
    if (mapped) {
      return `{${mapped}}`;
    }

    return formatReferencePath(pathSegments, collectionName);
  }

  function resolveValue(rawValue, variable, modeId, options = {}) {
    if (rawValue?.type === 'VARIABLE_ALIAS') {
      const resolved = resolveAlias(rawValue.id, modeId);
      return valueToReference(resolved, options);
    }

    if (variable.resolvedType === 'COLOR' && rawValue?.r !== undefined) {
      return rgbaToOklchColor(rawValue);
    }

    if (variable.resolvedType === 'EASING') {
      return formatEasingValue(rawValue);
    }

    return formatNumericValue(rawValue, variable);
  }

  return {
    collections,
    variables,
    collectionById,
    resolveVariableId,
    getCollection,
    getModeValue,
    resolveAlias,
    resolveValue,
    valueToReference,
    registerOutputPath,
    outputPathByVariableId,
  };
}

function getThemeCategory(variable) {
  return toTokenPath(variable.name)[0];
}

function getThemePathSegments(variable) {
  return toTokenPath(variable.name).slice(1);
}

function buildModeExtensions(variable, collection, context) {
  const darkMode = findDarkMode(collection);
  if (!darkMode) {
    return undefined;
  }

  const lightMode =
    findLightMode(collection) ||
    collection.modes.find(mode => mode.modeId === collection.defaultModeId);
  const lightValue = context.getModeValue(variable, lightMode?.modeId);
  const darkRaw = context.getModeValue(variable, darkMode.modeId);

  if (darkRaw === undefined) {
    return undefined;
  }

  const darkValue = context.resolveValue(darkRaw, variable, darkMode.modeId);
  const defaultValue = context.resolveValue(lightValue, variable, lightMode?.modeId);

  if (JSON.stringify(darkValue) === JSON.stringify(defaultValue)) {
    return undefined;
  }

  return {
    [CANVAS_TOKENS_EXTENSION]: {
      modes: {
        [DARK_MODE_KEY]: {
          $value: darkValue,
        },
      },
    },
  };
}

function buildBrandThemeExtensions(variable, brandExtension, context) {
  if (!brandExtension?.variableOverrides?.[variable.id]) {
    return undefined;
  }

  const overrides = brandExtension.variableOverrides[variable.id];
  const themes = {};
  const brandTheme = {};

  for (const mode of brandExtension.modes) {
    const overrideValue = overrides[mode.modeId];
    if (overrideValue === undefined) {
      continue;
    }

    const resolved = context.resolveValue(overrideValue, variable, mode.modeId, {
      allowAliasLookup: true,
    });
    const modeKey = toModeKey(mode.name);
    if (modeKey === 'light' || modeKey === 'dark') {
      brandTheme[modeKey] = {$value: resolved};
    }
  }

  if (!Object.keys(brandTheme).length) {
    return undefined;
  }

  themes[BRAND_THEME_KEY] = brandTheme;

  return {
    [CANVAS_TOKENS_EXTENSION]: {
      themes,
    },
  };
}

function mergeExtensions(...extensionObjects) {
  const merged = {};

  for (const extensionObject of extensionObjects) {
    if (!extensionObject?.[CANVAS_TOKENS_EXTENSION]) {
      continue;
    }

    const current = extensionObject[CANVAS_TOKENS_EXTENSION];
    if (!merged[CANVAS_TOKENS_EXTENSION]) {
      merged[CANVAS_TOKENS_EXTENSION] = {};
    }

    if (current.modes) {
      merged[CANVAS_TOKENS_EXTENSION].modes = {
        ...merged[CANVAS_TOKENS_EXTENSION].modes,
        ...current.modes,
      };
    }

    if (current.themes) {
      merged[CANVAS_TOKENS_EXTENSION].themes = {
        ...merged[CANVAS_TOKENS_EXTENSION].themes,
        ...current.themes,
      };
    }
  }

  return Object.keys(merged).length ? merged : undefined;
}

function flattenFontPath(name) {
  const segments = toTokenPath(name);
  if (segments[0] !== 'font') {
    return segments;
  }

  if (segments[1] === 'letter-spacing' || segments[1] === 'line-height') {
    return [segments[1], ...segments.slice(2)];
  }

  return [`font-${segments[1]}`, ...segments.slice(2)];
}

function flattenThemeTypePath(name) {
  return flattenFontPath(name.replace(/^type\//, ''));
}

function shouldIncludeBaseSizeVariable(name) {
  return name.startsWith('size/') && !name.startsWith('size/icon/') && !isPxToken(name);
}

function isPxToken(name) {
  const segments = toTokenPath(name);
  return segments[segments.length - 1] === 'px';
}

function routeSizeVariable(name) {
  if (isPxToken(name)) {
    return null;
  }

  const path = toTokenPath(name).slice(1);

  if (name.startsWith('size/icon/')) {
    return {file: 'component/system-icon.json', path: ['size', ...toTokenPath(name).slice(2)]};
  }

  if (name.startsWith('padding/')) {
    return {file: 'system/padding.json', path};
  }

  if (name.startsWith('gap/')) {
    return {file: 'system/gap.json', path};
  }

  if (name.startsWith('shape/')) {
    return {file: 'system/shape.json', path};
  }

  if (name.startsWith('size/')) {
    return {file: 'system/size.json', path};
  }

  return null;
}

function parseTypographyStyleName(styleName) {
  const parts = styleName
    .split('/')
    .filter(part => part && !STYLE_GROUP_SKIP.has(part.toLowerCase()));
  if (!parts.length) {
    return null;
  }

  if (parts[0].toLowerCase() === 'more styles') {
    parts.shift();
  }

  const category = toSlug(parts[0]);
  const detail = parts.slice(1).join(' / ') || parts[0];
  const sizeMatch = detail.match(/\b([SML])\b/i);
  const sizeMap = {s: 'sm', m: 'md', l: 'lg'};
  const size = sizeMatch ? sizeMap[sizeMatch[1].toLowerCase()] : toSlug(detail).split('-').pop();
  const isMono = /mono/i.test(detail);
  const isLink = /link/i.test(detail);

  return {category, size, isMono, isLink, detail};
}

function scoreTypographyStyle(style) {
  const parsed = parseTypographyStyleName(style.name);
  if (!parsed) {
    return -1;
  }

  let score = 0;
  if (!parsed.isMono) score += 4;
  if (!parsed.isLink) score += 2;
  if (!style.name.toLowerCase().includes('more styles')) score += 1;
  return score;
}

function extractTextStyleValue(node) {
  const style = node?.document?.style || node?.styles?.text || node?.document;
  if (!style) {
    return undefined;
  }

  const fontSize = style.fontSize ?? style.fontSize;
  const lineHeight = style.lineHeightPx ?? style.lineHeightPercentFontSize ?? style.lineHeight;
  const letterSpacing = style.letterSpacing;

  return {
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    fontSize: typeof fontSize === 'number' ? valueWithUnit(fontSize, 'px') : fontSize,
    lineHeight:
      typeof lineHeight === 'number' && lineHeight > 3
        ? valueWithUnit(lineHeight, 'px')
        : roundNumber(lineHeight),
    letterSpacing:
      typeof letterSpacing === 'number' ? valueWithUnit(letterSpacing, 'px') : letterSpacing,
    textDecoration: style.textDecoration === 'UNDERLINE' ? 'underline' : undefined,
  };
}

function extractEffectStyleValue(node) {
  const effects = node?.document?.effects || [];
  const shadows = effects
    .filter(effect => effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW')
    .map(effect => ({
      type: effect.type === 'INNER_SHADOW' ? 'innerShadow' : 'dropShadow',
      x: valueWithUnit(roundNumber(effect.offset?.x || 0), 'px'),
      y: valueWithUnit(roundNumber(effect.offset?.y || 0), 'px'),
      blur: valueWithUnit(roundNumber(effect.radius || 0), 'px'),
      spread: valueWithUnit(roundNumber(effect.spread || 0), 'px'),
      color: effect.color
        ? rgbaToOklchColor({
            r: effect.color.r,
            g: effect.color.g,
            b: effect.color.b,
            a: effect.color.a,
          })
        : undefined,
    }));

  return shadows.length ? shadows : undefined;
}

function addTokenToFiles(files, filePath, tokenPath, token) {
  if (!files.has(filePath)) {
    files.set(filePath, {});
  }

  deepSet(files.get(filePath), tokenPath, token);
}

function generateVariableTokens(payload) {
  const context = createContext(payload);
  const files = new Map();
  const collections = Object.entries(payload.meta.variableCollections)
    .map(([id, collection]) => ({id, ...collection}))
    .filter(collection => !collection.remote && !SKIP_COLLECTIONS.has(collection.name));

  const themeCollection = collections.find(
    collection => collection.name === 'Theme' && !collection.isExtension
  );
  const brandExtension = collections.find(
    collection => collection.isExtension && toSlug(collection.name) === BRAND_THEME_KEY
  );

  for (const collection of collections) {
    if (collection.isExtension) {
      continue;
    }

    const collectionVariables = Object.values(payload.meta.variables).filter(
      variable => !variable.remote && variable.variableCollectionId === collection.id
    );

    const lightMode = findLightMode(collection) || collection.modes?.[0];
    const lightModeId = lightMode?.modeId;

    for (const variable of collectionVariables) {
      const isTheme = collection.id === themeCollection?.id;
      const category = isTheme ? getThemeCategory(variable) : undefined;

      if (isTheme && SKIP_THEME_CATEGORIES.has(category)) {
        continue;
      }

      const defaultRaw = context.getModeValue(variable, lightModeId);
      if (defaultRaw === undefined) {
        continue;
      }

      const defaultValue = context.resolveValue(defaultRaw, variable, lightModeId);
      let type = figmaTypeToDtcg(variable.resolvedType, defaultValue);
      if (
        variable.name.startsWith('size/icon/') &&
        typeof defaultValue === 'string' &&
        defaultValue.startsWith('{size.')
      ) {
        type = 'dimension';
      }
      const extensions = mergeExtensions(
        isTheme ? buildModeExtensions(variable, collection, context) : undefined,
        isTheme && brandExtension
          ? buildBrandThemeExtensions(variable, brandExtension, context)
          : undefined
      );

      const token = buildTokenLeaf({
        value: defaultValue,
        type,
        description: variable.description || undefined,
        extensions,
      });

      let destination;

      switch (collection.name) {
        case 'Colors': {
          const path = toTokenPath(variable.name);
          destination = {file: 'base/palette.json', path};
          context.registerOutputPath(variable.id, path.join('.'));
          break;
        }
        case 'Brand': {
          const path = toTokenPath(variable.name).slice(1);
          destination = {file: 'brand.json', path};
          context.registerOutputPath(variable.id, ['brand', ...path].join('.'));
          break;
        }
        case 'Motion': {
          const segments = toTokenPath(variable.name);
          const prefix = collection.libraryPrefix || 'base';
          destination = {
            file: `${prefix}/motion.json`,
            path: segments,
          };
          context.registerOutputPath(variable.id, ['motion', ...segments].join('.'));
          break;
        }
        case 'Opacity': {
          const segments = toTokenPath(variable.name).slice(1);
          const prefix = collection.libraryPrefix || 'base';
          destination = {file: `${prefix}/opacity.json`, path: segments};
          context.registerOutputPath(variable.id, ['opacity', ...segments].join('.'));
          break;
        }
        case 'Shadow': {
          destination = {file: 'base/shadow.json', path: toTokenPath(variable.name).slice(1)};
          context.registerOutputPath(
            variable.id,
            ['shadow', ...toTokenPath(variable.name).slice(1)].join('.')
          );
          break;
        }
        case 'Type': {
          destination = {file: 'base/type.json', path: flattenFontPath(variable.name)};
          context.registerOutputPath(
            variable.id,
            ['type', ...flattenFontPath(variable.name)].join('.')
          );
          break;
        }
        case 'Canvas': {
          destination = {file: 'base/base.json', path: toTokenPath(variable.name).slice(1)};
          break;
        }
        case 'Size': {
          if (variable.name.startsWith('base/')) {
            destination = {file: 'base/base.json', path: toTokenPath(variable.name).slice(1)};
            break;
          }

          if (collection.libraryPrefix === 'system') {
            destination = routeSizeVariable(variable.name);
          } else if (shouldIncludeBaseSizeVariable(variable.name)) {
            destination = {file: 'base/size.json', path: toTokenPath(variable.name).slice(1)};
            context.registerOutputPath(
              variable.id,
              ['size', ...toTokenPath(variable.name).slice(1)].join('.')
            );
          } else {
            destination = null;
          }
          break;
        }
        case 'Theme': {
          if (category === 'type') {
            const path = flattenThemeTypePath(variable.name);
            destination = {file: 'system/type.json', path};
          } else {
            destination = {
              file: `system/color/${category}.json`,
              path: getThemePathSegments(variable),
            };
          }
          break;
        }
        case 'Breakpoint': {
          destination = {file: 'system/breakpoint.json', path: toTokenPath(variable.name).slice(1)};
          break;
        }
        default:
          destination = null;
      }

      if (!destination) {
        continue;
      }

      addTokenToFiles(files, destination.file, destination.path, token);
    }
  }

  return files;
}

function generateStyleTokens(payload) {
  const files = new Map();
  const styles = payload.styles?.published || [];
  const nodes = payload.styles?.nodes || {};
  const textStyles = [];
  const effectStyles = [];

  for (const style of styles) {
    if (SKIP_STYLE_TYPES.has(style.style_type)) {
      continue;
    }

    if (style.style_type === 'TEXT') {
      textStyles.push(style);
    }

    if (style.style_type === 'EFFECT') {
      effectStyles.push(style);
    }
  }

  const bestTextStyles = new Map();
  for (const style of textStyles.sort(
    (left, right) => scoreTypographyStyle(right) - scoreTypographyStyle(left)
  )) {
    const parsed = parseTypographyStyleName(style.name);
    if (!parsed) {
      continue;
    }

    const key = `${parsed.category}.${parsed.size}`;
    if (bestTextStyles.has(key)) {
      continue;
    }

    const node = nodes[style.node_id];
    const value = extractTextStyleValue(node);
    if (!value) {
      continue;
    }

    bestTextStyles.set(
      key,
      buildTokenLeaf({
        value,
        type: 'typography',
        description: style.description || undefined,
      })
    );
  }

  for (const [key, token] of bestTextStyles) {
    const [category, size] = key.split('.');
    addTokenToFiles(files, 'system/type.json', [category, size], token);
  }

  for (const style of effectStyles) {
    const name = style.name.replace(/^Depth\s*/i, '').trim();
    const slug = toSlug(name) || toSlug(style.name);
    if (!/^\d+$/.test(slug) || /focus/i.test(style.name)) {
      continue;
    }

    const node = nodes[style.node_id];
    const value = extractEffectStyleValue(node);
    if (!value) {
      continue;
    }

    addTokenToFiles(
      files,
      'system/depth.json',
      [slug],
      buildTokenLeaf({
        value,
        type: 'shadow',
        description: style.description || undefined,
      })
    );
  }

  return files;
}

function mergeFileMaps(...maps) {
  const merged = new Map();

  for (const map of maps) {
    for (const [filePath, content] of map) {
      if (!merged.has(filePath)) {
        merged.set(filePath, content);
        continue;
      }

      const existing = merged.get(filePath);
      Object.assign(existing, content);
    }
  }

  return merged;
}

function assignLibraryPrefixes(payloads) {
  for (const payload of payloads) {
    const name = payload.library?.name || '';

    for (const collection of Object.values(payload.meta.variableCollections)) {
      if (/base/i.test(name)) {
        collection.libraryPrefix = 'base';
      } else if (/token/i.test(name)) {
        collection.libraryPrefix = 'system';
      }
    }
  }
}

function writeOutputFiles(fileMap, outputDir) {
  const resolvedOutputDir = resolve(process.cwd(), outputDir);

  if (existsSync(resolvedOutputDir)) {
    rmSync(resolvedOutputDir, {recursive: true, force: true});
  }

  for (const [relativePath, content] of [...fileMap.entries()].sort(([left], [right]) =>
    left.localeCompare(right)
  )) {
    const outputPath = resolve(resolvedOutputDir, relativePath);
    mkdirSync(dirname(outputPath), {recursive: true});
    writeFileSync(outputPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  }

  return resolvedOutputDir;
}

function main() {
  const inputPaths = resolveInputPaths();
  const payloads = inputPaths.map(inputPath => JSON.parse(readFileSync(inputPath, 'utf8')));
  assignLibraryPrefixes(payloads);
  const merged = mergePayloads(payloads);

  const variableFiles = generateVariableTokens(merged);
  const styleFiles = generateStyleTokens(merged);
  const files = mergeFileMaps(variableFiles, styleFiles);
  const outputDir = writeOutputFiles(files, DEFAULT_OUTPUT_DIR);

  console.log(`Generated ${files.size} token files in ${outputDir}`);
  for (const filePath of [...files.keys()].sort()) {
    console.log(`  - ${filePath}`);
  }
}

main();
