import React from 'react';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {copyIcon, checkIcon} from '@workday/canvas-system-icons-web';

import {useCopyToClipboard} from '../CopyButton/useCopyToClipboard';

// @ts-expect-error CSS modules are resolved by the docs build tooling
import styles from './index.module.css';

type CodeBlockProps = {
  /** Value shown and copied to the clipboard on click / Enter / Space. */
  children: string;
};

export const CodeBlock = ({children}: CodeBlockProps) => {
  const {copied, copy} = useCopyToClipboard(children);

  return (
    <button
      type="button"
      className={styles.codeBlock}
      onClick={copy}
      aria-label={copied ? 'Copied!' : `Copy ${children}`}
      aria-live="polite"
    >
      <code className={`cnvs-sys-type-subtext-md ${styles.text}`}>{copied ? 'Copied!' : children}</code>
      <SystemIcon size="sm" icon={copied ? checkIcon : copyIcon} color="currentColor" />
    </button>
  );
};
