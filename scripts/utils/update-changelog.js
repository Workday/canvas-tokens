const path = require('path');
const fs = require('fs');

const {PACKAGE = '', CHANGESET_BODY = '', VERSION} = process.env;

console.log(process.env, VERSION);

const header = `---
'@workday/${PACKAGE}': ${VERSION || 'patch'}
---`;

const [prefix] = PACKAGE.split('-').reverse();

let changelogBody = CHANGESET_BODY.split('##').filter(
  block => block.toLowerCase().startsWith(`# ${prefix}`) || block.startsWith('# All')
);

if (changelogBody) {
  changelogBody = +'\n##' + changelogBody.join('##');
}

const changelogContents = `${header}\n\n${changelogBody}`;

fs.writeFileSync(
  path.join(path.resolve('./'), './.changeset/pre-changelog.md'),
  changelogContents,
  'utf8'
);
