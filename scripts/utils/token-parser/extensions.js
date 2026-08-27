import {findDarkMode, findLightMode, toSlug} from './naming.js';

const CANVAS_TOKENS_EXTENSION = 'sana.canvas.tokens';
const DARK_MODE_KEY = 'dark';
const BRAND_THEME_KEY = 'brand';

export function buildModeExtensions(variable, collection, context, options = {}) {
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

  const darkValue = context.resolveValue(darkRaw, variable, darkMode.modeId, options);
  const defaultValue = context.resolveValue(lightValue, variable, lightMode?.modeId, options);

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

export function buildBrandThemeExtensions(variable, brandExtension, context) {
  if (!brandExtension?.variableOverrides?.[variable.id]) {
    return undefined;
  }

  const overrides = brandExtension.variableOverrides[variable.id];
  const brandTheme = {};

  for (const mode of brandExtension.modes) {
    const overrideValue = overrides[mode.modeId];
    if (overrideValue === undefined) {
      continue;
    }

    const resolved = context.resolveValue(overrideValue, variable, mode.modeId, {
      allowAliasLookup: true,
    });
    const modeKey = toSlug(mode.name);
    if (modeKey === 'light' || modeKey === 'dark') {
      brandTheme[modeKey] = {$value: resolved};
    }
  }

  if (!Object.keys(brandTheme).length) {
    return undefined;
  }

  return {
    [CANVAS_TOKENS_EXTENSION]: {
      themes: {
        [BRAND_THEME_KEY]: brandTheme,
      },
    },
  };
}

function compactObject(value) {
  return Object.keys(value).length ? value : undefined;
}

export function mergeExtensions(...extensionObjects) {
  const extension = extensionObjects.reduce((merged, extensionObject) => {
    const current = extensionObject?.[CANVAS_TOKENS_EXTENSION];
    if (!current) {
      return merged;
    }

    return {
      modes: {...merged.modes, ...current.modes},
      themes: {...merged.themes, ...current.themes},
    };
  }, {});

  const modes = compactObject(extension.modes || {});
  const themes = compactObject(extension.themes || {});

  if (!modes && !themes) {
    return undefined;
  }

  return {
    [CANVAS_TOKENS_EXTENSION]: {
      ...(modes && {modes}),
      ...(themes && {themes}),
    },
  };
}
