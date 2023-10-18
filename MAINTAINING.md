# Maintaining

## Up & Running

```sh
# clone the repo
git clone https://github.com/workday/canvas-tokens.git
# install dependencies
yarn install
```

## Building Tokens

All tokens are built from the `@workday/canvas-tokens` package. To build tokens, run:

```sh
yarn build:tokens
```

## Storybook

> To ensure you're seeing the latest token updates, run `yarn build:tokens` first.

Our token documentation and visual tests are rendered in Storybook. To start Storybook locally, run:

```sh
yarn storybook
```

Building and serving a static Storybook locally can be useful to debug issues. To do so, run:

```sh
# build static Storybook
yarn build-storybook
# serve locally
yarn serve-storybook
```

## Syncing with Tokens Studio

Our Tokens Studio config currently lives in
[Canvas Tokens Studio](https://github.com/workday/canvas-tokens-studio/) as a single source of truth
for design and code. Canvas Tokens uses a script to sync the token config with that repo.

### Getting A Key

To run these scripts locally, you'll need to generate your own API key. You'll need a
[GitHub personal access token](https://github.com/settings/tokens) with repo scope access.

Once you have your key, you'll want to keep it somewhere safe. You can copy the content of the
`.env.example` file into a new `.env` file which is ignored by git.

```sh
cat .env.example > .env
```

Then add your GH personal access token to its respective environment variable, and
you're good to go.

### Syncing Token Configurations

```sh
yarn tokens-config sync
```

By default, this script fetches the config files for base, brand, and system tokens from the Canvas
Tokens Studio repo, and updates the corresponding config files in Canvas Tokens on the
`tokens-studio-sync` branch. Base, brand, and system token updates will each be in their own commit.

If you only want to update one type of tokens, you can specify it in the script.

```sh
# only sync base tokens
yarn tokens-config sync base
```

### Merging Configuration Updates

To merge the updates, you can either manually
[create a pull request](https://github.com/workday/canvas-tokens/compare/main...tokens-studio-sync)
or you can run the script. The script below will create a pull request to merge the
tokens-studio-sync branch into main. If a pull request already exists, it will fail.

```sh
yarn tokens-config create-pull
```

## Testing

### Unit Tests

We use [Jest](https://jestjs.io/docs/getting-started) to unit test internal logic. To run these
tests locally:

```sh
yarn test
```

### Visual Regression Tests

We use [Chromatic](https://www.chromatic.com/builds?appId=64fb84ee156f858ef9126097) for visual regression tests. Chromatic runs automatically on every pull request and requires changes to be verified before merging. When branch is merged to `main`, the baseline is updated.

## Publishing
