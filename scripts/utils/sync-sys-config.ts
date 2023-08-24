import {tokensStudioRepoParams, canvasTokensRepoParams} from './api-client';
import {ContentFile, getFileContent, updateFileContent} from './file-content';
import {decodeJSONBufferString, encodeJSONToString} from './parse-utils';

// Format the config object into the shape expected by the consumer
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
  // Fetch Token Studio config from canvas-tokens-studio repo
  // We're fetching a directory, so we'll get an array of file metadata as our response
  const tokenStudioConfigResponse = await getFileContent({
    owner: tokensStudioRepoParams.owner,
    repo: tokensStudioRepoParams.repo,
    path: tokensStudioRepoParams.sysConfigPath,
    ref: tokensStudioRepoParams.defaultBranch,
  });
  // File content responses can be single file metadata or an array of file metadata
  if (Array.isArray(tokenStudioConfigResponse)) {
    // Filter out directories from the response data
    const fileData = tokenStudioConfigResponse.filter(child => child.type === 'file');
    // Fetch the contents for each file
    const fileContents = await Promise.all(
      fileData.map(async file => {
        const fileData = (await getFileContent({
          owner: tokensStudioRepoParams.owner,
          repo: tokensStudioRepoParams.repo,
          path: file.path,
          ref: tokensStudioRepoParams.defaultBranch,
        })) as ContentFile;
        // Decode the Buffer file content to a JSON object
        return decodeJSONBufferString(fileData.content);
      })
    );
    // Merge the configs into a single object
    const mergedConfigs = fileContents.reduce((acc, item) => ({...acc, ...item}), {});
    // Format the JSON config object
    const formattedConfig = formatConfig(mergedConfigs);
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
}
