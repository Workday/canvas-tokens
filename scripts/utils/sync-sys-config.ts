import {tokensStudioRepoParams, canvasTokensRepoParams} from './api-client';
import {ContentFile, getFileContent, updateFileContent} from './file-content';
import {decodeJSONBufferString, encodeJSONToString} from './parse-utils';

/**
 *  Fetch Token Studio system tokens config from canvas-tokens-studio repo
 */
async function fetchSystemTokens(path: string) {
  return await getFileContent({
    owner: tokensStudioRepoParams.owner,
    repo: tokensStudioRepoParams.repo,
    path,
    ref: tokensStudioRepoParams.defaultBranch,
  });
}

// These tokens are mobile-specific and should be filtered from the web config
const mobileOnlyTokens = {
  shape: ['x4', 'x6'],
  space: ['half', 'x5', 'x14'],
};

/**
 * Filter out mobile-specific tokens from web token config
 */
function filterMobileTokens(config: Record<string, object>) {
  // Iterate over the keys in the token config object (shape, space, etc)
  for (const key in config) {
    const tokenSet = config[key as keyof typeof config];
    // If the key is in the mobile-only tokens, iterate over its tokens
    if (key in mobileOnlyTokens) {
      for (const token in tokenSet) {
        const mobileTokenSet = mobileOnlyTokens[key as keyof typeof mobileOnlyTokens];
        // If the token is mobile-specific, delete it from the config object
        if (mobileTokenSet.includes(token)) {
          delete config[key][token as keyof typeof tokenSet];
        }
      }
    }
  }
  // return the filtered config object
  return config;
}

/**
 * Format the config object into the shape expected by the consumer
 */
function formatConfig(config: object) {
  const configKeys = Object.keys(config);
  // If the config doesn't have a top-level 'sys' key, wrap the object
  if (configKeys.length !== 1 && configKeys[0] !== 'sys') {
    return {sys: config};
  }
  return config;
}

/**
 * Sync the Token Studio system config
 */
export async function syncSystemConfig() {
  console.log('Syncing system tokens config...');
  // Fetch the contents for each file
  const fileContents = await Promise.all(
    tokensStudioRepoParams.sysConfigPaths.map(async path => {
      // Casting fileData as ContentFile because all the paths are files, not directories.
      const fileData = (await fetchSystemTokens(path)) as ContentFile;
      // Decode the Buffer file content to a JSON object
      return decodeJSONBufferString(fileData.content);
    })
  );
  // Merge the configs into a single object
  const mergedConfigs = fileContents.reduce((acc, item) => ({...acc, ...item}), {});
  // Filter mobile-specific tokens
  const filteredConfig = filterMobileTokens(mergedConfigs);
  // Format the JSON config object
  const formattedConfig = formatConfig(filteredConfig);
  // Re-encode the formatted JSON object to a Buffer string
  const encodedConfig = encodeJSONToString(formattedConfig);

  // Fetch system token config from canvas-tokens repo
  const canvasSystemTokensConfig = (await getFileContent({
    owner: canvasTokensRepoParams.owner,
    repo: canvasTokensRepoParams.repo,
    path: canvasTokensRepoParams.sysConfigPath,
    ref: canvasTokensRepoParams.syncBranch,
  })) as ContentFile;
  // Sync Canvas Tokens config file with the updated config
  updateFileContent({
    owner: canvasTokensRepoParams.owner,
    repo: canvasTokensRepoParams.repo,
    path: canvasTokensRepoParams.sysConfigPath,
    branch: canvasTokensRepoParams.syncBranch,
    message: 'chore: Sync system tokens config',
    // If this is a new file, there will be no existing sha to reference.
    sha: canvasSystemTokensConfig ? canvasSystemTokensConfig.sha : undefined,
    content: encodedConfig,
  });
}
