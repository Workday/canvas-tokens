import {addons} from '@storybook/manager-api';
import {fonts} from '@workday/canvas-kit-react/fonts';
import {injectGlobal} from '@workday/canvas-kit-styling';
import canvasTheme from './theme';
import {Label} from './Label';

injectGlobal({
  ...fonts,
  body: {fontFamily: canvasTheme.fontBase},
});

addons.setConfig({
  sidebar: {
    renderLabel: Label,
  },
  theme: canvasTheme,
});
