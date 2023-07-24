# Maintaining

## Up & Running

```sh
# clone the repo
git clone https://github.com/workday/canvas-tokens.git
# install dependencies
npm install
```

## Building Tokens

All tokens are built from the `@workday/canvas-tokens` package. To build tokens, run:

```sh
npx nx build @workday/canvas-tokens
```

## Testing

### Unit Tests

We use [Jest](https://jestjs.io/docs/getting-started) to unit test internal logic. To run these
tests locally:

```sh
npm test
```

## Publishing
