const NUMBER_WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const COLOR_NAMES: Record<string, string> = {bg: 'Background', fg: 'Foreground'};

const upperFirst = (part: string) => part.charAt(0).toUpperCase() + part.slice(1);
/** `font-family` -> `fontFamily` */
const toCamel = (part: string) => part.replace(/-(\w)/g, (_, char: string) => char.toUpperCase());
/** `font-family` -> `FontFamily` */
const toPascal = (part: string) => upperFirst(toCamel(part));
/** `['caution', 'inner']` -> `cautionInner` */
const joinCamel = (parts: string[]) =>
  parts.map((part, index) => (index === 0 ? toCamel(part) : toPascal(part))).join('');
/** `$root` is exposed as `default`; numeric steps get an `n` prefix, e.g. `n100`. */
const leaf = (part: string, options: {numberPrefix?: boolean} = {}) =>
  part === '$root'
    ? 'default'
    : options.numberPrefix !== false && /^\d+$/.test(part)
    ? `n${part}`
    : toCamel(part);
const numberWord = (part: string) => NUMBER_WORDS[Number(part)] ?? part;

/** Mobile name of a base token, e.g. `SanaCanvasBase.Duration.n100` or `SanaCanvasPalette.blue400`. */
const getBaseMobileName = (type: string, path: string[]) => {
  const [first, ...rest] = path;

  if (type === 'palette') {
    // Dark palettes have a `dark` prefix, e.g. dark/teal/A50 -> darkTealA50
    return `SanaCanvasPalette.${joinCamel(path.slice(0, -1))}${path[path.length - 1]}`;
  }
  if (type === 'shadow') {
    // shadow/1/key/y -> ShadowOne.Key.y: the scale and children are combined into one name
    const [scale, ...children] = rest;
    const last = children.pop();
    return [
      'SanaCanvasBase',
      `Shadow${upperFirst(numberWord(scale))}`,
      ...children.map(toPascal),
      last && toCamel(last),
    ]
      .filter(Boolean)
      .join('.');
  }

  const name = toPascal(first);
  const value = rest.join('');
  if (!value) return undefined;
  // Easing steps have no `n` prefix, e.g. `a-100` -> `a100`
  return `SanaCanvasBase.${name}.${first === 'easing' ? toCamel(value) : leaf(value)}`;
};

/** Mobile name of a brand token, e.g. `SanaCanvasBrand.primaryA300` or `SanaCanvasBrand.Common.focus`. */
const getBrandMobileName = (path: string[]) => {
  const [, category, ...rest] = path;

  if (category === 'gradient') {
    const gradient = `SanaCanvasBrand.Gradient.${joinCamel(rest)}`;
    return [`${gradient}.stops[0]`, `${gradient}.stops[1]`, `${gradient}.angle`].join('\n');
  }
  if (category === 'action' || category === 'common') {
    return `SanaCanvasBrand.${toPascal(category)}.${joinCamel(rest)}`;
  }
  return `SanaCanvasBrand.${category}${rest.join('')}`;
};

/** Mobile name of a system color token, e.g. `SanaCanvasColor.Foreground.Muted.default`. */
const getSystemColorMobileName = (category: string, segments: string[]) => {
  const [first, ...rest] = segments;
  const name = COLOR_NAMES[first] ?? toPascal(first);
  const prefix = `SanaCanvasColor.${name}`;

  if (category === 'shadow' || first === 'shadow') {
    // shadow/1/key -> ShadowOne.key (the scale is a word); shadow/base stays Shadow.base
    const [scale, ...children] = rest;
    return /^\d+$/.test(scale)
      ? `SanaCanvasColor.Shadow${upperFirst(numberWord(scale))}.${joinCamel(children)}`
      : `SanaCanvasColor.Shadow.${joinCamel(rest)}`;
  }
  if (first === 'border') {
    // Camel case for everything after the group, e.g. `input` + `hover` -> `inputHover`
    return `${prefix}.${joinCamel(rest.map(part => leaf(part, {numberPrefix: false})))}`;
  }
  if (!rest.length) return prefix;
  const last = rest[rest.length - 1];
  const groups = rest.slice(0, -1).map(part => COLOR_NAMES[part] ?? toPascal(part));
  return [prefix, ...groups, leaf(last)].join('.');
};

/** Mobile name of a system token, e.g. `SanaCanvasMotion.Duration.n100`. */
const getSystemMobileName = (group: string, path: string[]) => {
  const [, type, category] = group.split('.');
  const segments = path[0] === type ? path.slice(1) : path;

  if (type === 'color') return getSystemColorMobileName(category, segments);

  if (!['depth', 'motion', 'opacity', 'shape', 'type'].includes(type) || !segments.length) {
    return undefined;
  }
  const prefix = `SanaCanvas${toPascal(type)}`;
  const last = segments[segments.length - 1];
  const groups = segments.slice(0, -1).map(toPascal);
  // Depth levels are words (`one`), like shadows
  const name = type === 'depth' ? numberWord(last) : leaf(last);
  return [prefix, ...groups, name].join('.');
};

/** The mobile token name for a token in `group` (e.g. `system.color.bg`), following the mobile naming rules. */
export const getMobileTokenName = (group: string, path: string[]) => {
  const [level, type] = group.split('.');
  if (level === 'base') return getBaseMobileName(type, path);
  if (level === 'brand') return getBrandMobileName(path);
  if (level === 'system') return getSystemMobileName(group, path);
};
