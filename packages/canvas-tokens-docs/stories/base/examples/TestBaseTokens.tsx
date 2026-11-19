import React from 'react';
import {TestTokenScale} from '../../../components/TestTokenScale';

const Stack = ({children}: {children: React.ReactNode}) => (
  <div style={{display: 'grid', gap: '8px'}}>{children}</div>
);

export const BaseSizeExample = () => (
  <Stack>
    <TestTokenScale
      group="base.size"
      title="base.size (units)"
      filter={token => ['baseline', 'fontSize'].includes(token.path.join('.'))}
    />
    <TestTokenScale group="base.size" prefix="size" title="base.size.size" />
  </Stack>
);

export const BaseOpacityExample = () => (
  <Stack>
    <TestTokenScale group="base.opacity" />
  </Stack>
);

export const BaseMotionExample = () => (
  <Stack>
    <TestTokenScale group="base.motion" prefix="duration" />
    <TestTokenScale group="base.motion" prefix="easing" />
  </Stack>
);

export const BaseTypeExample = () => (
  <Stack>
    <TestTokenScale group="base.type" prefix="font-family" />
    <TestTokenScale group="base.type" prefix="font-weight" />
    <TestTokenScale group="base.type" prefix="letter-spacing" />
  </Stack>
);
