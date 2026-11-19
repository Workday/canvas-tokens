import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {Subtext} from '@workday/canvas-kit-react/text';

import {getTokens} from '../../util';
import type {DocsToken} from '../../util/tokens';

import './index.css';

type TestTokenScaleProps = {
  /** Token group in the docs index, e.g. `base.size` or `system.shape` */
  group: string;
  /** Only the tokens under this path prefix, e.g. `size` or `motion.easing` */
  prefix?: string;
  /** Heading of the card, defaults to the group and prefix */
  title?: string;
  /** Custom filter, applied after `prefix` */
  filter?: (token: DocsToken) => boolean;
};

const SAMPLE_TEXT = 'Canvas';
const BOX = 24;
const MAX_BREAKPOINT_REM = 136.25;

const toRem = (value: unknown) => parseFloat(String(value));

/** Cubic-bezier control points of `cubic-bezier(a, b, c, d)` */
const parseBezier = (value: string): [number, number, number, number] | undefined => {
  const match = value.match(/cubic-bezier\(([^)]+)\)/);
  const points = match?.[1].split(',').map(Number);
  return points?.length === 4 && points.every(n => !Number.isNaN(n))
    ? (points as [number, number, number, number])
    : undefined;
};

const formatValue = (value: unknown): string => {
  if (Array.isArray(value)) return value.join(', ');
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join('; ');
  }
  return String(value);
};

const Curve = ({value}: {value: string}) => {
  const points = parseBezier(value);
  if (!points) return null;
  const [x1, y1, x2, y2] = points;
  const size = 96;
  const pad = 12;
  const inner = size - pad * 2;
  const px = (x: number) => pad + x * inner;
  const py = (y: number) => size - pad - y * inner;
  return (
    <svg className="test-token-curve" viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <path
        d={`M${px(0)} ${py(0)} C${px(x1)} ${py(y1)} ${px(x2)} ${py(y2)} ${px(1)} ${py(1)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1={px(0)}
        y1={py(0)}
        x2={px(x1)}
        y2={py(y1)}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1={px(1)}
        y1={py(1)}
        x2={px(x2)}
        y2={py(y2)}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
    </svg>
  );
};

/** A static, deterministic sample of a token. Nothing here animates, so snapshots are stable. */
const Sample = ({token}: {token: DocsToken}) => {
  const value = token.$value;
  const type = token.$type;
  const [root, second] = token.path;

  if (type === 'color') {
    return <div className="test-token-box" style={{width: 64, height: 64, background: value}} />;
  }

  if (type === 'shadow') {
    return (
      <div
        className="test-token-box"
        style={{width: 96, height: 64, margin: 24, background: '#fff', boxShadow: value}}
      />
    );
  }

  if (type === 'cubicBezier') return <Curve value={value} />;

  if (type === 'duration') {
    const ms = parseFloat(value);
    return (
      <div className="test-token-box test-token-bar" style={{width: `${(ms / 1000) * 100}%`}} />
    );
  }

  if (type === 'typography') {
    return (
      <div
        style={{
          fontFamily: value.fontFamily,
          fontWeight: value.fontWeight,
          fontSize: value.fontSize,
          lineHeight: value.lineHeight,
          letterSpacing: value.letterSpacing,
        }}
      >
        {SAMPLE_TEXT}
      </div>
    );
  }

  if (type === 'fontFamily') {
    return <div style={{fontSize: '2rem', fontFamily: formatValue(value)}}>{SAMPLE_TEXT}</div>;
  }

  if (type === 'fontWeight') {
    return <div style={{fontSize: '2rem', fontWeight: value}}>{SAMPLE_TEXT}</div>;
  }

  if (type === 'number' && (root === 'opacity' || second === 'opacity')) {
    return (
      <div className="test-token-checker" style={{width: '100%', height: 64, borderRadius: 4}}>
        <div
          style={{width: '100%', height: '100%', opacity: value, background: 'var(--cnvs-sys-color-accent-info, #0875e1)'}}
        />
      </div>
    );
  }

  if (type === 'dimension' || type === 'number') {
    switch (root) {
      case 'letter-spacing':
        return (
          <div style={{fontSize: '1.5rem', letterSpacing: value}}>Canvas Tokens</div>
        );
      case 'font-size':
        return <div style={{fontSize: value, lineHeight: 1.2}}>{SAMPLE_TEXT}</div>;
      case 'line-height':
        return (
          <div className="test-token-outline" style={{lineHeight: value, width: 96}}>
            {SAMPLE_TEXT}
            <br />
            {SAMPLE_TEXT}
          </div>
        );
      case 'shape':
        return (
          <div
            className="test-token-outline"
            style={{width: 80, height: 80, borderRadius: value, borderWidth: 2}}
          />
        );
      case 'gap':
        return (
          <div style={{display: 'flex', gap: value}}>
            <div className="test-token-box" style={{width: BOX, height: BOX}} />
            <div className="test-token-box" style={{width: BOX, height: BOX}} />
          </div>
        );
      case 'padding':
        return (
          <div className="test-token-outline" style={{padding: value, borderColor: 'red'}}>
            <div className="test-token-box" style={{width: BOX, height: BOX}} />
          </div>
        );
      case 'breakpoint':
      case 'breakpoints':
        return (
          <div
            className="test-token-box test-token-bar"
            style={{width: `${(toRem(value) / MAX_BREAKPOINT_REM) * 100}%`}}
          />
        );
      default:
        // size, baseline, fontSize: a square of the token's size
        return <div className="test-token-box" style={{width: value, height: value}} />;
    }
  }

  return null;
};

/** The token's path without the group prefix, `$root` shown as `default` */
const getName = (token: DocsToken) =>
  token.path.map(part => (part === '$root' ? 'default' : part)).join('.');

/**
 * Renders every token of a non-color group as a static sample with its name and value, so a
 * build can be compared visually with the previous one. The sample is picked from the token
 * `$type` and path, so any group of `base` or `system` can be passed.
 */
export const TestTokenScale = ({group, prefix, title, filter}: TestTokenScaleProps) => {
  const tokens = getTokens(group).filter(token => {
    const inPrefix = !prefix || token.path.join('.').startsWith(`${prefix}.`);
    return inPrefix && (!filter || filter(token));
  });

  return (
    <Card data-theme="sana-canvas">
      <Card.Heading>{title ?? [group, prefix].filter(Boolean).join(' / ')}</Card.Heading>
      <div className="test-token-grid">
        {tokens.map(token => (
          <div key={token.key} className="test-token-item">
            <div className="test-token-sample">
              <Sample token={token} />
            </div>
            <div className="test-token-label">
              <Subtext size="small" style={{display: 'block', fontWeight: 600}}>
                {getName(token)}
                {token.$deprecated ? ' (deprecated)' : ''}
              </Subtext>
              <Subtext size="small" style={{display: 'block'}}>
                {formatValue(token.$value)}
              </Subtext>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
