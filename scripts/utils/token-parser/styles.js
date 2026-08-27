import {rgbaToOklchColor, roundNumber, valueWithUnit} from './format.js';
import {toSlug} from './naming.js';
import {addTokenToFiles, buildToken} from './tokens.js';

function parseTypographyStyleName(styleName) {
  const parts = styleName.split('/').filter(Boolean);
  if (!parts.length) {
    return null;
  }

  const category = toSlug(parts[0]);
  const detail = parts.slice(1).join(' / ') || parts[0];
  const sizeMatch = detail.match(/\b([SML])\b/i);
  const sizeMap = {s: 'sm', m: 'md', l: 'lg'};
  const size = sizeMatch ? sizeMap[sizeMatch[1].toLowerCase()] : toSlug(detail).split('-').pop();
  const isMono = /mono/i.test(detail);
  const isLink = /link/i.test(detail);

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

function extractTextStyleValue(node) {
  const style = node?.document?.style || node?.styles?.text || node?.document;
  if (!style) {
    return undefined;
  }

  const fontSize = style.fontSize;
  const lineHeight = style.lineHeightPx ?? style.lineHeightPercentFontSize ?? style.lineHeight;
  const letterSpacing = style.letterSpacing;

  return {
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    fontSize: typeof fontSize === 'number' ? valueWithUnit(fontSize, 'px') : fontSize,
    lineHeight:
      typeof lineHeight === 'number' && lineHeight > 3
        ? valueWithUnit(lineHeight, 'px')
        : roundNumber(lineHeight),
    letterSpacing:
      typeof letterSpacing === 'number' ? valueWithUnit(letterSpacing, 'px') : letterSpacing,
    textDecoration: style.textDecoration === 'UNDERLINE' ? 'underline' : undefined,
  };
}

function extractEffectStyleValue(node) {
  const effects = node?.document?.effects || [];
  const shadows = effects
    .filter(effect => effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW')
    .map(effect => ({
      type: effect.type === 'INNER_SHADOW' ? 'innerShadow' : 'dropShadow',
      x: valueWithUnit(roundNumber(effect.offset?.x || 0), 'px'),
      y: valueWithUnit(roundNumber(effect.offset?.y || 0), 'px'),
      blur: valueWithUnit(roundNumber(effect.radius || 0), 'px'),
      spread: valueWithUnit(roundNumber(effect.spread || 0), 'px'),
      color: effect.color
        ? rgbaToOklchColor({
            r: effect.color.r,
            g: effect.color.g,
            b: effect.color.b,
            a: effect.color.a,
          })
        : undefined,
    }));

  return shadows.length ? shadows : undefined;
}

export function generateStyleTokens(payload) {
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
    const value = extractTextStyleValue(node);
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
    addTokenToFiles(files, 'system/type.json', [category, size], token);
  }

  for (const style of effectStyles) {
    const name = style.name.replace(/^Depth\s*/i, '').trim();
    const slug = toSlug(name) || toSlug(style.name);
    if (!/^\d+$/.test(slug) || /focus/i.test(style.name)) {
      continue;
    }

    const node = nodes[style.node_id];
    const value = extractEffectStyleValue(node);
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
