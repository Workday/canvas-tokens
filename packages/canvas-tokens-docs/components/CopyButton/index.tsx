import React from 'react';
import {SecondaryButton} from '@workday/canvas-kit-react/button';
import {copyIcon, checkIcon} from '@workday/canvas-system-icons-web';

import {useCopyToClipboard} from '../../util';

export type CopyButtonProps = {
  /** Text written to the clipboard on click. */
  text: string;
  /** `inverse` for use on surfaces where the default button would lack contrast. */
  variant?: 'inverse';
  children: React.ReactNode;
};

export const CopyButton = ({text, variant, children}: CopyButtonProps) => {
  const {copied, copy} = useCopyToClipboard(text);

  return (
    <SecondaryButton
      size="extraSmall"
      variant={variant}
      icon={copied ? checkIcon : copyIcon}
      onClick={copy}
      aria-live="polite"
    >
      {copied ? 'Copied!' : children}
    </SecondaryButton>
  );
};
