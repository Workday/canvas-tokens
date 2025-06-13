export default {
  testMatch: ['**/spec/**.spec.ts'],
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  roots: ['packages'],
  testTimeout: 200000,
};
