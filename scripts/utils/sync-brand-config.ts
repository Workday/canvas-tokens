import {tokensStudioRepoParams, canvasTokensRepoParams} from './api-client';
import {ContentFile, getFileContent, updateFileContent} from './file-content';
import {decodeJSONBufferString, encodeJSONToString} from './parse-utils';

// Format the config object into the shape expected by the consumer
function formatConfig(config: object) {
  const configKeys = Object.keys(config);
  // If the config doesn't have a top-level 'brand' key, wrap the object
  if (configKeys.length !== 1 && configKeys[0] !== 'brand') {
    return {brand: config};
  }
  return config;
}

/**
 * Sync the Token Studio brand config
 */
export async function syncBrandConfig() {
  console.log('Syncing brand tokens config...');
  // Fetch brand config from Canvas Tokens Studio repo
  const getTokenStudioConfig = getFileContent({
    owner: tokensStudioRepoParams.owner,
    repo: tokensStudioRepoParams.repo,
    path: tokensStudioRepoParams.brandConfigPath,
    ref: tokensStudioRepoParams.defaultBranch,
  });

  // Fetch brand config from Canvas Tokens repo
  const getCanvasTokensConfig = getFileContent({
    owner: canvasTokensRepoParams.owner,
    repo: canvasTokensRepoParams.repo,
    path: canvasTokensRepoParams.brandConfigPath,
    ref: canvasTokensRepoParams.syncBranch,
  });

  const [tokenStudioConfig, canvasTokensConfig] = (await Promise.all([
    getTokenStudioConfig,
    getCanvasTokensConfig,
  ])) as ContentFile[];

  // Decode the Buffer content to a JSON object
  const parsedContent = decodeJSONBufferString(tokenStudioConfig.content);
  // Format the JSON config object
  const formattedConfig = formatConfig(parsedContent);
  // Re-encode the formatted JSON object to a Buffer string
  const encodedConfig = encodeJSONToString(formattedConfig);

  // Sync Canvas Tokens config file with the updated config
  updateFileContent({
    owner: canvasTokensRepoParams.owner,
    repo: canvasTokensRepoParams.repo,
    path: canvasTokensRepoParams.brandConfigPath,
    branch: canvasTokensRepoParams.syncBranch,
    message: 'chore(web): Sync brand tokens config',
    // If this is a new file, there will be no existing sha to reference.
    sha: canvasTokensConfig ? canvasTokensConfig.sha : undefined,
    content: encodedConfig,
  });
}
