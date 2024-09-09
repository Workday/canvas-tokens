import {tokensStudioRepoParams, canvasTokensRepoParams} from './api-client';
import {ContentFile, getFileContent, updateFileContent} from './file-content';
import {generateRefs} from './generateRefs';
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

// These tokens are non web-specific and should be filtered from the web config
const nonWebTokens = {
  // mobile only tokens
  shape: ['x4', 'x6'],
  space: ['half', 'x5', 'x14'],
  // figma only tokens
  'layer-opacity': [],
};

/**
 * Filter out not web tokens from web token config
 */
function filterNonWebTokens(config: Record<string, object>) {
  // Iterate over the keys in the token config object (shape, space, etc)
  for (const key in config) {
    const tokenSet = config[key as keyof typeof config];
    // If the key is in the non web tokens, iterate over its tokens
    if (key in nonWebTokens) {
      for (const token in tokenSet) {
        const nonWebTokenSet = nonWebTokens[key as keyof typeof nonWebTokens];
        // If the token is non web, delete it from the config object
        if (!nonWebTokenSet.length || (nonWebTokenSet as string[]).includes(token)) {
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
  // Filter non web-specific tokens
  const filteredConfig = filterNonWebTokens(mergedConfigs);
  // Format the JSON config object
  const formattedConfig = formatConfig(filteredConfig);
  // Re-encode the formatted JSON object to a Buffer string
  const encodedConfig = encodeJSONToString(formattedConfig);

  generateRefs(formattedConfig);

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
