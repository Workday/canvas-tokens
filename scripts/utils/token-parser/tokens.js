export function buildToken({value, type, description, extensions}) {
  return {
    $value: value,
    ...(type && {$type: type}),
    ...(description && {$description: description}),
    ...(extensions && Object.keys(extensions).length && {$extensions: extensions}),
  };
}

export function addTokenToFiles(files, filePath, path, token) {
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

const ROOT_KEY = '$root';

function isTokenLeaf(value) {
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
