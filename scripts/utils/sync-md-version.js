/**
 * Keeps `@workday/canvas-tokens-md-web` on the same version as `@workday/canvas-tokens-web`, so both
 * packages are published together by `changeset publish` (regular and prerelease versions alike).
 */
const fs = require('node:fs');
const path = require('node:path');

const read = name => {
  const file = path.resolve(__dirname, '../../packages', name, 'package.json');
  return {file, json: JSON.parse(fs.readFileSync(file, 'utf8'))};
};

const web = read('canvas-tokens-web');
const md = read('canvas-tokens-md-web');

if (md.json.version !== web.json.version) {
  md.json.version = web.json.version;
  fs.writeFileSync(md.file, JSON.stringify(md.json, null, 2) + '\n');
}
console.log(`${md.json.name}@${md.json.version}`);
