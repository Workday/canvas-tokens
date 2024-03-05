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

async function createBranch(params: CreateBranchParams) {
  try {
    await ghClient.git.createRef(params);
  } catch (error: any) {
    console.error('Error: Failed to create branch.', error.message);
  }
}

async function updateBranch(params: UpdateBranchParams) {
  try {
    await ghClient.git.updateRef(params);
  } catch (error: any) {
    console.error('Error: Failed to update branch.', error.message);
  }
}

export async function createSyncBranch() {
  const branches = await getBranches();
  if (branches) {
    const syncBranch = branches.find(branch => branch.name === canvasTokensRepoParams.syncBranch);
    const mainBranch = branches.find(
      branch => branch.name === canvasTokensRepoParams.defaultBranch
    );
    const syncBranchRef = `refs/heads/${canvasTokensRepoParams.syncBranch}`;
    // The main branch should always be available, but TS doesn't know that, so we have this extra conditional.
    if (mainBranch) {
      // If the sync branch doesn't exist, create it
      if (!syncBranch) {
        await createBranch({
          owner: canvasTokensRepoParams.owner,
          repo: canvasTokensRepoParams.repo,
          ref: syncBranchRef,
          sha: mainBranch.commit.sha,
        });
      } else {
        // If the sync branch already exists, force update to ensure it's up-to-date with main
        await updateBranch({
          owner: canvasTokensRepoParams.owner,
          repo: canvasTokensRepoParams.repo,
          ref: syncBranchRef,
          sha: mainBranch.commit.sha,
          force: true,
        });
      }
    }
  }
}
