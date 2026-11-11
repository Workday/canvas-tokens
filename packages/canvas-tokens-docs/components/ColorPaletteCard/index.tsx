import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {Subtext} from '@workday/canvas-kit-react/text';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';

import {CodeBlock} from '../CodeBlock';
import {CopyButton} from '../CopyButton';
import {useColorMode} from '../ThemeControl';
import palette from '../../data/tokens/base/palette';

// @ts-expect-error CSS modules are resolved by the docs build tooling
import styles from './index.module.css';

type Token = Record<string, any>;

type ColorPaletteCardProps = {
  colorFamily: keyof Omit<typeof palette, 'dark'>;
  isAlpha?: boolean;
  hideNames?: boolean;
  isDark?: boolean;
};

const isAlphaStep = (step: string) => /^a\d+/i.test(step);
const getTokenName = (token: Token) => token.key.replace(/[{}]/g, '');
const isInverse = (step: string) => Number(step.replace(/a/gi, '')) > 400;

type HeroProps = {
  step: string;
  token: Token;
  family: string;
  isAlpha?: boolean;
  isDark?: boolean;
};

const DARK_ALPHA_FAMILIES = ['black', 'neutral', 'slate'];

/**
 * Whether the hero text should use the inverse foreground color, per color mode.
 * Solid heroes always render in light mode; alpha heroes follow the surrounding theme, where the
 * default foreground already flips with it, so `inverse` is relative to the theme's default text.
 * Dark palettes (`isDark`) reverse the step threshold.
 */
const getInverse = (family: string, step: string, isAlpha: boolean, isDark: boolean) => {
  const high = isDark ? !isInverse(step) : isInverse(step);

  if (!isAlpha) {
    return {light: high, dark: high};
  }

  if (DARK_ALPHA_FAMILIES.includes(family)) {
    // Black-based alphas get opaque dark steps on a light surface; on a dark surface they vanish
    // into it, so the theme's default (light) text is always right.
    return {light: high, dark: false};
  }

  if (family === 'white') {
    // White-based alphas are invisible on light surfaces; on dark ones they turn opaque past 400.
    return {light: false, dark: high};
  }

  return {light: false, dark: false};
};

const HeroCard = ({step, token, family, isAlpha = false, isDark = false}: HeroProps) => {
  const inverse = getInverse(family, step, isAlpha, isDark);
  const style = {'--hero-bg-color': token.$value} as React.CSSProperties;

  const hex = token.original.$value.hex;
  const jsToken = `token('${getTokenName(token)}')`;
  const cssVariable = `--cnvs-base-palette-${getTokenName(token).replace(/\./g, '-')}`;

  return (
    <div
      data-color-mode={!isAlpha ? 'light' : undefined}
      className={[
        styles.hero,
        !isAlpha && inverse.light && styles.heroInverse,
        isAlpha && inverse.light && styles.heroInverseLight,
        isAlpha && inverse.dark && styles.heroInverseDark,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <div className={`cnvs-sys-type-heading-md ${styles.heroTitle}`}>{getTokenName(token)}</div>
      <CodeBlock>{token.$value}</CodeBlock>
      <div className={styles.actions}>
        <CopyButton text={hex}>{hex}</CopyButton>
        <CopyButton text={jsToken}>JS Code</CopyButton>
        <CopyButton text={cssVariable}>CSS Variable</CopyButton>
      </div>
    </div>
  );
};

const Hero = (props: HeroProps) => {
  if (!props.isAlpha) {
    return <HeroCard {...props} />;
  }

  return (
    <div className={styles.alpha}>
      <HeroCard {...props} />
      <div className={styles.alphaBg} />
    </div>
  );
};

type SwatchProps = {
  step: string;
  token: Token;
  isActive: boolean;
  hideName: boolean;
  onSelect: () => void;
};

const Swatch = ({step, token, isActive, hideName, onSelect}: SwatchProps) => {
  const style = {'--chip-bg-color': token.$value} as React.CSSProperties;

  if (hideName) {
    return (
      <Tooltip title={step}>
        <button
          type="button"
          className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
          style={style}
          aria-label={step}
          aria-pressed={isActive}
          onClick={onSelect}
        />
      </Tooltip>
    );
  }

  return (
    <div className={styles.swatch}>
      <button
        type="button"
        className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
        style={style}
        aria-label={step}
        aria-pressed={isActive}
        onClick={onSelect}
      />
      <Subtext
        as="span"
        size="small"
        className={`${styles.swatchName} ${isActive ? styles.swatchNameActive : ''}`}
      >
        {step}
      </Subtext>
    </div>
  );
};

export const ColorPaletteCard = ({
  colorFamily,
  isAlpha = false,
  hideNames = false,
}: ColorPaletteCardProps) => {
  const [activeStep, setActiveStep] = React.useState(isAlpha ? 'A300' : '500');
  const isDark = !!document?.getElementById('theme-control')?.closest('[data-theme="dark"]');
  const mode = useColorMode();
  // Dark tokens are used when asked for explicitly or when the dark theme is on.
  // Families without a dark counterpart (black, white) keep their base tokens.
  const darkTokens: Record<string, Token> | undefined = (palette.dark as any)[
    colorFamily as string
  ];
  const useDarkTokens = (isDark || mode === 'dark') && !!darkTokens;
  const tokens: Record<string, Token> = useDarkTokens ? darkTokens! : palette[colorFamily];

  const steps = Object.keys(tokens).filter(step => isAlphaStep(step) === isAlpha);

  return (
    <Card className={styles.card}>
      <Card.Heading className={styles.heading}>
        {colorFamily}
        {isAlpha && ' (Alpha)'}
      </Card.Heading>
      <Card.Body>
        <Hero
          step={activeStep}
          token={tokens[activeStep]}
          family={colorFamily as string}
          isAlpha={isAlpha}
          isDark={useDarkTokens}
        />
        <div className={styles.steps}>
          {steps.map(step => (
            <Swatch
              key={step}
              step={step}
              token={tokens[step]}
              isActive={step === activeStep}
              hideName={hideNames}
              onSelect={() => setActiveStep(step)}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
