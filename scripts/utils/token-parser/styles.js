import {rgbaToOklchColor, roundNumber, valueWithUnit} from './format.js';
import {toSlug} from './naming.js';
import {addTokenToFiles, buildToken} from './tokens.js';

const TYPOGRAPHY_STYLE_CATEGORIES = new Set(['subtext', 'body', 'heading', 'title']);
const TYPOGRAPHY_BOUND_KEYS = [
  'fontFamily',
  'fontWeight',
  'fontSize',
  'lineHeight',
  'letterSpacing',
];

function getBoundVariableAlias(boundVariables, boundKey) {
  const bound = boundVariables?.[boundKey];
  return Array.isArray(bound) ? bound[0] : bound;
}

function resolveDocumentBoundVariable(context, boundVariables, boundKey) {
  const alias = getBoundVariableAlias(boundVariables, boundKey);
  if (alias?.type !== 'VARIABLE_ALIAS' || !context) {
    return undefined;
  }

  return context.resolveStyleBoundVariable(alias.id);
}

function extractTypographyStyleValue(node, context) {
  const boundVariables = node?.document?.boundVariables;
  if (!boundVariables) {
    return undefined;
  }

  const value = Object.fromEntries(
    TYPOGRAPHY_BOUND_KEYS.map(key => [key, resolveDocumentBoundVariable(context, boundVariables, key)])
  );

  return TYPOGRAPHY_BOUND_KEYS.every(key => value[key]) ? value : undefined;
}

function parseTypographyStyleName(styleName) {
  const parts = styleName.split('/').filter(Boolean);
  if (!parts.length) {
    return null;
  }

  if (/^more styles$/i.test(parts[0].trim())) {
    return null;
  }

  const category = toSlug(parts[0]);
  const detail = parts.slice(1).join(' / ') || parts[0];
  const sizeMatch = detail.match(/\b([SML])\b/i);
  const sizeMap = {s: 'sm', m: 'md', l: 'lg'};
  const size = sizeMatch ? sizeMap[sizeMatch[1].toLowerCase()] : toSlug(detail).split('-').pop();
  const isMono = /mono/i.test(detail);
  const isLink = /link/i.test(detail);

  if (!TYPOGRAPHY_STYLE_CATEGORIES.has(category) || isMono || isLink) {
    return null;
  }

  return {category, size, isMono, isLink, detail};
}

function scoreTypographyStyle(style) {
  const parsed = parseTypographyStyleName(style.name);
  if (!parsed) {
    return -1;
  }

  let score = 0;
  if (!parsed.isMono) score += 4;
  if (!parsed.isLink) score += 2;
  return score;
}

function resolveEffectField(context, effect, boundKey, literalValue) {
  const bound = effect.boundVariables?.[boundKey];
  if (bound?.type === 'VARIABLE_ALIAS' && context) {
    const reference = context.resolveBoundVariable(bound.id);
    if (reference) {
      return reference;
    }
  }

  return literalValue;
}

function extractEffectStyleValue(node, context) {
  const effects = node?.document?.effects || [];
  const shadows = effects
    .filter(effect => effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW')
    .map(effect => ({
      type: effect.type === 'INNER_SHADOW' ? 'innerShadow' : 'dropShadow',
      x: resolveEffectField(
        context,
        effect,
        'offsetX',
        valueWithUnit(roundNumber(effect.offset?.x || 0), 'px')
      ),
      y: resolveEffectField(
        context,
        effect,
        'offsetY',
        valueWithUnit(roundNumber(effect.offset?.y || 0), 'px')
      ),
      blur: resolveEffectField(
        context,
        effect,
        'radius',
        valueWithUnit(roundNumber(effect.radius || 0), 'px')
      ),
      spread: resolveEffectField(
        context,
        effect,
        'spread',
        valueWithUnit(roundNumber(effect.spread || 0), 'px')
      ),
      color: resolveEffectField(
        context,
        effect,
        'color',
        effect.color
          ? rgbaToOklchColor({
              r: effect.color.r,
              g: effect.color.g,
              b: effect.color.b,
              a: effect.color.a,
            })
          : undefined
      ),
    }));

  return shadows.length ? shadows : undefined;
}

export function generateStyleTokens(payload, context) {
  const files = new Map();
  const styles = payload.styles?.published || [];
  const nodes = payload.styles?.nodes || {};
  const textStyles = styles.filter(style => style.style_type === 'TEXT');
  const effectStyles = styles.filter(style => style.style_type === 'EFFECT');

  const bestTextStyles = new Map();
  for (const style of textStyles.sort(
    (left, right) => scoreTypographyStyle(right) - scoreTypographyStyle(left)
  )) {
    const parsed = parseTypographyStyleName(style.name);
    if (!parsed) {
      continue;
    }

    const key = `${parsed.category}.${parsed.size}`;
    if (bestTextStyles.has(key)) {
      continue;
    }

    const node = nodes[style.node_id];
    const value = extractTypographyStyleValue(node, context);
    if (!value) {
      continue;
    }

    bestTextStyles.set(
      key,
      buildToken({
        value,
        type: 'typography',
        description: style.description || undefined,
      })
    );
  }

  for (const [key, token] of bestTextStyles) {
    const [category, size] = key.split('.');
    addTokenToFiles(files, 'system/type.json', ['type', category, size], token);
  }

  for (const style of effectStyles) {
    const name = style.name.replace(/^Depth\s*/i, '').trim();
    const slug = toSlug(name) || toSlug(style.name);
    if (!/^\d+$/.test(slug) || /focus/i.test(style.name)) {
      continue;
    }

    const node = nodes[style.node_id];
    const value = extractEffectStyleValue(node, context);
    if (!value) {
      continue;
    }

    addTokenToFiles(
      files,
      'system/depth.json',
      [slug],
      buildToken({
        value,
        type: 'shadow',
        description: style.description || undefined,
      })
    );
  }

  return files;
}
