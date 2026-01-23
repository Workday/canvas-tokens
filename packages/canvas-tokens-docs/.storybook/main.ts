import type {StorybookConfig} from '@storybook/react-vite';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import remarkGfm from 'remark-gfm';
import {mergeConfig} from 'vite';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(mdx|tsx)', '../stories/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async config =>
    mergeConfig(config, {
      plugins: [nxViteTsPaths()],
      cssMinify: false,
    }),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
