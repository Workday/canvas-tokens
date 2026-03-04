import {addons} from '@storybook/manager-api';
import canvasTheme from './theme';
import {Label} from './Label';

addons.setConfig({
  sidebar: {
    renderLabel: Label,
  },
  theme: canvasTheme,
});
