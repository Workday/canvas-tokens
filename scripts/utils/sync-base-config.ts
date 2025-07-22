import {tokensStudioRepoParams, canvasTokensRepoParams} from './api-client';
import {ContentFile, getFileContent, updateFileContent} from './file-content';
import {generateRefs} from './generateRefs';
import {decodeJSONBufferString, encodeJSONToString} from './parse-utils';

// Format the config object into the shape expected by the consumer
function formatConfig(config: object) {
  const configKeys = Object.keys(config);
  // If the config doesn't have a top-level 'base' key, wrap the object
  if (configKeys.length !== 1 && configKeys[0] !== 'base') {
    return {base: config};
  }
  return config;
}

/**
 * Sync the Token Studio base config
 */
export async function syncBaseConfig() {
  console.log('Syncing base tokens config...');
  // Fetch base config from Canvas Tokens Studio repo
  const getTokensStudioConfig = getFileContent({
    owner: tokensStudioRepoParams.owner,
    repo: tokensStudioRepoParams.repo,
    path: tokensStudioRepoParams.baseConfigPath,
    ref: tokensStudioRepoParams.defaultBranch,
  });

  // Fetch base config from Canvas Tokens repo
  const getCanvasTokensConfig = getFileContent({
    owner: canvasTokensRepoParams.owner,
    repo: canvasTokensRepoParams.repo,
    path: canvasTokensRepoParams.baseConfigPath,
    ref: canvasTokensRepoParams.syncBranch,
  });

  const [tokenStudioConfig, canvasTokensConfig] = (await Promise.all([
    getTokensStudioConfig,
    getCanvasTokensConfig,
  ])) as ContentFile[];

  // Decode the Buffer content to a JSON object
  const parsedContent = decodeJSONBufferString(tokenStudioConfig.content);
  // Format the JSON config object
  const formattedConfig = formatConfig(parsedContent);
  // Re-encode the formatted JSON object to a Buffer string
  const encodedConfig = encodeJSONToString(formattedConfig);

  generateRefs(formattedConfig);

  // Sync Canvas Tokens config file with the updated config
  updateFileContent({
    owner: canvasTokensRepoParams.owner,
    repo: canvasTokensRepoParams.repo,
    path: canvasTokensRepoParams.baseConfigPath,
    branch: canvasTokensRepoParams.syncBranch,
    message: 'chore(web): Sync base tokens config',
    // If this is a new file, there will be no existing sha to reference.
    sha: canvasTokensConfig ? canvasTokensConfig.sha : undefined,
    content: encodedConfig,
  });
}
