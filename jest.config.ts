export default {
  testMatch: ['**/spec/**.spec.ts'],
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  roots: ['packages/canvas-tokens', 'packages/canvas-tokens-web'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup-tests.ts'],
  testTimeout: 200000,
};
