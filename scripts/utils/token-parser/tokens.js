export function buildToken({value, type, description, extensions}) {
  return {
    $value: value,
    ...(type && {$type: type}),
    ...(description && {$description: description}),
    ...(extensions && Object.keys(extensions).length && {$extensions: extensions}),
  };
}

const WRAPPED_FILE_NAMES = new Set([
  'size',
  'opacity',
  'shadow',
  'depth',
  'breakpoint',
  'shape',
  'gap',
  'padding',
]);

export function getFileWrapperKey(filePath) {
  const fileName = filePath.replace(/\.json$/, '').split('/').at(-1);

  if (WRAPPED_FILE_NAMES.has(fileName)) {
    return fileName;
  }

  if (filePath.startsWith('system/color/') && filePath.endsWith('.json')) {
    return fileName;
  }

  return undefined;
}

export function getBrandTokenPath(filePath, path) {
  const relative = filePath.replace(/^brand\//, '').replace(/\.json$/, '');

  return ['brand', ...relative.split('/'), ...path];
}

export function getTokenPath(filePath, path) {
  if (filePath.startsWith('brand/')) {
    return getBrandTokenPath(filePath, path);
  }

  if (filePath.startsWith('system/color/') && filePath.endsWith('.json')) {
    const fileName = filePath.replace(/\.json$/, '').split('/').at(-1);
    return ['color', fileName, ...path];
  }

  const wrapperKey = getFileWrapperKey(filePath);
  return wrapperKey ? [wrapperKey, ...path] : path;
}

export function addTokenToFiles(files, filePath, path, token) {
  if (!files.has(filePath)) {
    files.set(filePath, {});
  }

  const resolvedPath = getTokenPath(filePath, path);

  const node = resolvedPath.slice(0, -1).reduce((cursor, key) => {
    if (!cursor[key] || cursor[key].$value) {
      cursor[key] = {};
    }
    return cursor[key];
  }, files.get(filePath));

  node[resolvedPath.at(-1)] = token;
}

const ROOT_KEY = '$root';

export function isTokenLeaf(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value) && value.$value);
}

function isGroupKey(key) {
  return !key.startsWith('$');
}

function promoteDefaultToRoot(node) {
  if (!Object.hasOwn(node, 'default') || Object.hasOwn(node, ROOT_KEY)) {
    return;
  }

  const groupKeys = Object.keys(node).filter(isGroupKey);
  if (groupKeys.length < 2) {
    return;
  }

  const reordered = {[ROOT_KEY]: node.default};
  for (const [key, value] of Object.entries(node)) {
    if (key !== 'default') {
      reordered[key] = value;
    }
  }

  for (const key of Object.keys(node)) {
    delete node[key];
  }

  Object.assign(node, reordered);
}

export function nestDashedVariants(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node) || node.$value) {
    return node;
  }

  for (const value of Object.values(node)) {
    nestDashedVariants(value);
  }

  const dashedByPrefix = new Map();

  for (const key of Object.keys(node)) {
    if (!isTokenLeaf(node[key])) {
      continue;
    }

    const separator = key.lastIndexOf('-');
    if (separator <= 0) {
      continue;
    }

    const prefix = key.slice(0, separator);
    const suffix = key.slice(separator + 1);
    if (!prefix || !suffix) {
      continue;
    }

    if (!dashedByPrefix.has(prefix)) {
      dashedByPrefix.set(prefix, []);
    }
    dashedByPrefix.get(prefix).push({key, suffix});
  }

  for (const [prefix, variants] of dashedByPrefix) {
    const hasBase = Object.hasOwn(node, prefix);
    if (!hasBase && variants.length < 2) {
      continue;
    }

    const group = isTokenLeaf(node[prefix]) || !hasBase ? {} : node[prefix];
    if (isTokenLeaf(node[prefix])) {
      group[ROOT_KEY] = node[prefix];
    }

    for (const {key, suffix} of variants) {
      group[suffix] = node[key];
      delete node[key];
    }

    node[prefix] = group;
  }

  promoteDefaultToRoot(node);

  return node;
}

function collectLeaves(node, prefix = []) {
  if (isTokenLeaf(node)) {
    return [{path: prefix, token: node}];
  }

  if (node && typeof node === 'object' && !Array.isArray(node)) {
    return Object.entries(node).flatMap(([key, value]) => collectLeaves(value, [...prefix, key]));
  }

  return [];
}

function getAtPath(node, path) {
  return path.reduce(
    (cursor, key) => (cursor && typeof cursor === 'object' ? cursor[key] : undefined),
    node
  );
}

function setAtPath(files, filePath, path, token) {
  if (!files.has(filePath)) {
    files.set(filePath, {});
  }

  const node = path.slice(0, -1).reduce((cursor, key) => {
    if (!cursor[key] || cursor[key].$value) {
      cursor[key] = {};
    }
    return cursor[key];
  }, files.get(filePath));

  node[path.at(-1)] = token;
}

/**
 * Diffs a previous generation's output against the newly generated output.
 * Any token leaf that existed before but is no longer produced is re-inserted
 * at its original file path with `$deprecated: true`, instead of being
 * dropped. A token that reappears in a later generation is written fresh by
 * the normal pipeline and naturally loses the flag.
 *
 * `removedPaths` (Map<filePath, Set<dotted path>>) identifies leaves that are
 * intentionally excluded (e.g. Figma variables marked hidden from
 * publishing) rather than genuinely gone from the source; those are dropped
 * for good instead of being resurrected as deprecated.
 *
 * Mutates and returns `nextFiles`.
 */
export function markDeprecatedTokens(
  previousFiles,
  nextFiles,
  {ignoreDarkMode = false, removedPaths} = {}
) {
  for (const [filePath, previousContent] of previousFiles) {
    if (ignoreDarkMode && filePath.startsWith('brand/dark/')) {
      continue;
    }

    const nextContent = nextFiles.get(filePath);
    const removedFilePaths = removedPaths?.get(filePath);

    for (const {path, token} of collectLeaves(previousContent)) {
      if (ignoreDarkMode && path[0] === 'dark') {
        continue;
      }

      if (removedFilePaths?.has(path.join('.'))) {
        continue;
      }

      const nextLeaf = nextContent && getAtPath(nextContent, path);

      if (!isTokenLeaf(nextLeaf)) {
        setAtPath(nextFiles, filePath, path, {...token, $deprecated: true});
      }
    }
  }

  return nextFiles;
}
