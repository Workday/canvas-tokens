const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const glob = require('glob');

const args = process.argv.slice(2);
const inputPath = path.resolve(args[0] || path.join(__dirname, '../stories'));
const distFolder = path.join(__dirname, '../dist');

if (!inputPath) {
  console.error('You must supply a valid path');
  process.exit(1);
}

if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder, {recursive: true});
}

const sanitizeMdxFile = (inFile, outFile) => {
  fs.readFile(inFile, 'utf8', (err, data) => {
    if (err) {
      return console.error(err);
    }
    const result = data
      // Remove storybook stuff
      .replace(/import {.*} from '@storybook\/(addon-docs|blocks)';/g, '')
      .replace(/import \* as \w+Stories from '\.\/\w+\.stories';\n?/g, '')
      .replace(/<Meta.* \/>\n?/g, '')
      .replace(/^\s+|\s+$/g, '')
      // Convert named imports from files in the examples folder to default imports
      // For example: import {BaseSizeTokens} from './examples/BaseSize';
      // becomes: import BaseSizeTokens from './examples/BaseSize';
      // This regex specifically targets import statements which exist on a single line
      .replace(/import {\s?(\w+)\s?} from '\.\/examples/g, "import $1 from './examples")
      .replace(/import {\s?(\w+)\s?} from '\.\.\/components/g, "import $1 from '../components")
      .replace(/import {\s?(\w+)\s?} from '\.\.\/\.\.\/components/g, "import $1 from '../../components");

    fs.writeFile(outFile, result, 'utf8', err => {
      if (err) return console.error(err);
    });
  });
};

/**
 * Build MDX files from the stories directory
 */
glob(inputPath + '/**/*.md?(x)', {}, (err, files) => {
  if (err) {
    console.error('Error finding MDX files:', err);
    return;
  }

  files.forEach(file => {
    // Skip visual-testing stories
    if (file.includes('visual-testing')) {
      return;
    }

    const relativePath = file.replace(path.join(__dirname, '../'), '');
    const destFile = path.join(distFolder, relativePath);
    fse.ensureDirSync(path.dirname(destFile));
    sanitizeMdxFile(file, destFile);

    // Copy examples directory if it exists
    const storiesDir = path.dirname(file);
    const sourceExamplesDir = path.join(storiesDir, 'examples');
    const destDir = path.dirname(destFile);

    if (fs.existsSync(sourceExamplesDir)) {
      const destExamplesDir = path.join(destDir, 'examples');
      fse.copySync(sourceExamplesDir, destExamplesDir);

      // Change exports from named to default
      glob(destExamplesDir + '/**/*.@(js|jsx|ts|tsx)', {}, (err, examples) => {
        if (err) {
          console.error('Error finding example files:', err);
          return;
        }

        examples.forEach(example => {
          fs.readFile(example, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading example file:', err);
              return;
            }
            // Convert named export to default export
            // Match: export const ComponentName = ... or export function ComponentName
            const updated = data.replace(
              /export (const|function) (\w+) =/g,
              'export default'
            );
            fs.writeFileSync(example, updated, 'utf8');
          });
        });
      });
    }
  });
});

// Copy components directory
const componentsSource = path.join(__dirname, '../components');
const componentsDest = path.join(distFolder, 'components');
if (fs.existsSync(componentsSource)) {
  fse.copySync(componentsSource, componentsDest);
}

// Copy images directory
const imagesSource = path.join(__dirname, '../images');
const imagesDest = path.join(distFolder, 'images');
if (fs.existsSync(imagesSource)) {
  fse.copySync(imagesSource, imagesDest);
}

// Copy llm-txt directory
const llmTxtSource = path.join(__dirname, '../llm-txt');
const llmTxtDest = path.join(distFolder, 'llm-txt');
if (fs.existsSync(llmTxtSource)) {
  fse.copySync(llmTxtSource, llmTxtDest);
}

console.log('MDX build complete!');
