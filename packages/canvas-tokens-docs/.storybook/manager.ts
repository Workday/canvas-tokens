import React from 'react';
import {addons} from '@storybook/manager-api';
import {Label} from './Label';

addons.setConfig({
  sidebar: {
    renderLabel: Label,
  },
});
