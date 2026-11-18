import React from 'react';
import {Subtext} from '@workday/canvas-kit-react/text';
import {SystemIcon, systemIconStencil} from '@workday/canvas-kit-react/icon';
import {copyIcon, checkIcon, externalLinkIcon} from '@workday/canvas-system-icons-web';

import {useCopyToClipboard} from '../../util';

import './index.css';

export type CodeBlockProps = {
  /** Value shown and copied to the clipboard on click / Enter / Space. */
  children: string;
  type?: 'copy' | 'readonly' | 'link';
};

export const CodeBlock = ({children, type = 'readonly'}: CodeBlockProps) => {
  const {copied, copy} = useCopyToClipboard(children);
  const isCopyType = type === 'copy';

  if (type === 'readonly') {
    return (
      <Subtext size="small" as="code" className="cnvs-docs-code-block cnvs-docs-code-block-text ">
        {children}
      </Subtext>
    );
  }

  return (
    <button
      type="button"
      className="cnvs-docs-code-block"
      onClick={isCopyType ? copy : undefined}
      data-block-type={type}
      aria-label={copied ? 'Copied!' : isCopyType ? `Copy ${children}` : undefined}
      aria-live={isCopyType ? 'polite' : undefined}
    >
      <code className="cnvs-sys-type-subtext-md cnvs-docs-code-block-text">
        {copied ? 'Copied!' : children}
      </code>
      <SystemIcon
        className="cnvs-docs-code-block-icon"
        size="sm"
        icon={copied ? checkIcon : isCopyType ? copyIcon : externalLinkIcon}
        cs={{[systemIconStencil.vars.color]: 'currentColor'}}
      />
    </button>
  );
};
