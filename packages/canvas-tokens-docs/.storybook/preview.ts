import {Preview} from '@storybook/react';
import {fonts} from '@workday/canvas-kit-react/fonts';
import {injectGlobal} from '@workday/canvas-kit-styling';
import theme from './theme';
import '@workday/canvas-tokens-web/css/index.css';
import './global.css';

injectGlobal({...fonts});

const preview: Preview = {
  parameters: {
    chromatic: {disableSnapshot: false},
    options: {
      storySort: {
        order: [
          'Docs',
          [
            'Getting Started',
            'Contributing',
            'Base Tokens',
            'Brand Tokens',
            'System Tokens',
            ['Overview'],
            'Sana Theme',
          ],
          'Tokens',
          'Guides',
          ['Upgrade Guides', 'Migrations'],
          'Visual Tests',
          ['Deprecated'],
        ],
      },
    },
    docs: {
      theme,
    },
  },
};

export default preview;
