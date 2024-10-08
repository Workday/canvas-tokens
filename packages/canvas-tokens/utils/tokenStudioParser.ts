import {kebabCase} from 'case-anything';
import {DesignToken} from 'style-dictionary/types/DesignToken';
import refsList from '../_refs.json';

export function resolveRef(ref: string, resolver: (full: string, ref: string) => string) {
  // comment explaining what this RegExp does.
  return ref.replace(/\{([^}]+)\}/gi, resolver);
}

export const tokenStudioParser = ({contents}: any) => {
  const parsed = JSON.parse(contents);

  if (parsed.sys) {
    delete parsed.sys['More styles'];
  }

  if (parsed.base) {
    const {unit} = parsed.base.base;
    delete parsed.base.base;
    parsed.base.unit = unit;
  }

  const updateTokens = (token: DesignToken) => {
    replaceDescriptionByComment(token);
    transformExtensions(token);
    transformRefs(token);
    return token;
  };

  mapObjectContent(updateTokens, parsed);

  return parsed;
};

const getLevel = (ref: string): string | void => {
  return Object.keys(refsList).find((key: string) =>
    (refsList as any)[key].some((item: string) => item.startsWith(ref))
  );
};

const replaceDescriptionByComment = (token: DesignToken) => {
  const {description} = token;

  if (description) {
    delete token.description;
    const updated = description.replace(/\n+/g, '; ');
    token.comment = updated;
  }
};

const transformRefs = (token: DesignToken) => {
  const {value} = token;

  const replacePx = (value: string, key: string) => {
    return ['width'].includes(key) && value !== '0' ? `${parseFloat(value) / 16}rem` : value;
  };

  const updateInnerValue = (value: string, key: string): string => {
    const noRefValue = replaceByFullRef(value);
    return replacePx(noRefValue, key);
  };

  if (typeof value === 'string') {
    token.value = replaceByFullRef(value);
    return;
  }

  if (value.length) {
    value.forEach((val: Record<string, string>, index: number) => {
      token.value[index] = updateObjectValue(val, kebabCase, updateInnerValue);
    });
    return;
  }

  token.value = updateObjectValue(value, kebabCase, updateInnerValue);
};

const updateObjectValue = (
  value: Record<string, string>,
  updateKeyFn?: (key: string) => string,
  updateValueFn?: (value: string, key: string) => string
) => {
  return Object.entries(value).reduce((acc: Record<string, string>, [prop, propValue]) => {
    if (updateKeyFn) {
      prop = updateKeyFn(prop);
    }
    if (updateValueFn) {
      propValue = updateValueFn(propValue, prop);
    }

    acc[prop] = propValue;

    return acc;
  }, {});
};

const replaceByFullRef = (value: string) => {
  // add level to ref if it's missed
  return resolveRef(value, (full, ref) => {
    const level = getLevel(ref);
    return level ? `{${level}.${ref}}` : full;
  });
};

// Resolving extensions
const mapObjectContent = (fn: (token: DesignToken) => DesignToken, obj: DesignToken) => {
  if (obj.value) {
    return fn(obj);
  }

  Object.keys(obj).forEach(key => {
    mapObjectContent(fn, obj[key]);
  });
};

const transformExtensions = (token: DesignToken) => {
  if (token['$extensions']) {
    const {modify} = token['$extensions']['studio.tokens'];

    if (modify && modify.type === 'alpha') {
      token.value = `rgba(${token.value},${modify.value})`;
    }

    delete token['$extensions'];
  }
};
