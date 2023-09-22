import path from 'path';
import fs from 'fs';

const {CHANGESET_BODY = '', PACKAGE = '', VERSION} = process.env;

const header = `---
'@workday/${PACKAGE}': ${VERSION || 'patch'}
---`;

const [prefix] = PACKAGE.split('-').reverse();
const regex = new RegExp(`^# (${prefix}|all|components)`, 'i');

const changelogBody = CHANGESET_BODY.split('##')
  .filter(block => regex.test(block))
  .map(b =>
    b.replace(/# [a-zA-Z0-9_ ]*\n/g, a => {
      // Canvas Kit's changelog generator defaults section headings to "Components."
      // We're updating that default with use "Other" instead.
      const updatedTitle = a.replace(/# |\n/g, '').replace('Components', 'Other');
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
