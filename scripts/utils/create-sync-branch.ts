import {canvasTokensRepoParams, ghClient} from './api-client';
import {RestEndpointMethodTypes} from '@octokit/rest';

async function getBranches() {
  try {
    const {data} = await ghClient.repos.listBranches({
      owner: canvasTokensRepoParams.owner,
      repo: canvasTokensRepoParams.repo,
    });
    return data;
  } catch (error: any) {
    console.error('Error: Failed to get branches.', error.message);
  }
}

type CreateBranchParams = RestEndpointMethodTypes['git']['createRef']['parameters'];
type UpdateBranchParams = RestEndpointMethodTypes['git']['updateRef']['parameters'];

/**
 * A wrapper for Octokit's `createRef`. [Read the docs](https://octokit.github.io/rest.js/v20#git-create-ref)
 */
async function createBranch(params: CreateBranchParams) {
  try {
    await ghClient.git.createRef(params);
  } catch (error: any) {
    console.error(`Error: Failed to create branch: (${params.ref}).`, error.message);
  }
}

/**
 * A wrapper for Octokit's `updateRef`. [Read the docs](https://octokit.github.io/rest.js/v20#git-update-ref)
 */
async function updateBranch(params: UpdateBranchParams) {
  try {
    await ghClient.git.updateRef(params);
  } catch (error: any) {
    console.error(`Error: Failed to update branch: (${params.ref}).`, error.message);
  }
}

export async function createSyncBranch() {
  // Instead of grabbing the base and sync branches in separate API calls,
  // fetch all branches in one call.
  const branches = await getBranches();
  if (branches) {
    const syncBranch = branches.find(branch => branch.name === canvasTokensRepoParams.syncBranch);
    const mainBranch = branches.find(
      branch => branch.name === canvasTokensRepoParams.defaultBranch
    );
    // The main branch should always be available, but TS doesn't know that, so we have this extra conditional.
    if (mainBranch) {
      // If the sync branch doesn't exist, create it
      if (!syncBranch) {
        await createBranch({
          owner: canvasTokensRepoParams.owner,
          repo: canvasTokensRepoParams.repo,
          ref: `refs/heads/${canvasTokensRepoParams.syncBranch}`,
          sha: mainBranch.commit.sha,
        });
      } else {
        // If the sync branch already exists, force update to ensure it's up-to-date with main
        await updateBranch({
          owner: canvasTokensRepoParams.owner,
          repo: canvasTokensRepoParams.repo,
          ref: `heads/${canvasTokensRepoParams.syncBranch}`,
          sha: syncBranch.commit.sha,
          force: true,
        });
      }
    }
  }
}
