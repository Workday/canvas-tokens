import React from 'react';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {copyIcon, checkIcon} from '@workday/canvas-system-icons-web';

import {useCopyToClipboard} from '../CopyButton/useCopyToClipboard';

import './index.css';

export type CodeBlockProps = {
  /** Value shown and copied to the clipboard on click / Enter / Space. */
  children: string;
};

export const CodeBlock = ({children}: CodeBlockProps) => {
  const {copied, copy} = useCopyToClipboard(children);

  return (
    <button
      type="button"
      className="cnvs-docs-code-block"
      onClick={copy}
      aria-label={copied ? 'Copied!' : `Copy ${children}`}
      aria-live="polite"
    >
      <code className="cnvs-sys-type-subtext-md cnvs-docs-code-block-text">{copied ? 'Copied!' : children}</code>
      <SystemIcon size="sm" icon={copied ? checkIcon : copyIcon} color="currentColor" />
    </button>
  );
};
