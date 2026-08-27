#!/usr/bin/env node
import {mkdirSync, writeFileSync} from 'fs';
import {resolve} from 'path';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const DEFAULT_OUTPUT_DIR = 'figma-raw-tokens';

const {FIGMA_ACCESS_TOKEN, FIGMA_BASE_FILE_KEY, FIGMA_MAIN_FILE_KEY} = process.env;

function toOutputFileName(libraryName) {
  const normalized = libraryName.includes('Base') ? 'base' : 'tokens';
  return `${normalized || 'figma-library'}.json`;
}

async function figmaRequest(path, token, {allowFailure = false} = {}) {
  const response = await fetch(`${FIGMA_API_BASE}${path}`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof body.message === 'string'
        ? body.message
        : typeof body.err === 'string'
        ? body.err
        : `Figma API request failed with status ${response.status}`;

    if (allowFailure) {
      return {error: message, status: response.status};
    }

    throw new Error(message);
  }

  if (body.error) {
    const message = body.message || 'Figma API returned an error response';

    if (allowFailure) {
      return {error: message, status: response.status || 400};
    }

    throw new Error(message);
  }

  return body;
}

function chunk(values, size) {
  const chunks = [];

  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }

  return chunks;
}

async function fetchFile(fileKey, token) {
  const response = await figmaRequest(`/files/${fileKey}?depth=1`, token);
  return {
    name: response.name,
    lastModified: response.lastModified,
    version: response.version,
    styles: response.styles || {},
  };
}

async function fetchVariables(fileKey, token) {
  const response = await figmaRequest(`/files/${fileKey}/variables/local`, token);
  return response.meta || {};
}

async function fetchPublishedStyles(fileKey, token) {
  const response = await figmaRequest(`/files/${fileKey}/styles`, token, {
    allowFailure: true,
  });

  if (response.error) {
    return {
      styles: [],
      warning: response.error,
    };
  }

  return {
    styles: response.meta?.styles || [],
    warning: undefined,
  };
}

async function fetchStyleNodes(fileKey, token, styles) {
  const nodeIds = [...new Set(styles.map(style => style.node_id).filter(Boolean))];

  if (!nodeIds.length) {
    return {};
  }

  const nodes = {};

  for (const batch of chunk(nodeIds, 50)) {
    const ids = encodeURIComponent(batch.join(','));
    const response = await figmaRequest(`/files/${fileKey}/nodes?ids=${ids}`, token);
    Object.assign(nodes, response.nodes || {});
  }

  return nodes;
}

async function fetchStyles(fileKey, token) {
  const publishedResult = await fetchPublishedStyles(fileKey, token);
  const published = publishedResult.styles;
  const nodes = published.length > 0 ? await fetchStyleNodes(fileKey, token, published) : {};

  return {
    published,
    nodes,
    warnings: publishedResult.warning ? [publishedResult.warning] : [],
  };
}

function countStyles(stylesPayload) {
  if (Array.isArray(stylesPayload?.published) && stylesPayload.published.length > 0) {
    return stylesPayload.published.length;
  }

  return Object.keys(stylesPayload?.local || {}).length;
}

async function fetchLibrary(fileKey, token) {
  const [file, variables, styles] = await Promise.all([
    fetchFile(fileKey, token),
    fetchVariables(fileKey, token),
    fetchStyles(fileKey, token),
  ]);

  return {
    library: {
      fileKey,
      name: file.name,
      lastModified: file.lastModified,
      version: file.version,
      fetchedAt: new Date().toISOString(),
      endpoint: 'local',
    },
    meta: variables,
    styles: {
      local: file.styles,
      published: styles.published,
      nodes: styles.nodes,
      warnings: styles.warnings,
    },
  };
}

async function main() {
  const token = FIGMA_ACCESS_TOKEN || '';
  const fileKeys = [FIGMA_BASE_FILE_KEY, FIGMA_MAIN_FILE_KEY];
  const outputDirName = DEFAULT_OUTPUT_DIR;

  if (!token) {
    throw new Error('Missing Figma access token. Set FIGMA_ACCESS_TOKEN.');
  }

  if (!fileKeys.length) {
    throw new Error('Missing Figma file keys. Set FIGMA_FILE_KEYS.');
  }

  const outputDir = resolve(process.cwd(), outputDirName);
  mkdirSync(outputDir, {recursive: true});

  const usedFileNames = new Set();

  for (const fileKey of fileKeys) {
    console.log(`Fetching variables and styles for library file key: ${fileKey}`);

    const payload = await fetchLibrary(fileKey, token);
    let fileName = toOutputFileName(payload.library.name);

    if (usedFileNames.has(fileName)) {
      fileName = toOutputFileName(`${payload.library.name}-${fileKey}`);
    }

    usedFileNames.add(fileName);

    const outputPath = resolve(outputDir, fileName);
    writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

    const variableCount = Object.keys(payload.meta.variables || {}).length;
    const collectionCount = Object.keys(payload.meta.variableCollections || {}).length;
    const styleCount = countStyles(payload.styles);
    const styleNodeCount = Object.keys(payload.styles.nodes || {}).length;
    const warnings = payload.styles.warnings || [];

    console.log(
      `Saved "${payload.library.name}" (${variableCount} variables, ${collectionCount} collections, ${styleCount} styles, ${styleNodeCount} style nodes) to ${outputPath}`
    );

    for (const warning of warnings) {
      console.warn(`  Warning: ${warning}`);
    }
  }
}

main().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
