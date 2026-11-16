import React from 'react';
import {SystemIcon, systemIconStencil} from '@workday/canvas-kit-react/icon';
import {copyIcon, checkIcon, externalLinkIcon} from '@workday/canvas-system-icons-web';

import {useCopyToClipboard} from '../../util';

import './index.css';
import {token} from '@workday/canvas-tokens-web/token';

export type CodeBlockProps = {
  /** Value shown and copied to the clipboard on click / Enter / Space. */
  children: string;
  type?: 'copy' | 'readonly' | 'link';
};

export const CodeBlock = ({children, type = 'readonly'}: CodeBlockProps) => {
  const {copied, copy} = useCopyToClipboard(children);
  const isCopyType = type === 'copy';

  return (
    <button
      type="button"
      className="cnvs-docs-code-block"
      onClick={isCopyType ? copy : undefined}
      aria-label={copied ? 'Copied!' : isCopyType ? `Copy ${children}` : undefined}
      aria-live={isCopyType ? 'polite' : undefined}
    >
      <code className="cnvs-sys-type-subtext-md cnvs-docs-code-block-text">
        {copied ? 'Copied!' : children}
      </code>
      {type !== 'readonly' && (
        <SystemIcon
          size="sm"
          icon={copied ? checkIcon : isCopyType ? copyIcon : externalLinkIcon}
          cs={{[systemIconStencil.vars.color]: token('color.fg.default')}}
        />
      )}
    </button>
  );
};
