import {Command, Argument} from 'commander';
import {syncBaseConfig} from './utils/sync-base-config';
import {syncBrandConfig} from './utils/sync-brand-config';
import {syncSystemConfig} from './utils/sync-sys-config';
import {createSyncPullRequest} from './utils/pull-request';

const syncTypeArg = new Argument('type', 'Specify which type of tokens to sync')
  .choices(['all', 'base', 'brand', 'system'])
  .default('all')
  .argOptional();

const program = new Command();

program.name('tokens-config').description(`
  Tokens Config CLI
  --------------------------------------------------------------------------------
  This is the command-line interface for our tokens config. These commands are
  intended for maintainers to run locally or in CI.
`);

// CLI Commands

// Sync tokens config with Tokens Studio config
// yarn tokens-config sync [type]
program
  .command('sync')
  .description('Sync Canvas Tokens repo with Tokens Studio config')
  .addArgument(syncTypeArg)
  .action(async type => {
    switch (type) {
      case 'base':
        await syncBaseConfig();
        return;
      case 'brand':
        await syncBrandConfig();
        return;
      case 'system':
        await syncSystemConfig();
        return;
      default:
        await syncBaseConfig();
        await syncBrandConfig();
        await syncSystemConfig();
        return;
    }
  });

const baseBranchArg = new Argument('base', 'Specify the base branch for the sync pull request')
  .default('main')
  .argOptional();

// Create a pull request to merge updates
// yarn tokens-config create-pull
program
  .command('create-pull')
  .addArgument(baseBranchArg)
  .description('Create a pull request to merge the sync updates')
  .action(async base => {
    await createSyncPullRequest(base);
    return;
  });

// Run script
program.parse();
