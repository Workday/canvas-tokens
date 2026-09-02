import fs from 'fs';
import path from 'path';

/**
 * Reads all input files from a directory and returns an array of file names.
 * @param {string} dir - The directory to read.
 * @returns {string[]} An array of file names.
 */
export function readInputDir(dir) {
  const figmaDir = path.resolve(process.cwd(), dir);
  if (!fs.existsSync(figmaDir)) {
    throw new Error(`Missing ${dir} directory.`);
  }

  const inputFiles = fs.readdirSync(figmaDir).filter(file => file.endsWith('.json'));

  if (!inputFiles.length) {
    throw new Error(`No JSON files found in ${dir}.`);
  }

  return inputFiles;
}

export function sortInputFiles(files) {
  return [...files].sort((left, right) => {
    if (left === 'base.json') {
      return -1;
    }
    if (right === 'base.json') {
      return 1;
    }
    return left.localeCompare(right);
  });
}

/**
 * Reads a single input file and returns a payload object.
 * @param {string} file - The name of the file to read.
 * @param {string} dir - The directory containing the file.
 * @returns {object} The payload object.
 */
export function readInputFile(file, dir) {
  const content = JSON.parse(fs.readFileSync(path.resolve(dir, file), 'utf8'));
  content.library.name = file.replace('.json', '');
  return content;
}

/**
 * Clears the output directory before writing token files.
 * @param {string} outputDir - The output directory.
 */
export function clearOutputDir(outputDir) {
  const resolvedOutputDir = path.resolve(process.cwd(), outputDir);

  if (fs.existsSync(resolvedOutputDir)) {
    fs.rmSync(resolvedOutputDir, {recursive: true, force: true});
  }
}

export function mergeFileMaps(target, ...sources) {
  for (const source of sources) {
    for (const [filePath, content] of source) {
      if (!target.has(filePath)) {
        target.set(filePath, {});
      }
      Object.assign(target.get(filePath), content);
    }
  }

  return target;
}

export function listOutputFiles(outputDir) {
  const resolvedOutputDir = path.resolve(process.cwd(), outputDir);

  if (!fs.existsSync(resolvedOutputDir)) {
    return [];
  }

  return fs.readdirSync(resolvedOutputDir, {recursive: true});
}

export function writeOutputFiles(fileMap, outputDir) {
  const resolvedOutputDir = path.resolve(process.cwd(), outputDir);

  for (const [relativePath, content] of fileMap.entries()) {
    const outputPath = path.resolve(resolvedOutputDir, relativePath);
    fs.mkdirSync(path.dirname(outputPath), {recursive: true});
    fs.writeFileSync(outputPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  }
}
