const path = require('path');
const fs = require('fs');

const {PACKAGE = '', CHANGESET_BODY = '', VERSION} = process.env;

console.log(process.env, VERSION);

const header = `---
@workday/${PACKAGE}: ${VERSION || 'patch'}
---`;

const [prefix] = PACKAGE.split('-').reverse();

let changelogBody =
  CHANGESET_BODY.split('##').find(block => block.toLowerCase().startsWith(`# ${prefix}`)) || '';

if (changelogBody) {
  changelogBody = changelogBody.replace(/# \w+\n\n/i, '');
}

const changelogContents = `${header}\n\n${changelogBody}`;

fs.writeFileSync(
  path.join(path.resolve('./'), './.changeset/pre-changelog.md'),
  changelogContents,
  'utf8'
);
