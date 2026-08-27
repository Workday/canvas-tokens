import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: ['scripts/**/spec/**/*.spec.ts'],
    environment: 'node',
  },
});
