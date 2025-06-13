# Canvas Tokens Codemods

This package is designed to help you migrate between major versions of Canvas Kit and adopt API
changes.

## Usage

```sh
> npx @workday/canvas-tokens-codemod <transform> [path]
```

```sh
Commands (transforms):
  canvas-tokens-codemod v2 [path]  Old Canvas Tokens > v2 migration transform

Options:
  --ignore-config,  Ignore files if they match patterns sourced from a config file [string]
  --ignore-pattern, Ignore files that match a provided glob expression             [string] [default: **/node_modules/**]
  --verbose,        Show more information about the transform process              [number] [choices: 0, 1, 2] [default: 0]
  -v, --version     Show version number                                            [boolean]
  -h, --help        Show help                                                      [boolean]
```

> Note: These codemods only work on .js, .jsx, .ts, and .tsx extensions. You may need to make some
> manual changes in other file types (.json, .mdx, .md, etc.).

> Note: You may need to run your linter after executing the codemod, as it's resulting formatting
> (spacing, quotes, etc.) may not match your project's styling.

## Installation

Alternatively, you can install the codemod package and run it without npx.

```sh
> yarn add @workday/canvas-tokens-codemod
> canvas-tokens-codemod <transform> [path]
```

## Options

### Ignore Config

If you'd like to provide a configuration for files to ignore instead of a glob, use
`--ignore-config`.

```sh
> canvas-tokens-codemod <transform> [path] --ignore-config=.gitignore
```

### Ignore Pattern

If you'd like to provide a glob to ignore files, use `--ignore-pattern`. By default, this is set to
ignore all `node_modules` directories.

```sh
> canvas-tokens-codemod <transform> [path] --ignore-pattern=**/dist/**
```

### Verbose

If you'd like to have more verbose logging to know which files are being parsed, use `--verbose`. By
default this is set to `0`.

```sh
# See all files being parsed
> canvas-tokens-codemod <transform> [path] --verbose=2
```
