import {Octokit} from '@octokit/rest';
import {config} from 'dotenv';

// Initiate the dotenv config
config();

// Client for GitHub
export const ghClient = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: process.env.GITHUB_BASE_URL,
});

export const tokensStudioRepoParams = {
  /** `workday` */
  owner: 'workday',
  /** `canvas-tokens-studio` */
  repo: 'canvas-tokens-studio',
  /** `main` */
  defaultBranch: 'main',
  /** `tokens/base.json` */
  baseConfigPath: 'tokens/base.json',
  /** `tokens/brand/default.json` */
  brandConfigPath: 'tokens/sys/brand/canvas.json',
  /** `tokens/sys` */
  sysConfigPath: 'tokens/sys',
};

export const canvasTokensRepoParams = {
  /** `design` */
  owner: 'workday',
  /** `canvas-tokens` */
  repo: 'canvas-tokens',
  /** `main` */
  defaultBranch: 'main',
  /** `tokens-studio-sync` */
  syncBranch: 'tokens-studio-sync',
  /** `packages/canvas-tokens/tokens/base.json` */
  baseConfigPath: 'packages/canvas-tokens/tokens/base.json',
  /** `packages/canvas-tokens/tokens/web/brand.json` */
  brandConfigPath: 'packages/canvas-tokens/tokens/web/brand.json',
  /** `packages/canvas-tokens/tokens/web/sys.json` */
  sysConfigPath: 'packages/canvas-tokens/tokens/web/sys.json',
};
