import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {token as tokenVar} from '@workday/canvas-tokens-web/token';

import {CodeBlock} from '../CodeBlock';
import {CurvePreview} from './CurvePreview';
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
    default:
      return <div data-part="size-sample" style={{width: cssVar, background: fill}} />;
  }
};

/** Breakpoint and duration tokens have nothing to preview. */
const hasPreview = (token: SDToken) =>
  token.$type !== 'duration' && !['breakpoint', 'breakpoints'].includes(token.path[0]);

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
    case 'cubicBezier':
      return <CurvePreview value={token.$value} />;
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

  return (
    <div className="example-cell">
      {!hasPreview(token) ? (
        <div data-part="no-preview" />
      ) : (
        <Card
          data-part="example"
          style={
            token.$type === 'shadow' ? {background: 'var(--cnvs-brand-neutral-a50)'} : undefined
          }
        >
          <TokenPreview token={token} level={level} />
        </Card>
      )}
      {ref && <CodeBlock>{ref}</CodeBlock>}
    </div>
  );
};
