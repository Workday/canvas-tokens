#!/usr/bin/env node
import fs from 'fs';
import {resolve} from 'path';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const DEFAULT_OUTPUT_DIR = 'figma-raw-tokens';
const SKIP_STYLE_TYPES = ['FILL', 'GRID'];

const {FIGMA_ACCESS_TOKEN, FIGMA_BASE_FILE_KEY, FIGMA_MAIN_FILE_KEY} = process.env;

function warn(message) {
  console.warn(`Warning: ${message}`);
}

/**
 * Makes a request to the Figma API.
 * @param {string} path - The path to the Figma API.
 * @param {string} token - The Figma access token.
 * @returns {Promise<Object>} The response from the Figma API.
 */
async function figmaRequest(path, token) {
  try {
    const response = await fetch(`${FIGMA_API_BASE}${path}`, {
      headers: {'X-Figma-Token': token},
    });

    const body = await response.json();

    if (!response.ok || body.error) {
      const message =
        typeof body.message === 'string'
          ? body.message
          : typeof body.err === 'string'
          ? body.err
          : `Figma API request failed with status ${response.status}`;

      throw new Error(message);
    }

    return body;
  } catch (error) {
    return {error: error.message};
  }
}

/**
 * Fetches the variables from the Figma API.
 * @param {string} fileKey - The key of the file to fetch.
 * @param {string} token - The Figma access token.
 * @returns {Promise<Object>} The variables from the Figma API.
 */
async function fetchVariables(fileKey, token) {
  try {
    const response = await figmaRequest(`/files/${fileKey}/variables/local`, token);

    if (response.error || !response.meta) {
      warn(`Variables fetch failed: ${response.error || 'No metadata returned'}`);
      return {meta: {}};
    }

    return {meta: response.meta};
  } catch (error) {
    console.error(`Error fetching variables: ${error.message}`);
    return {meta: {}};
  }
}

/**
 * Fetches the published styles from the Figma API.
 * @param {string} fileKey - The key of the file to fetch.
 * @param {string} token - The Figma access token.
 * @returns {Promise<Object>} The published styles from the Figma API.
 */
async function fetchPublishedStyles(fileKey, token) {
  try {
    const response = await figmaRequest(`/files/${fileKey}/styles`, token);

    if (response.error || !Array.isArray(response.meta?.styles)) {
      warn(`Published styles fetch failed: ${response.error || 'No styles metadata returned'}`);
      return {styles: []};
    }

    const styles = response.meta.styles.filter(
      style =>
        !/more styles/i.test(style.name || '') && !SKIP_STYLE_TYPES.includes(style.style_type)
    );

    return {styles};
  } catch (error) {
    console.error(`Error fetching published styles: ${error.message}`);
    return {styles: []};
  }
}

/**
 * Fetches the style nodes from the Figma API.
 * @param {string} fileKey - The key of the file to fetch.
 * @param {string} token - The Figma access token.
 * @param {Array} styles - The styles to fetch.
 * @returns {Promise<Object>} The style nodes from the Figma API.
 */
async function fetchStyleNodes(fileKey, token, styles) {
  try {
    const nodeIds = [...new Set(styles.map(style => style.node_id).filter(Boolean))];
    const ids = encodeURIComponent(nodeIds.join(','));
    const response = nodeIds.length
      ? await figmaRequest(`/files/${fileKey}/nodes?ids=${ids}`, token)
      : {};

    if (response.error) {
      warn(`Style nodes fetch failed: ${response.error}`);
      return {nodes: {}, file: {}};
    }

    const nodes = response.nodes || {};

    return {
      file: {
        name: response.name,
        lastModified: response.lastModified,
        version: response.version,
      },
      nodes,
    };
  } catch (error) {
    console.error(`Error fetching style nodes: ${error.message}`);
    return {nodes: {}, file: {}};
  }
}

/**
 * Fetches the styles from the Figma API.
 * @param {string} fileKey - The key of the file to fetch.
 * @param {string} token - The Figma access token.
 * @returns {Promise<Object>} The styles from the Figma API.
 */
async function fetchStyles(fileKey, token) {
  try {
    const published = await fetchPublishedStyles(fileKey, token);
    const nodeResult = await fetchStyleNodes(fileKey, token, published.styles);

    return {
      published: published.styles,
      nodes: nodeResult.nodes,
      file: nodeResult.file,
    };
  } catch (error) {
    console.error(`Error fetching styles: ${error.message}`);
    return {};
  }
}

/**
 * Fetches the library from the Figma API.
 * @param {string} fileKey - The key of the file to fetch.
 * @param {string} token - The Figma access token.
 * @returns {Promise<Object>} The library from the Figma API.
 */
async function fetchLibrary(fileKey, token) {
  const variables = await fetchVariables(fileKey, token);
  const styles = await fetchStyles(fileKey, token);
  const name = fileKey === FIGMA_BASE_FILE_KEY ? 'Base' : 'Tokens';

  const published = styles.published || [];
  const nodes = styles.nodes || {};
  const lastModified = styles.file?.lastModified || '';

  return {
    library: {
      name,
      lastModified,
      fetchedAt: new Date().toISOString(),
    },
    meta: variables.meta,
    styles: {published, nodes},
  };
}

async function main() {
  if (!FIGMA_ACCESS_TOKEN || !FIGMA_BASE_FILE_KEY || !FIGMA_MAIN_FILE_KEY) {
    throw new Error(
      'Missing Figma access token or file keys. Set FIGMA_ACCESS_TOKEN, FIGMA_BASE_FILE_KEY, and FIGMA_MAIN_FILE_KEY.'
    );
  }

  const token = FIGMA_ACCESS_TOKEN || '';
  const fileKeys = [FIGMA_BASE_FILE_KEY, FIGMA_MAIN_FILE_KEY];
  const outputDirName = DEFAULT_OUTPUT_DIR;

  const outputDir = resolve(process.cwd(), outputDirName);
  fs.mkdirSync(outputDir, {recursive: true});

  for (const fileKey of fileKeys) {
    console.log(`Fetching variables and styles for library file key: ${fileKey}`);

    const payload = await fetchLibrary(fileKey, token);
    const fileName = `${payload.library.name.toLowerCase()}.json`;
    const outputPath = resolve(outputDir, fileName);
    fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  }
}

main().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
