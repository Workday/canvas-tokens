import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {Subtext} from '@workday/canvas-kit-react/text';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';

import {CodeBlock} from '../CodeBlock';
import {CopyButton} from '../CopyButton';
import {useColorMode} from '../../util';
import type {ColorMode} from '../../util';
import palette from '../../data/tokens/base/palette';
import type {ColorPaletteCardProps, HeroProps, SwatchProps, Token} from './types';

import './index.css';

export type {ColorFamily, ColorPaletteCardProps} from './types';

const isAlphaStep = (step: string) => /^a\d+/i.test(step);
const getTokenName = (token: Token): string => token.key.replace(/[{}]/g, '');
const isHighStep = (step: string) => Number(step.replace(/a/gi, '')) > 400;

/**
 * Whether the copy buttons use the inverse variant. Solid steps below 500 are default in light mode
 * and inverse in dark mode, and steps past 500 are the opposite. Alpha steps are default below 500
 * and inverse past it, in either mode. Some families override both rules (in dark mode alpha black is default and alpha neutral and slate are inverse past 400, matching their hero text).
 */
const isInverseButton = (family: string, step: string, isAlpha: boolean, mode: ColorMode) => {
  if (family === 'white' && mode === 'light') return false;
  // In dark mode `inverse` flips with the theme (dark label), so these alphas use it only where
  // their hero text is inverse too.
  if (family === 'black' && mode === 'dark') return false;

  const isHigh = isHighStep(step);
  if (isAlpha && ['neutral', 'slate'].includes(family) && mode === 'dark') return isHigh;
  if (isAlpha) return isHigh;

  return mode === 'light' ? isHigh : !isHigh;
};

/**
 * Whether the hero text should use the inverse foreground color, per color mode.
 * Solid heroes always render in light mode; alpha heroes follow the surrounding theme, where the
 * default foreground already flips with it, so `inverse` is relative to the theme's default text.
 * Dark palettes (`isDark`) reverse the step threshold.
 */
const getInverse = (family: string, step: string, isAlpha: boolean, isDark: boolean) => {
  const high = isDark ? !isHighStep(step) : isHighStep(step);

  if (!isAlpha) {
    return {light: high, dark: high};
  }
  if (family === 'black') {
    // Black-based alphas get opaque dark steps on a light surface; on a dark surface they vanish
    // into it, so the theme's default (white) text is always right.
    return {light: high, dark: false};
  }
  if (family === 'neutral' || family === 'slate') {
    // Same on a light surface; in dark mode low steps keep the default (white) text and the
    // higher, lighter steps need dark (inverse) text.
    return {light: high, dark: isHighStep(step)};
  }
  if (family === 'white') {
    // White-based alphas are invisible on light surfaces; on dark ones they turn opaque past 400.
    return {light: false, dark: high};
  }
  return {light: false, dark: false};
};

/** Large preview of the selected step with copy actions for its value, JS token and CSS variable. */
const Hero = ({step, token, family, isAlpha, isDark}: HeroProps) => {
  const mode = useColorMode();
  const buttonVariant = isInverseButton(family, step, isAlpha, mode) ? 'inverse' : undefined;
  const inverse = getInverse(family, step, isAlpha, isDark);
  const name = getTokenName(token);
  const hex = token.original.$value.hex;

  const className = [
    'cnvs-docs-palette-hero',
    !isAlpha && inverse.light && 'cnvs-docs-palette-hero-inverse',
    isAlpha && inverse.light && 'cnvs-docs-palette-hero-inverse-light',
    isAlpha && inverse.dark && 'cnvs-docs-palette-hero-inverse-dark',
  ]
    .filter(Boolean)
    .join(' ');

  const hero = (
    <div
      data-color-mode={isAlpha ? undefined : 'light'}
      className={className}
      style={{'--hero-bg-color': token.$value} as React.CSSProperties}
    >
      <div className="cnvs-sys-type-heading-md cnvs-docs-palette-hero-title">{name}</div>
      <CodeBlock>{token.$value}</CodeBlock>
      <div className="cnvs-docs-palette-actions">
        <CopyButton text={hex} variant={buttonVariant}>
          {hex}
        </CopyButton>
        <CopyButton text={`token('${name}')`} variant={buttonVariant}>
          JS Code
        </CopyButton>
        <CopyButton
          text={`--cnvs-base-palette-${name.replace(/\./g, '-')}`}
          variant={buttonVariant}
        >
          CSS Variable
        </CopyButton>
      </div>
    </div>
  );

  // Alpha heroes sit on a backdrop so their transparency is visible.
  return isAlpha ? (
    <div className="cnvs-docs-palette-alpha">
      {hero}
      <div className="cnvs-docs-palette-alpha-bg" />
    </div>
  ) : (
    hero
  );
};

/** Selectable color chip for one palette step, labelled below or via tooltip when `hideName`. */
const Swatch = ({step, token, isActive, hideName, onSelect}: SwatchProps) => {
  const chip = (
    <button
      type="button"
      className={`cnvs-docs-palette-chip ${isActive ? 'cnvs-docs-palette-chip-active' : ''}`}
      style={{'--chip-bg-color': token.$value} as React.CSSProperties}
      aria-label={step}
      aria-pressed={isActive}
      onClick={onSelect}
    />
  );

  if (hideName) {
    return <Tooltip title={step}>{chip}</Tooltip>;
  }

  return (
    <div className="cnvs-docs-palette-swatch">
      {chip}
      <Subtext
        as="span"
        size="small"
        className={`cnvs-docs-palette-swatch-name ${
          isActive ? 'cnvs-docs-palette-swatch-name-active' : ''
        }`}
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
  const isDark = useColorMode() === 'dark';

  const darkTokens = palette.dark[colorFamily as keyof typeof palette.dark];
  const useDarkTokens = isDark && !!darkTokens;
  const tokens: Record<string, Token> = useDarkTokens ? darkTokens : palette[colorFamily];

  const steps = Object.keys(tokens).filter(step => isAlphaStep(step) === isAlpha);

  return (
    <Card className="cnvs-docs-palette-card">
      <Card.Heading className="cnvs-docs-palette-heading">
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
        <div className="cnvs-docs-palette-steps">
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
