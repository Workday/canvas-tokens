export default {
  testMatch: ['**/spec/**.spec.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          allowJs: true,
        },
      },
    ],
  },
  testEnvironment: 'node',
  roots: ['packages/canvas-tokens', 'packages/canvas-tokens-web'],
  testTimeout: 200000,
};
