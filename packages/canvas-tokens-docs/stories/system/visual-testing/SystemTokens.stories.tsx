import React from 'react';
import {
  SystemSpaceExample,
  SystemOpacityExample,
  SystemDepthExample,
  SystemMotionExample,
  SystemTypeExample,
} from '../examples/TestSystemTokens';

export default {
  title: 'Visual Tests/System Tokens/Scales',
  parameters: {
    chromatic: {disableSnapshot: false},
  },
};

export const Space = () => <SystemSpaceExample />;
export const Opacity = () => <SystemOpacityExample />;
export const Depth = () => <SystemDepthExample />;
export const Motion = () => <SystemMotionExample />;
export const Type = () => <SystemTypeExample />;
