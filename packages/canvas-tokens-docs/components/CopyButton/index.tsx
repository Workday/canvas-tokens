import React from 'react';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {copyIcon, checkIcon} from '@workday/canvas-system-icons-web';

import {useCopyToClipboard} from '../../util';

export type CopyButtonProps = {
  /** Text written to the clipboard on click. */
  text: string;
  children: React.ReactNode;
};

export const CopyButton = ({text, children}: CopyButtonProps) => {
  const {copied, copy} = useCopyToClipboard(text);

  return (
    <SecondaryButton
      size="extraSmall"
      icon={copied ? checkIcon : copyIcon}
      onClick={copy}
      aria-live="polite"
    >
      {copied ? 'Copied!' : children}
    </SecondaryButton>
  );
};
