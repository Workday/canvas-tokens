type TokenType =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'gradient'
  | 'dimension'
  | 'number'
  | 'duration'
  | 'cubicBezier'
  | 'fontWeight'
  | 'fontFamily'
  | 'shadow';

/** Set to `base` for base tokens, whose keys don't carry their level, e.g. `{size.100}`. */
export type TokenLevel = 'base';

type SDValue = {$value?: string};

type SDExtensions = {
  'sana.canvas.tokens'?: {
    modes?: {dark?: SDValue};
    themes?: {canvas?: SDValue & {$excluded?: boolean; light?: SDValue; dark?: SDValue}};
  };
};

export type SDToken = {
  key: string;
  $value: string;
  $type: TokenType;
  $description: string;
  $deprecated?: boolean;
  path: string[];
  /** Resolved (computed) values of the mode and theme overrides, mirroring `original.$extensions`. */
  $extensions?: SDExtensions;
  original: {
    $value: string;
    $extensions?: SDExtensions;
  };
};
