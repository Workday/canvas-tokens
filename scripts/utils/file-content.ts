import {components} from '@octokit/openapi-types';
import {RestEndpointMethodTypes} from '@octokit/rest';

import {ghClient} from './api-client';

export type ContentFile = components['schemas']['content-file'];

/**
 *
 * A thin wrapper around GitHub's Octokit API.
 * [View Octokit Docs](https://octokit.github.io/rest.js/v18#repos-get-contents)
 *
 * Provide file content params, and this function will return the contents for a file or directory.
 * Keep in mind that there are file size limits.
 *
 */
export async function getFileContent(
  params: RestEndpointMethodTypes['repos']['getContent']['parameters']
) {
  try {
    const response = await ghClient.repos.getContent(params);
    return response.data;
  } catch (error: any) {
    if (error.status === 404) {
      console.log(`⚠️  Notice: ${params.path} does not exist.\n`);
    } else {
      console.error(`⛔️ Error: Failed to get file content from ${params.path}.`, error.message);
    }
  }
}

/**
 *
 * A thin wrapper around GitHub's Octokit API.
 * [View Octokit Docs](https://octokit.github.io/rest.js/v18#repos-create-or-update-file-contents)
 *
 * Provide file content params, and this function will create or update a file.
 * If you're updating an existing file, you'll need to provide the SHA for the file your modifying.
 * If you're creating a new file, no SHA is needed.
 *
 */
export async function updateFileContent(
  params: RestEndpointMethodTypes['repos']['createOrUpdateFileContents']['parameters']
) {
  try {
    await ghClient.repos.createOrUpdateFileContents(params);
  } catch (error: any) {
    console.error(`⛔️ Error: Failed to update.`, error.message);
  }
}
