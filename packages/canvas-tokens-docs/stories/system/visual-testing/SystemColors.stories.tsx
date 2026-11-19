import React from 'react';
import {SystemColorsExample} from './TestSystemColors';

export default {
  title: 'Visual Tests/System Tokens/Colors',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const SystemColors = () => <SystemColorsExample />;
export const SystemDarkColors = () => <SystemColorsExample isDark />;
