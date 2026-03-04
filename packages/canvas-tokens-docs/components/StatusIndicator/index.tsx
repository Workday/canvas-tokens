import * as React from 'react';
import './index.css';

const styles = {
  ai: {
    color: 'var(--cnvs-sys-color-fg-ai)',
    backgroundColor: 'var(--cnvs-sys-color-bg-ai-default)',
  },
};

export const StatusIndicator = ({content, type}: {content: string; type: 'ai'}) => {
  return (
    <span className="status-indicator" style={styles[type]}>
      <div className="status-indicator-content cnvs-sys-type-subtext-large">{content}</div>
    </span>
  );
};
