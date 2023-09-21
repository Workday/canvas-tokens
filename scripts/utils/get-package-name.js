const {PACKAGE, HEAD_COMMIT = ''} = process.env;
const regex = /\((.*)\):/;
const [_, packagePrefix] = HEAD_COMMIT.match(regex) || [];

if (!packagePrefix) {
  throw Error('There is no package to release');
}

console.log(PACKAGE || `canvas-tokens-${packagePrefix}`);
