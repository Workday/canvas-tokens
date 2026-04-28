type RecursivelyFlatObjectFunctionArgs = {
  tokens: Record<string, any>;
  isFallback?: boolean;
  isRoot?: boolean;
};

type RecursivelyFlatObjectFunction = (args: RecursivelyFlatObjectFunctionArgs) => any;

export const recursivelyFlatObjectValue: RecursivelyFlatObjectFunction = ({
  tokens,
  isFallback,
  isRoot = true,
}) => {
  if (isFallback) {
    if ('fallbackValue' in tokens) {
      return tokens.fallbackValue;
    }
    if ('cssVarName' in tokens) {
      return undefined;
    }
  }

  if ('cssVarName' in tokens) {
    return tokens.cssVarName;
  }

  const next: Record<string, any> = {};

  for (const key of Object.keys(tokens)) {
    const value = recursivelyFlatObjectValue({
      tokens: tokens[key],
      isFallback,
      isRoot: false,
    });

    if (!(isFallback && value === undefined)) {
      next[key] = value;
    }
  }

  if (isFallback && !isRoot && !Object.keys(next).length) {
    return undefined;
  }

  return next;
};
