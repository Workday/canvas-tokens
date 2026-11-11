/**
 * Configuration shared by the build scripts (`build-markdown.mjs`, `build-lib.mjs`).
 * Change it when docs, components or tokens move, or when more of them should be included.
 */
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/** Resolves a path relative to this package. */
const fromPackage = (...segments) => path.resolve(packageRoot, ...segments);

// ---------------------------------------------------------------------------------------------
// Sources (inside `@workday/canvas-tokens-docs`)
// ---------------------------------------------------------------------------------------------

/** Root of the docs package every source below is resolved from. */
const docsRoot = fromPackage('../canvas-tokens-docs');

export const sources = {
  /** Folder with the `.mdx` docs. */
  stories: path.join(docsRoot, 'stories'),
  /** Folder with the React components, one folder per component with an `index.tsx`. */
  components: path.join(docsRoot, 'components'),
  /** Folder with the generated token data (`.js` files) that is copied to `outputs.tokens`. */
  tokens: path.join(docsRoot, 'data/tokens'),
  /** Used as the TypeScript `rootDir` when generating declarations. */
  docsRoot,
};

// ---------------------------------------------------------------------------------------------
// What is included
// ---------------------------------------------------------------------------------------------

export const markdown = {
  /** MDX files to transform, relative to `sources.stories`. */
  files: [
    // 'base/Overview.mdx', 'base/ColorPalette.mdx'
  ],
  /** Components removed from the markdown entirely (no code block is generated for them). */
  ignoredComponents: ['NavCardStack'],
};

export const lib = {
  /** Components to build into `dist/lib/components`, relative to `sources.components`. */
  components: [
    // 'CodeBlock', 'CopyButton', 'ColorPaletteCard'
  ],
  /** Examples to build into `dist/lib/examples`, relative to `sources.stories` (no extension). */
  examples: [
    // 'base/examples/PaletteSolidColors',
    // 'base/examples/PaletteAlphaColors',
    // 'base/examples/PaletteNeutralColors',
  ],
};

// ---------------------------------------------------------------------------------------------
// Outputs (inside this package)
// ---------------------------------------------------------------------------------------------

export const outputs = {
  /** Transformed markdown. */
  content: fromPackage('content'),
  /** Parent of every build output, cleaned before `build:lib`. */
  dist: fromPackage('dist'),
  /** Built JS and type declarations. */
  lib: fromPackage('dist/lib'),
  /** Copy of `sources.tokens`; built JS imports the token data from here. */
  tokens: fromPackage('dist/tokens'),
  /** Temporary files, removed at the end of `build:lib`. */
  tmp: fromPackage('dist/.tmp'),
};

export {packageRoot};
