import {Octokit} from '@octokit/rest';
import {config} from 'dotenv';

// Initiate the dotenv config
config();

// Client for GitHub
export const ghClient = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: 'https://api.github.com',
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
  /** tokens/sys/*.json and tokens/sys/color/colors */
  sysConfigPaths: [
    'tokens/sys/color/color.json',
    'tokens/sys/breakpoint.json',
    'tokens/sys/depth.json',
    'tokens/sys/opacity.json',
    'tokens/sys/shape.json',
    'tokens/sys/space.json',
    'tokens/sys/type.json',
  ],
};

export const canvasTokensRepoParams = {
  /** `workday` */
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
