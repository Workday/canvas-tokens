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
// npm run tokens-config sync [type]
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

// Create a pull request to merge updates
// npm run tokens-config create-pull
program
  .command('create-pull')
  .description('Create a pull request to merge the sync updates')
  .action(async () => {
    await createSyncPullRequest();
    return;
  });

// Run script
program.parse();
