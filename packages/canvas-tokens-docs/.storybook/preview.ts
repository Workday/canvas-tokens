import {Preview} from '@storybook/react';
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';

import './global.css';

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
          ],
          'Visual Tests',
        ],
      },
    },
  },
};

export default preview;
