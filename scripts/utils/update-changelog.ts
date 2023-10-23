import path from 'path';
import fs from 'fs';

const {CHANGESET_BODY = '', PACKAGE = '', VERSION} = process.env;

const header = `---
'@workday/${PACKAGE}': ${VERSION || 'patch'}
---`;

const [prefix] = PACKAGE.split('-').reverse();
const allowedTitles = [prefix, 'all', 'other', 'infrastructure', 'documentation'];
const regex = new RegExp(`^# (${allowedTitles.join('|')})`, 'i');

const changelogBody = CHANGESET_BODY.replace('# Components', '# Other')
  .split('##')
  .filter(block => regex.test(block))
  .map(b =>
    b.replace(/# [a-zA-Z0-9_ ]*\n/g, a => {
      // Canvas Kit's changelog generator defaults section headings to "Components."
      // We're updating that default with use "Other" instead.
      const updatedTitle = a.replace(/# |\n/g, '');
      return `**${updatedTitle}**\n`;
    })
  )
  .join('\n');

const changelogContents = `${header}\n\n${changelogBody}`;

fs.writeFileSync(
  path.join(path.resolve('./'), './.changeset/pre-changelog.md'),
  changelogContents,
  'utf8'
);
