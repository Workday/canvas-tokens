import React from 'react';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {copyIcon, checkIcon} from '@workday/canvas-system-icons-web';

import {useCopyToClipboard} from './useCopyToClipboard';

export type CopyButtonProps = {
  /** Text written to the clipboard on click. */
  text: string;
  children: React.ReactNode;
};

// Buttons act like text: label, icon and border all follow the surrounding `--hero-fg-color`.
const textColor = 'var(--hero-fg-color, currentColor)';
const stateColors = {label: textColor, icon: textColor, border: textColor};
const colors = {
  default: stateColors,
  hover: stateColors,
  active: stateColors,
  focus: stateColors,
};

export const CopyButton = ({text, children}: CopyButtonProps) => {
  const {copied, copy} = useCopyToClipboard(text);

  return (
    <SecondaryButton
      size="extraSmall"
      icon={copied ? checkIcon : copyIcon}
      colors={colors}
      onClick={copy}
      aria-live="polite"
    >
      {copied ? 'Copied!' : children}
    </SecondaryButton>
  );
};
