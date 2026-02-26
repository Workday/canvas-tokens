/**
 * Builds a flat map of system.color token paths to their `comment` (use case) from sys.json.
 * Keys match JS variable names, e.g. "system.color.bg.default".
 */
// Intentional cross-package import of token source for use-case comments
import sysJson from '../../canvas-tokens/tokens/web/sys.json';

function extractComments(obj: unknown, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return result;
  const record = obj as Record<string, unknown>;
  for (const [key, value] of Object.entries(record)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const v = value as Record<string, unknown>;
      if ('comment' in v && typeof v.comment === 'string') {
        result[path] = v.comment;
      }
      Object.assign(result, extractComments(value, path));
    }
  }
  return result;
}

const sys = (sysJson as {sys: Record<string, unknown>}).sys;

const colorComments = extractComments(sys.color);
export const systemColorCommentMap: Record<string, string> = {};
for (const [path, comment] of Object.entries(colorComments)) {
  systemColorCommentMap[`system.color.${path}`] = comment;
}

const shapeComments = extractComments(sys.shape);
export const systemShapeCommentMap: Record<string, string> = {};
for (const [path, comment] of Object.entries(shapeComments)) {
  systemShapeCommentMap[`system.shape.${path}`] = comment;
}

/** Comment map for system.size, system.padding, system.gap (used by Space docs) */
export const systemSpaceCommentMap: Record<string, string> = {};
for (const [path, comment] of Object.entries(extractComments(sys.size))) {
  systemSpaceCommentMap[`system.size.${path}`] = comment;
}
for (const [path, comment] of Object.entries(extractComments(sys.padding))) {
  systemSpaceCommentMap[`system.padding.${path}`] = comment;
}
for (const [path, comment] of Object.entries(extractComments(sys.gap))) {
  systemSpaceCommentMap[`system.gap.${path}`] = comment;
}
