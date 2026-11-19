import React from 'react';
import {TertiaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {playIcon, xIcon} from '@workday/canvas-system-icons-web';
import {token as tokenVar} from '@workday/canvas-tokens-web/token';

import {CodeBlock} from '../CodeBlock';
import {cleanRef, getCssVar, getTypeClass} from './tokenNames';
import {SDToken, TokenLevel} from './types';

/** CSS variable of a system token, typed as a plain string for use in styles. */
const cssToken = (name: string) => tokenVar(name as any) as unknown as string;

const fill = cssToken('color.accent.info');

const TextSample = ({style, className}: {style?: React.CSSProperties; className?: string}) => (
  <span data-part="text-sample" style={style} className={className}>
    Aa
  </span>
);

const DimensionPreview = ({group, cssVar}: {group: string; cssVar: string}) => {
  switch (group) {
    case 'letter-spacing':
      return <TextSample style={{letterSpacing: cssVar}} />;
    case 'fontSize':
    case 'font-size':
      return <TextSample style={{fontSize: cssVar}} />;
    case 'line-height':
      return (
        <span data-part="text-sample" style={{lineHeight: cssVar, fontSize: '1rem'}}>
          Aa
          <br />
          Aa
        </span>
      );
    case 'shape':
      return (
        <div
          data-part="shape-sample"
          style={{
            borderRadius: cssVar,
            background: `color-mix(in srgb, ${fill} 30%, transparent)`,
          }}
        >
          <div data-part="shape-corner" style={{borderRadius: `calc(${cssVar} + 4px)`}} />
        </div>
      );
    case 'padding':
      return (
        <div
          data-part="padding-sample"
          style={{paddingInline: cssVar, borderColor: cssToken('color.fg.default')}}
        >
          <div style={{background: fill}} />
        </div>
      );
    case 'gap':
      return (
        <div data-part="gap-sample" style={{gap: cssVar}}>
          <div style={{background: fill}} />
          <div style={{background: fill}} />
        </div>
      );
    case 'breakpoint':
    case 'breakpoints':
      return <SystemIcon icon={xIcon} />;
    default:
      return <div data-part="size-sample" style={{width: cssVar, background: fill}} />;
  }
};

const CurvePreview = ({value, cssVar}: {value: string; cssVar: string}) => {
  // System easing aliases a base token, so read the points from the resolved `cubic-bezier()` value
  const [x1, y1, x2, y2] = (String(value).match(/-?[\d.]+/g) ?? [0, 0, 1, 1]).map(
    n => Number(n) * 100
  );

  return (
    <div data-part="curve-sample">
      <svg viewBox="0 0 100 100" aria-hidden="true" overflow="visible">
        <line x1="0" y1="100" x2="100" y2="0" data-part="curve-linear" />
        <path
          d={`M0 100 C${x1} ${100 - y1} ${x2} ${100 - y2} 100 0`}
          fill="none"
          stroke={fill}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div data-part="curve-x">
        <div data-part="curve-y" style={{animationTimingFunction: cssVar, background: fill}} />
      </div>
    </div>
  );
};

const TokenPreview = ({token, level}: {token: SDToken; level?: TokenLevel}) => {
  const cssVar = getCssVar(token, level);
  const [group] = token.path;

  switch (token.$type) {
    case 'dimension':
      return <DimensionPreview group={group} cssVar={cssVar} />;
    case 'number':
      return group === 'letter-spacing' ? (
        <TextSample style={{letterSpacing: cssVar}} />
      ) : (
        <div data-part="opacity-sample">
          <div data-part="opacity-overlay" style={{opacity: cssVar, background: fill}} />
        </div>
      );
    case 'shadow':
      return (
        <div data-part="shadow-sample">
          <div data-part="shadow-base" />
          <div data-part="shadow-raised" style={{boxShadow: cssVar}} />
        </div>
      );
    case 'typography':
      return <TextSample className={getTypeClass(token)} />;
    case 'duration':
      return (
        <div data-part="duration-sample">
          <div style={{animationDuration: cssVar, background: fill}} />
        </div>
      );
    case 'cubicBezier':
      return <CurvePreview value={token.$value} cssVar={cssVar} />;
    case 'fontWeight':
      return <TextSample style={{fontWeight: cssVar}} />;
    case 'fontFamily':
      return <TextSample style={{fontFamily: cssVar}} />;
    default:
      return null;
  }
};

/** Preview of a non-color token, rendered from the token's own CSS variable. */
export const ExampleCell = ({token, level}: {token: SDToken; level?: TokenLevel}) => {
  // Tokens that alias a single token list their reference, like color swatches do
  const ref = cleanRef(token.original.$value);
  const isMotion = token.$type === 'duration' || token.$type === 'cubicBezier';
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className="example-cell">
      <Card
        data-part="example"
        style={token.$type === 'shadow' ? {background: 'var(--cnvs-brand-neutral-a50)'} : undefined}
      >
        {isMotion && (
          <TertiaryButton
            data-part="play-button"
            size="small"
            icon={playIcon}
            aria-label="Play animation"
            disabled={playing}
            onClick={() => setPlaying(true)}
          />
        )}
        <div
          data-part="preview"
          data-playing={playing}
          onAnimationEnd={() => setPlaying(false)}
        >
          <TokenPreview token={token} level={level} />
        </div>
      </Card>
      {ref && <CodeBlock>{ref}</CodeBlock>}
    </div>
  );
};
