/** A single DTCG token as emitted by Style Dictionary for the base palette. */
export type Token = Record<string, any>;

export type ColorFamily =
  | 'black'
  | 'red'
  | 'coral'
  | 'orange'
  | 'amber'
  | 'azure'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'teal'
  | 'green'
  | 'magenta'
  | 'neutral'
  | 'white'
  | 'slate';

export type ColorPaletteCardProps = {
  colorFamily: ColorFamily;
  isAlpha?: boolean;
  hideNames?: boolean;
};

export type HeroProps = {
  step: string;
  token: Token;
  family: string;
  isAlpha: boolean;
  isDark: boolean;
};

export type SwatchProps = {
  step: string;
  token: Token;
  isActive: boolean;
  hideName: boolean;
  onSelect: () => void;
};
