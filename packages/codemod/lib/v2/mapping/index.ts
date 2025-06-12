export const typeProps = ['fontFamily', 'fontSize', 'lineHeight', 'fontWeight', 'color'] as const;

const generateLevelTokens = ([level, size]: string[]) => {
  return typeProps.reduce((acc: {[key in (typeof typeProps)[number]]?: string}, prop) => {
    if (prop === 'color') {
      acc.color = ['heading', 'title'].includes(level)
        ? 'system.color.fg.strong'
        : 'system.color.fg.default';
      return acc;
    }
    if (prop === 'fontWeight') {
      acc.fontWeight = ['heading', 'title'].includes(level)
        ? 'system.fontWeight.bold'
        : 'system.fontWeight.regular';
      return acc;
    } else if (prop === 'fontFamily') {
      acc.fontFamily = 'system.fontFamily.default';
      return acc;
    } else {
      acc[prop] = `system.${prop}.${level}.${size}`;
      return acc;
    }
  }, {});
};

const typeLevelsMap = {
  subtext: {
    small: generateLevelTokens(['subtext', 'small']),
    medium: generateLevelTokens(['subtext', 'medium']),
    large: generateLevelTokens(['subtext', 'large']),
  },
  body: {
    small: generateLevelTokens(['body', 'small']),
    medium: generateLevelTokens(['body', 'medium']),
    large: generateLevelTokens(['body', 'large']),
  },
  heading: {
    small: generateLevelTokens(['heading', 'small']),
    medium: generateLevelTokens(['heading', 'medium']),
    large: generateLevelTokens(['heading', 'large']),
  },
  title: {
    small: generateLevelTokens(['title', 'small']),
    medium: generateLevelTokens(['title', 'medium']),
    large: generateLevelTokens(['title', 'large']),
  },
};

const shapeMap = {
  zero: 'zero',
  s: 'half',
  m: 'x1',
  l: 'x2',
  circle: 'round',
};

const spaceMap = {
  zero: 'zero',
  xxxs: 'x1',
  xxs: 'x2',
  xs: 'x3',
  s: 'x4',
  m: 'x6',
  l: 'x8',
  xl: 'x10',
  xxl: 'x16',
  xxxl: 'x20',
};

const typeMap = {
  fontFamilies: {
    name: 'fontFamily',
    values: {
      default: 'default',
      monospace: 'mono',
    },
  },
  fontSizes: {
    name: 'fontSize',
    values: {
      10: 'subtext.small',
      12: 'subtext.medium',
      14: 'subtext.large',
      16: 'body.small',
      18: 'body.medium',
      20: 'body.large',
      24: 'heading.small',
      28: 'heading.medium',
      32: 'heading.large',
      40: 'title.small',
      48: 'title.medium',
      56: 'title.large',
    },
  },
  fontWeights: {
    name: 'fontWeight',
    values: {
      regular: 'regular',
      medium: 'medium',
      bold: 'bold',
    },
  },
  levels: {
    name: 'type',
    values: typeLevelsMap,
  },
};

export const mapping = {
  colors: {
    type: 'base',
    name: 'colors',
  },
  borderRadius: {
    name: 'shape',
    type: 'system',
    keys: shapeMap,
  },
  space: {
    name: 'space',
    type: 'system',
    keys: spaceMap,
  },
  type: {
    type: 'system',
    name: 'type',
    keys: typeMap,
  },
  depth: {
    type: 'system',
    name: 'depth',
    keys: {},
  },
} as const;
