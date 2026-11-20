import React from 'react';
import {TertiaryButton} from '@workday/canvas-kit-react/button';
import {pauseIcon, playIcon} from '@workday/canvas-system-icons-web';

type Bezier = [number, number, number, number];

// Holds the finished curve briefly before it resets, so the landing is visible.
const END_HOLD_MS = 900;
// Without a rest at the start, steep curves leave the origin in one frame and the dot is never seen.
const DOT_MOTION_DELAY_MS = 400;
// Keyframe count for the dot, which needs the easing applied twice (see `dotKeyframes`).
const DOT_SAMPLES = 60;
const DURATION_MS = 600;
const SIZE = 100;
const DOT_RADIUS = 4;
// Padding keeps the dot and strokes from clipping at the viewBox edge.
const PADDING = 8;
const CLIP_WIDTH = SIZE + PADDING * 2;
const VIEWBOX_SIZE = SIZE + PADDING * 2;

function bezierPoint(t: number, p1: number, p2: number) {
  const u = 1 - t;
  return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t;
}

// Same math as CSS `cubic-bezier()`: solve x(t) = x by bisection, return y(t).
function bezierEase([x1, y1, x2, y2]: Bezier, x: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bezierPoint(mid, x1, x2) < x) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return bezierPoint((lo + hi) / 2, y1, y2);
}

// The dot rides the curve at eased speed: x = ease(t), y = curve(x). WAAPI can't chain two
// easings, so sample the motion as linear keyframes.
function dotKeyframes(
  bezier: Bezier,
  startOffset: number,
  endOffset: number,
  axis: 'time' | 'progress'
) {
  const frames: Keyframe[] = [];
  for (let i = 0; i <= DOT_SAMPLES; i++) {
    const progress = bezierEase(bezier, i / DOT_SAMPLES);
    const value = axis === 'time' ? progress * SIZE : -bezierEase(bezier, progress) * SIZE;
    frames.push({
      transform: axis === 'time' ? `translateX(${value}px)` : `translateY(${value}px)`,
      offset: startOffset + (i / DOT_SAMPLES) * (endOffset - startOffset),
      easing: 'linear',
    });
  }
  return [{...frames[0], offset: 0}, ...frames, {...frames[frames.length - 1], offset: 1}];
}

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reducedMotion;
};

export const CurvePreview = ({value}: {value: unknown}) => {
  // System easing aliases a base token, so read the points from the resolved `cubic-bezier()` value
  const [x1, y1, x2, y2] = (String(value).match(/-?[\d.]+/g) ?? [0, 0, 1, 1]).map(Number);
  const clipId = `easing-clip-${React.useId().replace(/:/g, '')}`;
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = React.useState(false);

  const dotTimeRef = React.useRef<SVGGElement>(null);
  const dotProgressRef = React.useRef<SVGCircleElement>(null);
  const clipRef = React.useRef<SVGRectElement>(null);
  const animationsRef = React.useRef<Animation[]>([]);

  // Animations are created on play and cancelled when done, so the curve rests fully drawn.
  const createAnimations = () => {
    const bezier: Bezier = [x1, y1, x2, y2];
    // WAAPI easing strings can't use var(), so use the resolved numbers.
    const curve = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
    const total = DOT_MOTION_DELAY_MS + DURATION_MS + END_HOLD_MS;
    const startOffset = DOT_MOTION_DELAY_MS / total;
    const endOffset = (DOT_MOTION_DELAY_MS + DURATION_MS) / total;
    const timing: KeyframeAnimationOptions = {duration: total};

    return [
      dotTimeRef.current?.animate(dotKeyframes(bezier, startOffset, endOffset, 'time'), timing),
      dotProgressRef.current?.animate(
        dotKeyframes(bezier, startOffset, endOffset, 'progress'),
        timing
      ),
      // The clip extends PADDING past both curve ends so the round caps aren't sliced flat. The scale
      // maps the clip's right edge to the dot's x, then opens fully once the dot lands. It stays
      // closed during the lead so a steep start doesn't show a sliver of trail before the dot moves.
      clipRef.current?.animate(
        [
          {transform: 'scaleX(0)', offset: 0},
          {transform: 'scaleX(0)', offset: startOffset},
          {transform: `scaleX(${PADDING / CLIP_WIDTH})`, offset: startOffset, easing: curve},
          {transform: `scaleX(${(SIZE + PADDING) / CLIP_WIDTH})`, offset: endOffset},
          {transform: 'scaleX(1)', offset: endOffset},
          {transform: 'scaleX(1)', offset: 1},
        ],
        timing
      ),
    ].filter((animation): animation is Animation => animation != null);
  };

  const resetAnimations = () => {
    animationsRef.current.forEach(animation => animation.cancel());
    animationsRef.current = [];
    setPlaying(false);
  };

  React.useEffect(() => resetAnimations, [x1, y1, x2, y2, reducedMotion]);

  const togglePlaying = () => {
    if (playing) {
      animationsRef.current.forEach(animation => animation.pause());
    } else if (animationsRef.current.length) {
      animationsRef.current.forEach(animation => animation.play());
    } else {
      const animations = createAnimations();
      animationsRef.current = animations;
      // `finished` rejects when a reset cancels the animations first, which needs no handling.
      Promise.all(animations.map(animation => animation.finished)).then(resetAnimations, () => {});
    }
    setPlaying(!playing);
  };

  const path = `M0,${SIZE} C${x1 * SIZE},${SIZE - y1 * SIZE} ${x2 * SIZE},${
    SIZE - y2 * SIZE
  } ${SIZE},0`;

  return (
    <>
      {!reducedMotion && (
        <TertiaryButton
          data-part="play-button"
          size="small"
          icon={playing ? pauseIcon : playIcon}
          aria-label={playing ? 'Pause animation' : 'Play animation'}
          onClick={togglePlaying}
        />
      )}
      <div data-part="curve-sample">
        <svg
          viewBox={`${-PADDING} ${-PADDING} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          aria-hidden="true"
          overflow="visible"
        >
          <defs>
            <clipPath id={clipId}>
              <rect
                ref={clipRef}
                data-part="curve-clip"
                x={-PADDING}
                y={-PADDING}
                width={CLIP_WIDTH}
                height={VIEWBOX_SIZE}
              />
            </clipPath>
          </defs>
          <path d={path} data-part="curve-track" />
          <path d={path} data-part="curve-stroke" clipPath={`url(#${clipId})`} />
          <g ref={dotTimeRef}>
            <circle ref={dotProgressRef} data-part="curve-dot" cx={0} cy={SIZE} r={DOT_RADIUS} />
          </g>
        </svg>
      </div>
    </>
  );
};
