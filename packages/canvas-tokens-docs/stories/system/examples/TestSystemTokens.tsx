import React from 'react';
import {TestTokenScale} from '../../../components/TestTokenScale';

const Stack = ({children}: {children: React.ReactNode}) => (
  <div style={{display: 'grid', gap: '8px'}}>{children}</div>
);

export const SystemSpaceExample = () => (
  <Stack>
    <TestTokenScale group="system.size" />
    <TestTokenScale group="system.padding" />
    <TestTokenScale group="system.gap" />
    <TestTokenScale group="system.shape" />
    <TestTokenScale group="system.breakpoint" prefix="breakpoint" />
  </Stack>
);

export const SystemOpacityExample = () => (
  <Stack>
    <TestTokenScale group="system.opacity" />
  </Stack>
);

export const SystemDepthExample = () => (
  <Stack>
    <TestTokenScale group="system.depth" />
  </Stack>
);

export const SystemMotionExample = () => (
  <Stack>
    <TestTokenScale group="system.motion" />
  </Stack>
);

export const SystemTypeExample = () => (
  <Stack>
    <TestTokenScale group="system.type" prefix="font-family" />
    <TestTokenScale group="system.type" prefix="font-weight" />
    <TestTokenScale group="system.type" prefix="font-size" />
    <TestTokenScale group="system.type" prefix="line-height" />
    <TestTokenScale group="system.type" prefix="letter-spacing" />
    <TestTokenScale group="system.type" prefix="type" title="system.type.type (typography)" />
  </Stack>
);
