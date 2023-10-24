import {Preview} from '@storybook/react';
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';

const preview: Preview = {
  parameters: {
    chromatic: {disableSnapshot: false},
    options: {
      storySort: {
        order: ['Docs', ['Getting Started'], 'Visual Tests'],
      },
    },
  },
};

export default preview;