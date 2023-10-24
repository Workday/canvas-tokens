import path from 'path';
import fs from 'fs';

const {CHANGESET_BODY = ``, PACKAGE = '', VERSION} = process.env;

const header = `---
'@workday/canvas-tokens-${PACKAGE}': ${VERSION || 'patch'}
---`;

const changeset = CHANGESET_BODY.replace(/<br>/g, '\n');

fs.writeFileSync(
  path.join(path.resolve('./'), './.changeset/pre-changelog.md'),
  `${header}\n\n${changeset}`,
  'utf8'
);
