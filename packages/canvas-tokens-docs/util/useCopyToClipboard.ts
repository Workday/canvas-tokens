import React from 'react';

const FEEDBACK_DURATION = 1500;

/**
 * Copies text to the clipboard and exposes a temporary `copied` flag for UI feedback.
 * `copied` is only set once the write succeeds; failures are surfaced via `error`.
 */
export const useCopyToClipboard = (text: string) => {
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = async () => {
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(text);
      setError(null);
      setCopied(true);
      timeout.current = setTimeout(() => setCopied(false), FEEDBACK_DURATION);
    } catch (e) {
      setCopied(false);
      setError(e);
      console.error('Failed to copy to clipboard', e);
    }
  };

  return {copied, error, copy};
};
