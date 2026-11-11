import React from 'react';

const FEEDBACK_DURATION = 1500;

/** Copies text to the clipboard and exposes a temporary `copied` flag for UI feedback. */
export const useCopyToClipboard = (text: string) => {
  const [copied, setCopied] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), FEEDBACK_DURATION);
  };

  return {copied, copy};
};
